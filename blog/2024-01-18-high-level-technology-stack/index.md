---
slug: high-level-technology-stack
title: Resizes High Level Technology Stack
authors: [guille]
tags: [DevOps, PlatformEngineering, CloudNative, DeveloperExperience, Innovation]
---

# Resizes High Level Technology Stack

At Resizes, we're pioneering the future of DevOps and Platform Engineering with cutting-edge Cloud Native technologies. Our mission is to empower you with DevOps expertise, crafting a top-tier Internal Developer Platform (IDP) essential for your success. Our approach uniquely combines open-source and proprietary tools, tailoring a platform that perfectly aligns with your business needs. 

In this article, we'll explore our high-level technology stack, highlighting the most important tools and services we use to build your IDP.

<!--truncate-->

## Version Control System

**The Heart of Software Development**: A Version Control System (VCS) is where the magic of code comes to life. Utilizing Git, the world's leading distributed VCS, we enable rapid branching and merging, ideal for large-scale projects. With its dominance in the industry, evidenced by over 100 million repositories on GitHub, Git is the cornerstone of our VCS strategy.

### Git

(Git)[https://git-scm.com/] stands out as a free, open-source distributed VCS, renowned for handling projects of all sizes with remarkable speed and efficiency. Its user-friendly nature, minimal footprint, and superior performance outshine traditional SCM tools like Subversion or CVS, offering features like inexpensive local branching and convenient staging areas.

### GitHub

Our choice for Git cloud hosting is (GitHub)[https://github.com/], a platform that revolutionizes the way we work. From open source to business projects, GitHub is the hub for code hosting, project management, and collaborative software development with millions of developers worldwide. At Resizes, GitHub is our collaborative canvas, enabling code sharing, issue tracking, and seamless pull request management.

::: note
**Open to Alternatives**: While GitHub is our primary choice, we're flexible with (GitLab)[https://gitlab.com/], (Bitbucket)[https://bitbucket.org/], or any Git-based VCS, and can integrate with your existing VCS setup.
:::

## Public Cloud

**Hosting with the Best**: Resizes leverages public cloud services for our infrastructure needs. This approach provides scalable, internet-accessible computing resources.

### Amazon Web Services

Our primary hosting service is (AWS)[https://aws.amazon.com/], a leader in on-demand cloud computing platforms and APIs. AWS's global reach, offering over 175 comprehensive services, makes it our choice for robust and scalable cloud infrastructure.

::: note
**Flexible Cloud Solutions**: We're also equipped to work with other public cloud providers like (Google Cloud Platform)[https://cloud.google.com/] or (Microsoft Azure)[https://azure.microsoft.com/], adapting to your preferred infrastructure.
:::

## Infrastructure as Code

**Automated and Efficient**: Infrastructure as Code (IaC) is our methodology for managing and provisioning cloud resources via machine-readable definition files. This modern approach replaces traditional physical hardware configuration, emphasizing declarative formats.

### Terraform

(Terraform)[https://www.terraform.io/] is our go-to tool for IaC, allowing us to safely and predictably manage cloud infrastructure. This open-source tool excels in creating, changing, and versioning infrastructure efficiently, supporting a wide range of service providers and custom solutions.

::: note
**Studying Alternatives**: While Terraform is our primary choice, we're currently considering (OpenTofu)[https://opentofu.org/] as a potential alternative, following its recent release.
:::

## Container Orchestration

**Streamlining Application Deployment**: Containers provide a lightweight, portable solution for packaging applications and their dependencies. Our container orchestration process manages their lifecycle, encompassing provisioning, deployment, scaling, and monitoring.

### Docker

We use (Docker)[https://www.docker.com/] to encapsulate our applications and dependencies, ensuring consistent and repeatable deployments. Docker simplifies the process of creating, deploying, and running applications with its container technology.

### Kubernetes

For orchestration, we rely on (Kubernetes)[https://kubernetes.io/], an open-source system that automates the deployment, scaling, and management of containerized applications. Its ability to group containers into logical units eases management and discovery, building on Google's 15 years of production workload experience.

### Helm

(Helm)[https://helm.sh/] enhances our Kubernetes application management. It's akin to a package manager for Kubernetes, streamlining the installation and management of applications. Helm Charts provide a simple yet powerful way to define, install, and upgrade even the most complex Kubernetes applications.

## Continuous Integration and Delivery

Seamless Software Lifecycle Management: Continuous Integration (CI) and Continuous Delivery (CD) are pivotal in our workflow. CI automates code build and testing with each version control commit, promoting frequent code integration. CD automates software deployment, making releases predictable and repeatable.

### GitHub Actions

(GitHub Actions)[https://docs.github.com/en/actions] is our tool of choice for automating both CI and CD processes. This platform facilitates software workflows, enabling us to build, test, and deploy code directly from GitHub, streamlining branch management and code reviews.

::: note
**Adaptable CI/CD Tools**: We're also equipped to work with other CI/CD tools like (Jenkins)[https://www.jenkins.io/] or (GitLab CI)[https://docs.gitlab.com/ee/ci/], tailoring our approach to your existing setup.
:::

### GitOps and ArgoCD

GitOps, using Git as a single source of truth for declarative infrastructure and applications, guides our CD practices. (ArgoCD)[https://argo-cd.readthedocs.io/en/stable/], a GitOps tool for Kubernetes, automates application deployment and ensures alignment with the Git repository.

## Observability

Observability is the ability to understand the internal state of a system by examining its outputs. It is a measure of how well a system can be understood from the outside.

### Mimir

At Resizes, we're using (Mimir)[https://grafana.com/oss/mimir/] to monitor our infrastructure. Mimir is a monitoring tool that helps you monitor with the help of the (Grafana Agent)[https://grafana.com/oss/agent/]. It's a lightweight, open-source, and easy-to-use monitoring solution that helps you monitor your infrastructure and applications. It's built on top of (Prometheus)[https://prometheus.io/] and Grafana, and it's designed to be easy to use and easy to deploy. Also it's designed to be use as a long term storage solution for metrics.

### Loki

We're using (Loki)[https://grafana.com/oss/loki/] to store our logs. Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by Prometheus. It is designed to be very cost-effective and easy to operate. It does not index the contents of the logs, but rather a set of labels for each log stream.

### Grafana

(Grafana)[https://grafana.com/grafana/] is our tool to visualize our metrics and logs. Grafana is an open-source, general-purpose dashboard and graph composer. It is most commonly used for visualizing time series data for infrastructure and application analytics, but many use it in other domains including industrial sensors, home automation, weather, and process control.

## Secrets Management

Secrets Management is the process of managing secrets, such as passwords, API keys, and other sensitive information.

### External Secrets

At Resizes, we're using (External Secrets)[https://external-secrets.io/] to manage our secrets. External Secrets is a Kubernetes operator that manages the lifecycle of secrets stored in external secret stores, such as HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, and Google Cloud Secret Manager. It allows you to store secrets in a secure, centralized location and then reference them in your Kubernetes manifests.

## Load Balancing

Load Balancing is the process of distributing network traffic across multiple servers. It is used to improve the performance, reliability, and scalability of applications.

### External DNS

We're using (External DNS)[https://kubernetes-sigs.github.io/external-dns/] to manage our DNS records. External DNS is a Kubernetes operator that manages the lifecycle of DNS records stored in external DNS providers, such as AWS Route 53, Google Cloud DNS, and Azure DNS. It allows you to store DNS records in a secure, centralized location and then reference them in your Kubernetes manifests.

### NGINX Ingress Controller

At Resizes, we're using (NGINX Ingress Controller)[https://kubernetes.github.io/ingress-nginx/] to manage our ingress traffic. NGINX Ingress Controller is a Kubernetes operator that manages the lifecycle of ingress traffic. It allows you to manage ingress traffic following the Kubernetes Ingress specification.

## Autoscaling

Autoscaling is the process of automatically scaling up or down the number of servers in a cluster based on the current load. It is used to improve the performance, reliability, and scalability of applications.

### Karpenter

(Karpenter)[https://karpenter.sh/] is our tool to manage node autoscaling. Karpenter is a Kubernetes operator that manages the lifecycle of autoscaling. It allows you to manage autoscaling performing the scaling up or down of the number of servers in a cluster based on the current load using directly the AWS APIs.