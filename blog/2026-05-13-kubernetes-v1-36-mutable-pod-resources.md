---
title: Kubernetes v1.36 - Mutable Pod Resources for Suspended Jobs
slug: kubernetes-v1-36-mutable-pod-resources
authors: guille
tags: [kubernetes, batch-workloads, ml-training, platform-engineering]
image: /img/blog/kubernetes-v1-36/preview.jpg
---

Batch and ML workloads often need resources that aren't known at Job creation time. The optimal allocation depends on cluster capacity, queue priorities, and hardware availability — all of which can change between submission and execution.

Kubernetes v1.36 promotes a feature to beta that solves this: **mutable pod resources for suspended Jobs**.

Before this, resource requirements in a Job's pod template were immutable. If a queue controller determined that a suspended Job should run with different resources, the only option was to delete and recreate the Job — losing metadata, status, and history.

<!--truncate-->

## Why This Matters

The problem is straightforward. You submit a Job with estimated resources. The cluster is busy. A queue controller like Kueue sees that only half the GPUs are available. Without this feature, your options are:

1. Wait until full resources are available (blocking the queue)
2. Delete and recreate the Job with lower resources (losing history)
3. Fail the Job entirely

None of these work well for ML training or batch pipelines that need flexibility.

This feature allows queue controllers and cluster administrators to adjust CPU, memory, GPU, and extended resource specifications on a Job while it's suspended — before it starts or resumes running.

## How It Works

The Kubernetes API server relaxes the immutability constraint on pod template resource fields specifically for suspended Jobs. No new API types were introduced.

**Mutable fields:**
- `spec.template.spec.containers[*].resources.requests`
- `spec.template.spec.containers[*].resources.limits`
- `spec.template.spec.initContainers[*].resources.requests`
- `spec.template.spec.initContainers[*].resources.limits`

**Conditions for mutation:**
- The Job has `spec.suspend` set to `true`
- For Jobs that were previously running, all active Pods must have terminated (`status.active` equals 0)

Standard resource validation still applies. Limits must be greater than or equal to requests. Extended resources must be specified as whole numbers where required.

## Practical Example

A machine learning training Job initially requests 4 GPUs:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: training-job-example-abcd123
  labels:
    app.kubernetes.io/name: trainer
spec:
  suspend: true
  template:
    spec:
      containers:
      - name: trainer
        image: example-registry.example.com/training:latest
        resources:
          requests:
            cpu: "8"
            memory: "32Gi"
            example-hardware-vendor.com/gpu: "4"
          limits:
            cpu: "8"
            memory: "32Gi"
            example-hardware-vendor.com/gpu: "4"
```

A queue controller determines only 2 GPUs are available. It updates the Job:

```yaml
resources:
  requests:
    cpu: "4"
    memory: "16Gi"
    example-hardware-vendor.com/gpu: "2"
  limits:
    cpu: "4"
    memory: "16Gi"
    example-hardware-vendor.com/gpu: "2"
```

Then resumes the Job:

```bash
kubectl patch job training-job-example-abcd123 -p '{"spec":{"suspend":false}}'
```

The Job runs with adjusted resources instead of blocking the queue.

## What's New in Beta

In Kubernetes v1.36, the `MutablePodResourcesForSuspendedJobs` feature gate is **enabled by default**.

Clusters running v1.36 can use this feature without additional API server configuration. For v1.35 clusters, enable the feature gate manually.

## Considerations

### Running Jobs that Get Suspended

If you suspend a Job that was already running, wait for all active Pods to terminate before modifying resources. The API server rejects mutations while `status.active` is greater than zero.

### Pod Replacement Policy

For Jobs with failed Pods, consider setting `podReplacementPolicy: Failed`. This ensures replacement Pods are only created after previous Pods have fully terminated, preventing resource contention from overlapping Pods.

### ResourceClaims

Dynamic Resource Allocation (DRA) `resourceClaimTemplates` remain immutable. If your workload uses DRA, you must recreate the claim templates separately to match resource changes.

## Try It Out

```bash
# Create a suspended Job
kubectl apply -f my-job.yaml --server-side

# Edit the resource requests
kubectl edit job training-job-example-abcd123

# Resume the Job
kubectl patch job training-job-example-abcd123 -p '{"spec":{"suspend":false}}'
```

## TL;DR

**Before:** Resource requirements in Job pod templates were immutable. Controllers had to delete and recreate Jobs to adjust resources.

**Now:** Suspended Jobs can have their resource requests and limits modified, enabling dynamic resource allocation for batch and ML workloads.

**Key benefits:**
- ✅ Queue controllers can adjust resources based on availability
- ✅ Jobs can progress with reduced resources instead of blocking
- ✅ No need to delete and recreate Jobs
- ✅ Preserves Job metadata, status, and history

## Resources

- [Kubernetes Blog - v1.36 Announcement](https://kubernetes.io/blog/2026/04/27/kubernetes-v1-36-mutable-pod-resources-for-suspended-jobs/)
- [KEP-5440 Tracking Issue](https://kep.k8s.io/5440)
- [Kueue - Queue Controller](https://kueue.sigs.k8s.io/)
- [SIG Apps Slack](https://kubernetes.slack.com/archives/C18NZM5K9)
- [WG Batch Slack](https://kubernetes.slack.com/archives/C032ZE66A2X)