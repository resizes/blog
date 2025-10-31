---
slug: latest-work
title: Our latest work with a client
authors: Dario, Gonza
tags: [Kubernetes, Infrastructure, MySQL, MongoDB, AWS, CICD, GitOps]
image: 
---

## Case: SotySolar
We partnered with Be Energy Part S.L. (operating under the brand Sotysolar), a leading force in the solar panel installation sector across Spain and Portugal and green energetic solutions. 
With over 12,000 panels installed and a growing presence in the renewable energy market, Sotysolar continues to push the boundaries of sustainable innovation.

Our collaboration began when Sotysolar approached us to streamline and modernize their software development lifecycle. 
Their goal was to adopt a more agile and efficient approach to cloud-based software deployment, enabling them to scale faster, reduce downtime, and improve delivery speed.

## What was the goal
Our objective was to build a new Internal Development Platform which would allow to adopt leading practices to enhance business efficiency.
This product would offer SotySolar a better software development experience and allow to scale their services effortlessly while reducing their cloud-associated costs and decreasing the CO2 footprint and energy usage. 

The solution uses Amazon EKS for seamless autoscaling, to help reduce expenses and CO2 consumption by provisioning only the necessary resources at each moment.
For each environment, Helm and ArgoCD are used to optimize the deployment of various applications, such as the web application and a MongoDB database.
Additionally, GitOps are adopted to automate software development, ensuring fast and reliable deployments of applications and services in CI/CD.

## Explaining Our Solution
### Cloud Provider Migration: From DigitalOcean to Amazon Web Services (AWS)
As AWS partners, we chose to migrate the current infrastructure from DigitalOcean to AWS due to better pricing and AWS's strong commitment to sustainability. 
Since 2023, AWS has matched its energy usage with renewable sources and is actively pursuing greener solutions, aiming for net-zero carbon emissions by 2040 and to become water-positive by 2030.
We strongly believe that these objectives align with Sotysolar's goals as a renewable energy company.


### Infrastructure Management: From VMs to Kubernetes
Virtual Machines (VMs) offer simplicity and are easier to operate, modify, and use for rapid prototyping. 
They’re accessible for smaller teams and help deliver quick initial deployments. 
However, they rely heavily on manual management and don't scale efficiently, which was a problem in SotySolar's infrastructure.

We propose to use Kubernetes, a tool that automates container orchestration and provides a robust ecosystem with self-healing, rolling updates, and simplified horizontal scaling. 
It offers greater customization, enabling features like cluster observability, resource monitoring, and alerting. 
While Kubernetes has a steeper learning curve, it supports Infrastructure as Code (IaC), allowing declarative deployments and GitOps workflows that improve reliability and automation.


### GitOps and the importance of Infrastructure as Code (IaC)
GitOps is a methodology for managing infrastructure using IaC tools (like YAML, Terraform, and Helm) with Git as the single source of truth. 
It brings agility, automation, and consistency to cloud environments by allowing all changes to go through version-controlled Git workflows.
This enables streamlined CI/CD pipelines, where new deployments can be triggered automatically when a pull request is merged. 
It also ensures that all environments remain consistent, reducing configuration drift and simplifying rollbacks.

Without IaC, infrastructure changes are often undocumented, leading to technical debt and inconsistent environments. 
Manual setups make disaster recovery slower and more error-prone, as there’s no clear record of the intended system state. 
Additionally, it becomes harder to maintain visibility and control over infrastructure, as well as scale it, especially as systems grow in complexity.


### Upgrading older software
Software components, especially databases, are often left on outdated versions due to concerns about downtime, dependency breakage, or lack of automated deployment processes. 
In many environments, updates are delayed simply because the system is stable and changing it feels risky or time-consuming, which adds up technical debt and engraves the problem.

However, keeping old versions introduces several issues: 
They often contain known security vulnerabilities, may lack critical performance improvements, and can become incompatible with newer services or libraries. 
Over time, vendors may drop support entirely, making future updates more complex and leaving systems exposed or providing little to no help in future situations.

This can be avoided by integrating version management into regular development workflows. 
Using tools like Terraform, Helm, or Docker, updates can be defined and tested as part of infrastructure code. 
Combined with CI/CD pipelines and staging environments, we allow to roll out updates safely in minor environments, detect issues early, and reduce the risk of problems in production.


### FinOps and costs management
FinOps (short for Financial Operations) is a practice that helps organizations manage and optimize their cloud spending by combining finance, engineering, and operations teams.
It focuses on creating visibility, accountability, and control over cloud costs. This enables teams to make informed decisions about their current infrastructure.

We believe adopting FinOps early is important because cloud costs can grow rapidly and unpredictably, especially as systems scale. 
Also, without any proper cost tracking, it becomes hard to properly provision resources. 
FinOps leads to better financial planning and more sustainable cloud practices from the start of the project.


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
We attempted several workarounds to resolve this issue. Unfortunately, none of these approaches fully resolved the compatibility issues, forcing us to settle on an intermediate supported version (7.x) and schedule an upgrade in the future.

#### MySQL 
We use AWS Aurora and RDS because they enable rapid infrastructure-as-code deployment via Terraform.
Originally, the migration was planned with AWS DMS, but several critical limitations made it impractical.
Finally, we decided to be ourselves the ones to do the migration task by hand.

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
    - Resilience: DLQs prevent message loss and simplify failure analysis.