---
slug: latest-work
title: Our latest work with a client
authors: Dario, Gonza
tags: [Kubernetes, Infrastructure, MySQL, MongoDB, AWS, CICD, GitOps]
image: 
---

## How it started
At first, our client had its software deployed mostly in Digital Ocean with some resources in ploi.io and ScaleGrid.


## What was the goal
At the beginning, our goal was clear: we had to improve their platform, thereby offering them a better software development experience while reducing associated costs.

To achieve this, their infrastructure environments were standardized with EKS, as it provides automatic horizontal scaling, which helps lower expenses and CO2 consumption by provisioning only the necessary resources.
In each environment, Helm and ArgoCD are used to optimize the deployment of various applications, such as the web application and a MongoDB database.
Additionally, GitOps was adopted to automate software development, ensuring fast and reliable deployments of applications and services in CI/CD.


## How was it archieved?
### Kubernetes clusters
They are deployed in the cloud, thanks to the AWS EKS service, which orchestrates a large portion of our client's services.

Additionally, it also hosts other services that are part of our platform:
- **Observability and alerting stack** to provide the client with visibility into deployed applications and their corresponding resources.
- **CI/CD tools** to optimize application deployment.
- **Load balancers** to distribute incoming requests evenly across different replicas.
- **External Secrets Manager** to extract sensitive information from the code in the form of secrets, which can be managed via AWS's service.

### Custom image for their web application
The client's application is developed in PHP, so a custom Helm chart was created to automate deployments using ArgoCD.
Later, the operating system image was optimized by creating a custom image that already included all the necessary pre-downloaded packages for the application to run.
This reduced the image build time from 8 minutes down to just 2.
Additionally, the application was configured to run on ARM-based nodes, matching the client's existing architecture.

### Databases migration and optimization
The client's application uses a MongoDB database, a MySQL database, and a Redis instance.
All of these resources were migrated to the new environments:
#### MongoDB
The database is deployed in the cluster using Helm with a 3-replica architecture to ensure high availability.

Initially, we attempted to use an ARM-compatible version of MongoDB to leverage existing nodes and reduce infrastructure costs.
However, due to limited support for ARM-optimized MongoDB images, we ultimately switched to an AMD-based architecture instead.
This decision balanced compatibility with stability while still maintaining efficient resource utilization in the cluster.

The original database was running on version 5.x, so in addition to migration, we decided to upgrade to a supported version that could be kept updated against vulnerabilities.
Initially, we considered moving to the latest version (8.x), but this proved impossible because the source database uses timeseries collections, which do not maintain strict schema consistency for their data.
We attempted several workarounds to resolve this issue:
- Using MongoTools v100.12.0+ Based on a [MongoDB employee’s post](https://www.mongodb.com/community/forums/t/database-tools-100-4-0-released/115727), this version supposedly supports timeseries migration.
- Pre-creating collections with ``timeseriesBucketsMayHaveMixedSchemaData`` flag – We tried enabling this flag before importing data to bypass schema conflicts
- Modifying collection metadata – We attempted to manually adjust creation metadata to include the flag.

Unfortunately, none of these approaches fully resolved the compatibility issues, forcing us to settle on an intermediate supported version (7.x) and schedule an upgrade in the future.

#### MySQL 
We use AWS Aurora and RDS because they enable rapid infrastructure-as-code deployment via Terraform.
Originally, the migration was planned with AWS DMS, but several critical limitations made it impractical:

- **DMS cannot migrate secondary objects (FKs and cascade constraints):**
    - DMS replicates changes via database logs, but database engines do not log secondary object dependencies.
    - Until 2020, an undocumented flag (HandleCascadeConstraints) could bypass this, but it’s now deprecated.
    - The only workaround is manually modifying the DDL in 400+ instances of FKs and cascade constraints.

- **Requirement to disable FKs during migration:**
    - Forces application downtime.

- **Source database timeout issues:**
    - Resolved by importing self-managed resources into Terraform and adjusting their parameters directly (no alternative for non-managed databases).

#### Redis
Similarly to MySQL, we opted to use Terraform and ElastiCache for deployment and management.

### Self-Hosted Runners
A self-hosted runner's task is to run CICD workflows within itself, detaching the pipeline from GitHub Actions, for example.
They provide a great customization of the execution environment while offering us a great control of everything happening underneath. 
We use Kubernetes as the infrastructure on where to deploy the runners due to its adaptability and scalability along as Actions Runner Controller, which manages several runners concurrently.
As any other application deployed in the cluster, Helm Charts and ArgoCD are used for Continuous Delivery.
We also use AWS Secrets Manager and custom Docker Images to further improve their performance and capabilities.
We implemented custom self-hosted runners to execute GitHub Actions workflows. This approach proved:
- More efficient – Reduced latency and improved performance compared to GitHub's hosted runners.
- Cost-effective – Lowered operational expenses by avoiding GitHub's per-minute billing.


## Other improvements:
A series of improvements were implemented to enhance the system’s efficiency, security, and reliability:
- **FinOps:**
    - Conducted infrastructure cost analysis across multiple usage cycles to right-size resources and reduce expenses.

- **Secrets Management:**
    - Migrated hardcoded sensitive data to AWS Secrets Manager, eliminating exposure risks in the client’s codebase.

- **Queue System Upgrade:**
    - Migrated from DigitalOcean to AWS-managed queues (via Terraform).
    - Added Dead-Letter Queues (DLQs) to capture/troubleshoot failed messages, improving debuggability and error control.

- **S3 Bucket Migration:**
    - Migrated and configured per-environment S3 buckets (DigitalOcean → AWS).
    - Implemented restricted-access paths (private) and public-facing endpoints (Internet-accessible) as needed.

- **QA & Testing:**
    - Performed continuous application testing at critical stages to ensure stability.

- **Why This Matters:**
    - Security: Secrets abstraction + restricted S3 paths minimize attack surfaces.
    - Cost Control: FinOps ensures no overprovisioning.
    - Resilience: DLQs prevent message loss and simplify failure analysis.