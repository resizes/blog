---
slug: open-tcp-udp-same-port
title: Easily open TCP and UDP protocols on the same port
authors: lucia
tags: [DevOps, PlatformEngineering, ALB, TCP, UDP, Kubernetes, Networking, AWS]
image: TBD
---
If you’ve ever tried to expose both TCP and UDP on the same port using Kubernetes with AWS Load Balancers, you’ve probably run into a common limitation: you can only choose one protocol per port, which complicates applications that need both (such as real-time communications or gaming).

The good news is that AWS has released a feature that allows configuring listeners for both TCP and UDP on the same port, avoiding complex workarounds.

To implement this, it’s important to verify two things:
- That your **AWS Load Balancer Controller** is version **v2.13.0 or higher**.
- That the **Helm chart** is **1.13.0 or higher** to ensure compatibility.

Once that’s set, you only need to do two steps to enable both protocols on the same port:
1. In the ALB Controller’s `values.yaml` file, add:
    ```yaml
    controllerConfig:
        featureGates:
            EnableTCPUDPListener: true
    ```
2. In the LoadBalancer type Service manifest where you want to enable this functionality, add this annotation:
    ```yaml
    service.beta.kubernetes.io/aws-load-balancer-enable-tcp-udp-listener: 'true'
    ```
After that, you just need to define the port twice in your Service: once for TCP and once for UDP. Here is a complete example of a Service manifest that opens the same port for both TCP and UDP:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: ejemplo-tcp-udp
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-enable-tcp-udp-listener: "true"
spec:
  type: LoadBalancer
  selector:
    app: mi-aplicacion
  ports:
    - name: tcp-12345
      protocol: TCP
      port: 12345
      targetPort: 12345
    - name: udp-12345
      protocol: UDP
      port: 12345
      targetPort: 12345
```

>⚠️ **If you already had the load balancer created and you add this functionality now, I recommend deleting it and recreating it** to ensure the configuration is applied correctly.


### 💬 References
This new feature addresses several community-reported issues, such as [#2759](https://github.com/kubernetes-sigs/aws-load-balancer-controller/issues/2759) and [1608](https://github.com/kubernetes-sigs/aws-load-balancer-controller/issues/1608). I hope this is helpful to those following those threads!