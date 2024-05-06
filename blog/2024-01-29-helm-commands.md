---
slug: helm-commands
title: Helm Most Used Commands
authors: guille
tags: [PlatformEngineering, Helm, Kubernetes, DevOps]
---

Helm is a package manager for Kubernetes that allows developers and operators to more easily package, configure, and deploy applications and services onto Kubernetes clusters. Helm is the most popular package manager for Kubernetes and is widely used by many organizations.

Dive into the world of Helm commands - your gateway to simplified Kubernetes deployments and efficient package management. Uncover the power to streamline, deploy, and manage applications effortlessly. Ready to elevate your container orchestration game? 🚀📦 

<!--truncate-->

## Installation

Begin your Helm journey by installing the Helm client on your local machine. You can install Helm using the following command:

```bash
brew install helm
```

## App Install & Uninstall

Helm allows you to install and uninstall applications on your Kubernetes cluster. You can install an application using these commands:

```bash
helm create <name> # Create a new default chart with the given name
```

```bash
helm install <name> <chart> [--namespace <name>] [--values <file>] # Install the chart with the given release name
```

```bash
helm uninstall <name> # Uninstall the given release name
```

## Get Information

Helm allows you to get information about your applications and releases. You can get information using these commands:

```bash
helm list [--all-namespaces] # List releases
```

```bash
helm status <release> # Show the status of the named release
```

```bash
helm history <release> # Fetch release history
```

## Change App Version

Helm allows you to change the version of your applications. You can change the version using these commands:

```bash
helm upgrade <release> <chart> [--atomic <file>] [--version <version>] # Upgrade the release to a new version of the chart
```

```bash
helm rollback <release> <revision> # Rollback to a previous revision
```

## Chart Management

Helm allows you to manage your charts. You can manage your charts using these commands:

```bash
helm lint <chart> # Lint the chart
```

```bash
helm template <name> <directory> # Render chart templates locally and display the output
```

```bash
helm show values <chart> # Show the values file of the given chart
```

```bash
helm dependencies update # Update the dependencies of the given chart
```

## Repo Management

Helm allows you to manage your repositories. You can manage your repositories using these commands:

```bash
helm repo list # List chart repositories
```

```bash
helm repo add <name> <url> # Add a chart repository
```

```bash
helm repo remove <name> # Remove a chart repository
```

```bash
helm search repo <name> # Search for a specific chart
```
