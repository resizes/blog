---
slug: kubernetes-commands
title: Kubernetes Most Used Commands
authors: resizes
tags: [PlatformEngineering, Helm, Kubernetes, DevOps]
---

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It is widely used by many organizations to manage their containerized applications and services. Kubernetes provides a rich set of commands that allow developers and operators to interact with the Kubernetes cluster and manage their applications and services. In this blog post, we will explore some of the most used Kubernetes commands that can help you streamline your Kubernetes deployments and efficiently manage your applications.

<!--truncate-->

## Esential Commands for Developers

### Get Information

Kubernetes provides a set of commands to get information about the resources running in the cluster. You can use these commands to get information about pods, services, deployments, and other resources.

```bash
kubectl version # Get the Kubernetes version
```

```bash
kubectl cluster-info # Display cluster info
```

```bash
kubectl config view --minify --output 'jsonpath={..user}' # Get the current user
```

:::tip
Try with `context` and `cluster` to get more information about the current context and cluster.
:::

### Gather Resources

Kubernetes allows you to gather resources from the cluster. You can use these commands to get resources such as pods, services, deployments, and other resources.

```bash
kubectl get pods # List all pods
```

```bash
kubectl get services # List all services
```

```bash
kubectl get deployments # List all deployments
```

```bash
kubectl get nodes # List all nodes
```

```bash
kubectl get namespaces # List all namespaces
```

:::tip
Try with other resources such as `configmaps`, `secrets`, `ingresses`, `replicasets`, `statefulsets`, `daemonsets`, `persistentvolumeclaims`, `hpa`, `jobs`, `crd`, etc.
:::

:::tip
Use `kubectl get all` to get all resources in the cluster.
:::

### Use Flags to Filter

Kubernetes allows you to use flags to filter the resources. You can use these flags to filter the resources based on labels, fields, and other criteria.

```bash
kubectl get pods -w -o wide -A --show-labels # Watch all pods with wide output and labels
```

:::tip
Use those flags wisely!

`-w` to watch for changes, `-o wide` to get more information, `-A` to get all resources, `--show-labels` to show labels.
:::

### Debugging

Kubernetes provides a set of commands to debug the resources running in the cluster. You can use these commands to debug pods, services, deployments, and other resources.

```bash
kubectl describe pod <pod-name> # Describe a pod
```

```bash
kubectl logs <pod-name> # Get logs from a pod
```

:::tip
If you would like to follow the logs, use `-f` flag.
:::

### Imperative Commands

Kubernetes allows you to run imperative commands to manage resources. You can use these commands to create, delete, and update resources.

```bash
kubectl create deployment <name> --image=<image> # Create a deployment
```

```bash
kubectl expose deployment <name> --port=<port> --target-port=<target-port> --type=NodePort # Expose a deployment
```

```bash
kubectl scale deployment <name> --replicas=<replicas> # Scale a deployment
```

```bash
kubectl create secret generic <name> --from-literal=<key>=<value
```

:::tip
Use `--dry-run=client` and `-o yaml` flags to generate the resource manifest.
:::

### Troubleshooting

Kubernetes provides a set of commands to troubleshoot the resources running in the cluster. You can use these commands to troubleshoot pods, services, deployments, and other resources.

```bash
kubectl run <name> --image=<image> --restart=Never --rm -it -- sh # Run a pod for troubleshooting
```

```bash
kubectl exec -it <pod-name> -- sh # Execute a command in a pod
```

:::tip
You are now inside the pod, use the shell to run commands and troubleshoot.
:::

### Scale & Update

Kubernetes allows you to scale and update resources. You can use these commands to scale and update deployments, replicasets, and other resources.

```bash
kubectl scale deployment <name> --replicas=<replicas> # Scale a deployment
```

```bash
kubectl set image deployment/<name> <container-name>=<new-image> # Update a deployment
```

```bash
kubectl rollout history deployment/<name> # Get rollout history
```

```bash
kubectl rollout undo deployment/<name> # Undo a rollout
```

```bash
kubectl rollout status deployment/<name> # Get rollout status
```

```bash
kubectl rollout restart deployment/<name> # Restart a rollout
```

### Modify Resources

Kubernetes allows you to modify resources. You can use these commands to modify resources such as pods, services, deployments, and other resources.

```bash
kubectl edit pod <pod-name> # Edit a pod
```

```bash
kubectl apply -f <file> # Apply a configuration file
```

```bash
kubectl replace -f <file> # Replace a configuration file
```

```bash
kubectl delete -f <file> # Delete a configuration file
```

```bash
kubectl patch <resource> <name> -p <patch> # Patch a resource
```

### Monitoring

Kubernetes provides a set of commands to monitor the resources running in the cluster. You can use these commands to monitor pods, services, deployments, and other resources.

```bash
kubectl top nodes # Show the top nodes
```

```bash
kubectl top pods # Show the top pods
```

:::warning
You need to have the `metrics-server` installed in your cluster to use these commands. Follow the [official documentation](https:///github.com/kubernetes-sigs/metrics-server) to install the `metrics-server`.
:::

### Connect to Apps

Kubernetes allows you to connect to applications running in the cluster. You can use these commands to connect to pods, services, deployments, and other resources.

```bash
kubectl port-forward <pod-name> <local-port>:<remote-port> # Forward a port
```

```bash
kubectl port-forward service/<service-name> <local-port>:<remote-port> # Forward a port for a service
```

:::tip
Open in your browser `http://localhost:<local-port>` to play with your application.
:::

### Other Commands

Useful commands to manage your Kubernetes cluster and resources.

```bash
kubectl get secret admin-secret -o jsonpath="{.data.password}" | base64 --decode # Get a secret
```

```bash
kubectl api-resources # List all resources
```

```bash
kubectl explain <resource> # Explain a resource
```

### Tools

A great list of tools to manage your Kubernetes cluster and resources.

```bash
kubens # Switch between namespaces
```

```bash
kubectx # Switch between contexts
```

```bash
k9s # Terminal-based UI to interact with your Kubernetes cluster
```

```bash
stern # Multi pod and container log tailing
```
