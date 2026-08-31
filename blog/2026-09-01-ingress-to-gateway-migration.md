---
slug: ingress-to-gateway-migration
title: "Ingress NGINX is retiring — how we cut over to Envoy Gateway in 3 days (without downtime)"
description: "SIG Network retires Ingress NGINX in March 2026. Scope, the oauth2-proxy bugs we caught before DNS moved, what ingress2gateway does not cover, and how Resizes runs the same cutover for you."
date: "2026-09-01"
authors: ramiro
image: /img/01-09-2026_ingress-to-gateway.jpg
categories:
  - engineering
  - kubernetes
  - platform-engineering
tags:
  - ingress
  - gateway-api
  - envoy-gateway
  - kubernetes
  - migration
  - platform-engineering
---

Most organizations do not have an **ingress strategy**. They have NGINX controllers that grew with the cluster — snippet annotations, oauth2-proxy in front of internal tools, cert-manager secrets in app namespaces — and a [March 2026 deadline](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/) that is not on anyone's roadmap yet.

At **[Resizes](https://resiz.es/)**, we migrated production traffic on EKS from Ingress NGINX to **[Envoy Gateway](https://gateway.envoyproxy.io/)**: **dual-run**, canary DNS per hostname, NGINX left up until each host was proven on Envoy.

**Three days** is the **DNS cutover window**, not the full program. Platform design, Envoy Gateway rollout, and our migration toolkit came first. Those three days were lane conversion, GitOps merges, and moving ~50 hostnames — **no user-visible outage**, **no DNS rollback**, **no incidents filed in our change log**. We scaled NGINX down about a week later, after soak.

---

## Scope

| | |
| --- | --- |
| **Cluster** | One production EKS estate |
| **Traffic lanes** | 3 (`IngressClass`: internal, external, custom) |
| **Ingress objects** | ~40 across all lanes |
| **Hostnames on Envoy** | ~50 (multi-host Ingresses, per-customer TLS on custom) |
| **GitOps** | Argo CD; HTTPRoutes in each app's `templates/` |
| **Team** | 2–3 platform engineers; app teams unchanged |

**Zero downtime** meant users always hit a working endpoint. We did not remove NGINX for a hostname until Envoy passed auth, TLS, and path checks — tested with `curl --resolve` while DNS still pointed at NGINX.

Gateways and NLBs were live in dual-run **before** the first DNS change. The three-day window was only the DNS moves.

```bash
kubectl get pods --all-namespaces \
  --selector app.kubernetes.io/name=ingress-nginx
```

If that returns controllers, you have a deadline. After March 2026 there are no security patches — see [SIG Network's announcement](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/) for context.

---

## The migration that almost shipped broken (oauth2-proxy)

ingress2gateway alone was not enough. The wake-up call was an **internal app behind oauth2-proxy**.

NGINX used `auth-url` and `auth-response-headers`. The HTTPRoute looked fine in Git. Against the new Gateway with `curl --resolve` — **before** DNS — we hit:

1. **401 on APIs** — backend expected `X-Auth-Request-Email`; Envoy was not forwarding extAuth headers like NGINX.
2. **202 from extAuth** — oauth2-proxy's `/oauth2/auth` returns 202; Envoy Gateway only accepts **200**.
3. **405 on POST** — traffic went through oauth2-proxy instead of the frontend Service.

None of that shows up in `kubectl get httproute`. All of it would have been a production incident after a DNS flip.

The pattern we reuse:

- HTTPRoute → **application** Service, not oauth2-proxy
- `SecurityPolicy` extAuth → oauth2-proxy with **`upstreams: ["static://200"]`**
- Test session cookies and API calls **before** ExternalDNS hands off the name

In every estate we have assessed, at least one of **auth-url**, **snippets**, or **per-host TLS** needed work beyond ingress2gateway.

---

## ingress2gateway is the converter — not the migration

We still start with **[ingress2gateway](https://github.com/kubernetes-sigs/ingress2gateway)**. Plain apps get a useful HTTPRoute draft.

Production also needs platform manifests (Gateway + NLB per `IngressClass`), conversion from **live** Ingress (not Helm templates in Git), post-processing (`parentRefs`, ExternalDNS, cert-manager, extAuth, `X-Forwarded-Proto`), GitOps promotion into app charts, and a **triage report** per lane.

That is what our **closed-source toolkit** delivers on a Resizes engagement: discovery + lane design, platform manifests, per-lane convert and report, promotion PRs into your GitOps repo, and a cutover runbook.

### Conversion report (excerpt)

Full estate: **~40 Ingress**. One lane (custom): 18 snapshots → 61 resources. ingress2gateway warnings + toolkit follow-ups, anonymized:

```text
Lane: custom
Input Ingress snapshots: 18
Output resources kept: 61
Dropped (platform-owned Gateway): 18

WARN  Unsupported annotation nginx.ingress.kubernetes.io/configuration-snippet
      object: Ingress: acme-cms/acme-wordpress
WARN  Unsupported annotation nginx.ingress.kubernetes.io/server-snippet
      object: Ingress: acme-cms/acme-wordpress
WARN  Unsupported annotation nginx.ingress.kubernetes.io/force-ssl-redirect
      object: Ingress: saas-app/saas-app-main

INFO  nginx auth-url → SecurityPolicy extAuth oauth2-proxy:4180
INFO  RequestHeaderModifier X-Forwarded-Proto=https (TLS terminated before Envoy)
```

One CMS needed snippet logic translated manually — deny a path, proxy assets externally, serve the rest in-cluster — into HTTPRoute rules, a direct-response filter, and Envoy `Backend` resources. Custom-lane TLS needed per-host SNI, `ReferenceGrant` per namespace, and the right NLB `targetPort`. Test with real hostnames and SNI, not the raw NLB URL.

---

## Cutover without downtime

**NGINX and Envoy ran together** until each hostname moved.

1. Envoy Gateway + Gateways up; **new NLB per lane**; DNS still on NGINX.
2. HTTPRoutes synced via GitOps.
3. Validate each host from VPC/VPN — DNS unchanged. Lower TTL to ~60s in the week before if you can:

```bash
NEW_LB=<gateway-internal-….elb.region.amazonaws.com>

curl -vk --resolve app.internal.example.com:443:${NEW_LB} \
  https://app.internal.example.com/
```
4. Move **one hostname** — ExternalDNS handoff (one owner per name) or manual alias.
5. Soak; repeat. Internal first; auth-heavy and customer-facing after.
6. Wildcard records last.

With ExternalDNS `policy: sync`, add `gateway-httproute` as a source and copy `managed-by` / hostname annotations to HTTPRoutes. Rollback: point the alias back at the NGINX NLB.

---

## Why Envoy Gateway

SIG Network points to **Gateway API**. We picked **Envoy Gateway** because ingress2gateway emits it, we needed north-south routing without a mesh, and policy CRDs cover extAuth and backends without snippets. Cilium Gateway, AWS Gateway API Controller, or Kong may fit you better; for our three-lane EKS estate with heavy annotation debt, Envoy Gateway was what we could ship.

---

## The 3-day DNS window

| Day | Work |
| --- | --- |
| **1** | Lane converts; report triaged; oauth2-proxy + TLS on internal canaries via `--resolve` |
| **2** | GitOps PRs merged; DNS handoffs on internal + external; ExternalDNS checked |
| **3** | Custom lane DNS; all ~50 hostnames on Envoy |

| | |
| --- | --- |
| DNS cutover | **3 days** |
| User-visible outages / rollbacks | **0** |
| NGINX removed | **~1 week later** (24–48h soak per lane) |

**Next time:** drop TTL on all canary zones a week ahead; finish snippet translations before DNS week; consider weighted Route53 on the first external host.

This timeline assumes Envoy Gateway, Gateways, and NLBs were already running in dual-run — platform and toolkit in place, as in our case.

Repeatable sequence: **convert → report → fix → PR → `--resolve` → DNS → soak → decommission**.

---

## After cutover

Patchable control plane past March 2026. Routing in reviewable CRDs instead of snippets. New hosts follow HTTPRoute templates instead of copied nginx annotations. Dual-run costs a few hundred dollars per month on AWS until NGINX is gone per lane; steady state is similar. What you skip is the emergency migration when patches stop.

---

## How we run this for you

1. **Discovery** — inventory, annotation scan, lane design → migration map and cutover estimate.
2. **Platform** — Envoy alongside NGINX.
3. **Convert + GitOps** — cluster-first convert, report triage, PRs into your Argo `templates/`.
4. **Cutover + handover** — canary DNS, soak, NGINX decommission.

We will say wait if you are ALB-only, Ingress count is tiny with accepted risk, or nginx behavior has no Gateway API equivalent.

[Contact us](https://resiz.es/) for a short discovery — retirement check, annotation scan, and a cutover timeline for your environment.
