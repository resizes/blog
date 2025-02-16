---
slug: sftp-server-in-kubernetes-with-sftpgo
title: SFTP server in Kubernetes with SFTPGo
authors: maria
tags: [DevOps, PlatformEngineering, CloudNative, DeveloperExperience, Innovation]
---

Have you ever needed to create an SFTP server? How do you do it?

For those who have created an SFTP server before, you probably know that it is not easy to create and maintain an SFTP server. There are many ways to do it, but in this case, we are going to install SFTPGo in our Kubernetes cluster.

SFTPGo is an open-source SFTP server that allows users to securely transfer files over SSH. It is written in Go (Golang) and is designed to be lightweight, easy to configure, and highly customizable. It supports multiple storage backends, including local filesystems, cloud storage (like S3, Google Cloud Storage, etc.), and more.

In this case, we want to install SFTPGo on our EKS cluster and we are going to use S3 to store the files for our SFTP server. 

So we are going to start by creating the necessary infrastructure with Terraform.

<!--truncate-->

# External Secret

For managing secrets in EKS, we are using [External Secrets Operator](https://external-secrets.io/). To store the secrets for our SFTP server, we will use AWS Secrets Manager. An external secret is a Kubernetes resource that allows you to manage secrets from an external secret manager, in this case, AWS Secrets Manager.

Here is the code to create the secret in AWS Secrets Manager:

```hcl
resource "aws_secretsmanager_secret" "sftpgo" {
  name        = "sftpgo"
  description = "Secrets for sftpgo in EKS production cluster"
}
```

Once created, we will need to enter the following secrets:

- `SFTPGO_DEFAULT_ADMIN_USERNAME`: example_user
- `SFTPGO_DEFAULT_ADMIN_PASSWORD`: example_password
- `SFTPGO_DATA_PROVIDER__DRIVER`: postgresql
- `SFTPGO_DATA_PROVIDER__NAME`: sftpgo.db
- `SFTPGO_DATA_PROVIDER__HOST`: sftpgo-postgresql.sftpgo.svc.cluster.local *(this might change, it depends on your needs!)*
- `SFTPGO_DATA_PROVIDER__PORT`: 5432
- `SFTPGO_DATA_PROVIDER__USERNAME`: sftpgo
- `SFTPGO_DATA_PROVIDER__PASSWORD`: sftpgo_pg_pwd

As you can see, we are using a PostgreSQL database to store the users and the configuration for our SFTP server. And of course, we need to create the database. We will do this in the next section.

# SFTPGo resources

On the other hand, we will also need to create any other resource related to this new SFTP (policies, IAM role, permissions, etc.).

We will create one role to access the **AWS Secrets Manager** and another to **access an S3 bucket**.

> **S3 bucket**: We use an S3 bucket to store the documents managed in the SFTP. We can use a single bucket for everything, but it is possible to use multiple buckets. Each user inside the SFTP can have access to a different bucket, or even a different folder inside the same bucket.

Our code would look something like this:

>

```hcl
data "aws_iam_policy_document" "sftpgo" {
  statement {
    actions = [
      "secretsmanager:GetResourcePolicy",
      "secretsmanager:GetSecretValue",
      "secretsmanager:DescribeSecret",
      "secretsmanager:ListSecretVersionIds"
    ]
    resources = [aws_secretsmanager_secret.sftpgo.arn]
  }
}

resource "aws_iam_policy" "sftpgo" {
  name        = "sftpgo"
  path        = "/"
  description = "Policy to get sftpgo secrets"
  policy      = data.aws_iam_policy_document.sftpgo.json
}

resource "aws_iam_role" "sftpgo" {
  name = "external-secrets-sftpgo"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/external-secrets"
        }
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "sftpgo" {
  name       = "sftpgo"
  roles      = [aws_iam_role.sftpgo.name]
  policy_arn = aws_iam_policy.sftpgo.arn
}

resource "aws_s3_bucket" "sftpgo" {
  bucket = "sftpgo" # TODO: change this to the name of the bucket you want to use
}

data "aws_iam_policy_document" "s3_full_access" {
  statement {
    actions = [
      "s3:*",  
    ]
    resources = [
      aws_s3_bucket.sftpgo.arn, 
      "${aws_s3_bucket.sftpgo.arn}/*",  
    ]
  }
}

resource "aws_iam_policy" "s3_full_access" {
  name   = "S3AccessPolicy-${aws_s3_bucket.sftpgo.bucket}"
  policy = data.aws_iam_policy_document.s3_full_access.json
}

resource "aws_iam_role" "irsa_role" {
  name = "sftpgo"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/${replace(data.aws_eks_cluster.cluster.identity[0].oidc[0].issuer, "https://", "")}"
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "${replace(data.aws_eks_cluster.cluster.identity[0].oidc[0].issuer, "https://", "")}:sub" = "system:serviceaccount:sftpgo:sftpgo"
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_s3_policy" {
  role       = aws_iam_role.irsa_role.name
  policy_arn = aws_iam_policy.s3_full_access.arn
}

resource "aws_s3_bucket_public_access_block" "sftpgo" {
  bucket = aws_s3_bucket.sftpgo.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

We will also add a new data reference to our EKS cluster in our `data.tf`:

```hcl
data "aws_eks_cluster" "cluster" {
  name = "example_name_cluster" # TODO: change this to the name of your cluster
}
```

---

# SFTPGo Helm Chart

When everything mentioned above has been created, we can continue creating the necessary chart to set up our SFTP server in Kubernetes.

We will start by creating a new folder called `sftpgo`. Inside this folder, we will begin by creating the two main files: `values.yaml` and `Chart.yaml`.

### Chart.yaml

Here we will list the different dependencies we will use and their versions. In this case, we will use **sftpgo** and **postgresql**.

>**PostgreSQL**: This is required to store the new users who will use this SFTP and the configuration for the SFTP server.

It should look something like this:

```yml
apiVersion: v2
name: sftpgo
description: SFTPGo - Secure SFTP Server
type: application 
version: 0.23.1
appVersion: "2.5.4"
dependencies:
  - name: sftpgo
    version: 0.23.1
    repository: "https://charts.sagikazarmark.dev"
  - name: postgresql
    version: 16.4
    repository: "https://charts.bitnami.com/bitnami"
```

### Values.yaml

On the other hand, there is the `values.yaml`, where we collect things like the ingress, variables (in this case, retrieved from a secret stored in AWS), the serviceAccount, etc.

It should looks like this:

```yml
sftpgo:
  config: 
    common:
      proxy_protocol: 1
    data_provider:
      create_default_admin: true 

  envFrom:
  - secretRef:
      name: sftpgo

  serviceAccount:
    annotations: 
      eks.amazonaws.com/role-arn: arn:aws:iam::ACCOUNT_ID:role/sftpgo # TODO: change this to the IRSA role

  ui:
    ingress:
      enabled: true
      className: external
      annotations:
        kubernetes.io/external-dns.create: "true"
      hosts:
      - host: sftpgo.example.com # TODO: change this to the domain you want to use
        paths:
        - path: /
          pathType: ImplementationSpecific
```

Once we have these two files, we will create the `Chart.lock` and the `charts` with the following command:

```sh
helm dep up
```

With this, a folder with the Helm Chart dependencies called `charts` and a `Chart.lock` file should have been created inside our `sftpgo` folder.

We will also create a folder called **templates**, where we will create both `externalsecret.yaml` and `secretstore.yaml`. This will allow us to manage the secrets we have previously stored in our **AWS Secret Manager**.

### secretstore.yaml

We need to create a file that allows us to manage our secrets. To do this, we will create code like the following:

```yml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: external-secrets-sftpgo
spec:
  provider:
    aws:
      service: SecretsManager
      role: arn:aws:iam::ACCOUNT_ID:role/external-secrets-sftpgo # TODO: change this to the IRSA role
      region: us-east-1 # TODO: change this to the region of your cluster
```

### externalsecret.yaml

Finally, we must create an `externalsecret.yaml` file that contains all the secrets we mentioned earlier.

```yml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret

metadata:
  name: sftpgo
  namespace: sftpgo 

spec:
  refreshInterval: "10m"
  secretStoreRef:
    name: external-secrets-sftpgo
    kind: SecretStore

  target:
    name: sftpgo

  dataFrom:
  - extract:
      key: sftpgo
```

# Let's test it!

With all our resources created, we can prove that everything is going well with several steps:

### 1. Enter the SFTPGo host
We can enter the host that we created earlier in the `values.yaml` file (sftpgo.example.com) and we will see a login screen like the one in the following image. With what we have done, we should be able to log in as the admin user using the credentials stored in our AWS Secret Manager.

![Sftpgo Login](sftpgo_login.png)

### 2. Send a file from our local to SFTPGo.
>**Remember**: We are doing everything from a user login, so we first need to create a user in the SFTPGo UI.

To save a test file in SFTPGo, we will go to our terminal and log in with the following command:

```sh
sftp user@sftpgo.example.com
```

Later, after creating a test .txt file, we will save it in SFTPGo inside a folder called "example" *(We can also save it directly in the root directory; it's just a test to see the possibility of navigating and organizing files within SFTPGo)*.

```sh
sftp> mkdir /example  
sftp> cd /home/example
sftp> put test_file.txt
```

If everything has gone well, we should be able to see our file in the SFTPGo UI and if you go to the S3 bucket, you should also be able to see the file stored there.

# Resources

- [SFTPGo Docs](https://docs.sftpgo.com/latest/tutorials/postgresql-s3/)
- [SFTPGo Helm Chart](https://artifacthub.io/packages/helm/sagikazarmark/sftpgo)
