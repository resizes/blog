---
slug: aws-secrets-manager-to-1password
title: "Stop paying $0.40 per secret: cut AWS Secrets Manager cost and run secrets more efficiently"
description: "What Secrets Manager really costs at 50, 500, and 5,000 secrets — and how we help organisations move to a portable, cheaper operating model with 1Password and External Secrets."
date: "2026-07-26"
authors: ramiro
image: /img/blog/aws-secrets-manager-to-1password/preview.jpg
tags:
  - engineering
  - kubernetes
  - finops
  - aws
  - secrets-manager
  - 1password
  - external-secrets
  - platform-engineering
  - migration
---

Most organisations do not have a “secrets strategy.” They have an AWS line item that grows every time someone creates another credential — and a platform team that still opens tickets to wire the next service into IAM.

AWS Secrets Manager charges **$0.40 per secret, every month**, plus API usage ([official pricing](https://aws.amazon.com/secrets-manager/pricing/)). There is no volume discount. Forgotten secrets still bill. Cross-region replicas bill again. Copy the same logical secret into `dev`, `staging`, and `prod` and you pay three times.

That is not only a FinOps problem. It is an **efficiency** problem: two sources of truth (password manager for people, Secrets Manager for apps), cloud-locked access paths, and more glue each time you add a cluster.

We help organisations **quantify that cost, redesign how secrets are delivered, migrate safely, and leave teams with an operating model that is cheaper and easier to run**.

<!--truncate-->

---

## What this is costing you

Storage alone (API usually stays secondary if you cache):

| Secrets in Secrets Manager | Per month | Per year |
| --- | --- | --- |
| **50** | **$20** | **$240** |
| **500** | **$200** | **$2,400** |
| **5,000** | **$2,000** | **$24,000** |

At 5,000 secrets you are looking at roughly **$24k/year before** replicas, multi-account sprawl, or environment copies. Many estates behave like:

```text
yearly ≈ secrets × environments × 0.40 × 12
```

So 2,000 logical secrets × 3 environments is closer to **$28,800/year** in storage — still before API calls.

If you already pay for **1Password Business** (or similar) for people, vault items used for automation do **not** meter at $0.40 each. Connect hosting is typically a small Kubernetes footprint. The saving below is the AWS storage you can stop paying — not a claim that the destination stack costs nothing.

| Scale | Typical yearly AWS storage | What that budget usually funds better |
| --- | --- | --- |
| 50 secrets | ~$240 | Small; still worth cleaning if you are building the right model anyway |
| 500 secrets | ~$2,400 | A focused secrets platform cutover |
| 5,000 secrets | ~$24,000 | Sustained platform capacity — or the bill you keep writing if you do nothing |

**Check your number:** Cost Explorer → `AmazonSecretsManager`, then reconcile with secret count (including replicas and secrets in a deletion recovery window).

---

## Efficiency: what actually improves for the business

Cost is the easy spreadsheet. Efficiency is why platform and security leaders care.

| Today with Secrets Manager as system of record | After a proper cutover |
| --- | --- |
| Every new service needs an IAM path into AWS | Services sync secrets through a standard cluster pattern |
| Humans in 1Password, apps in AWS — two ACL and audit stories | One vault model for people and workloads |
| Adding a cluster means reinventing secret delivery | Shared Connect + one vault / store per cluster |
| Staging “shares” prod-ish secrets to avoid paying 3× | Honest per-environment vaults without a per-secret AWS tax |
| Spend grows with secret count forever | Spend is seats + a small control plane, not $0.40 × N |

**Cloud agnosticism** is the strategic version of the same point: secrets stop being an AWS account feature and become a platform capability. You can run the same delivery model on EKS, another cloud, or on-prem clusters that can reach Connect — without redesigning IAM for every estate.

---

## The operating model we put in place

We implement a pattern built for multi-cluster organisations:

1. **One vault per environment / Kubernetes cluster** in 1Password.
2. **One Connect Server** (shared behind ingress when clusters can reach each other).
3. **One cluster-wide secret store per cluster**, with a **read-only** token limited to that cluster’s vault.
4. Workloads declare sync resources against that store — **not** a custom store (and IAM role path) per team.

Runtime stays read-only. Write access is reserved for controlled admin and migration windows. That reduces blast radius and stops production clusters holding write credentials they do not need.

---

## How we improve this in your organisation

We run this as a delivery engagement, not a slide deck.

### 1. Cost and opportunity snapshot (short discovery)

- Inventory secrets across accounts and regions (replicas and pending deletions included).
- Produce **your** monthly/yearly Secrets Manager figure at real counts — not a generic table.
- Separate what should move now from what should stay on AWS (for example native DB rotation still tied to Secrets Manager).
- Agree success criteria with platform, security, and FinOps.

**You leave this step with a number and a scope**, not a philosophy.

### 2. Target design for your estate

- Vault layout aligned to how you isolate environments and clusters.
- Connect topology and token boundaries (read-only for runtime).
- Standard onboarding path for application teams.
- Cutover order that protects production (usually non-prod first).

### 3. Migration and cutover

- Move secrets into the right vaults with naming and ownership agreed up front.
- Dry runs, then staged cutovers per environment.
- Validate cluster sync before AWS copies are removed.
- **Delete (or schedule deletion of) AWS secrets** so the $0.40 lines actually disappear — migration without cleanup is only half the saving.

### 4. Handover for ongoing efficiency

Your teams should be able to:

- Onboard a service without inventing a new IAM/secrets path.
- Add a cluster by attaching it to the shared model and its own vault.
- Govern human and machine access in one place.
- Treat secrets spend as a platform metric Finance can track.

---

## When we would tell you not to move (yet)

We will say so if:

- Almost all consumers are AWS-native and there is no multi-cluster plan.
- Critical rotation depends on Secrets Manager’s AWS-native flows and must stay put for now.
- Secret count is tiny and changing the operating model costs more than it saves today.

Otherwise — especially from **hundreds of secrets** upward, or when 1Password is already on the books — the combination of **lower recurring AWS cost** and **a simpler delivery model** is usually worth a concrete plan.

---

## Talk to us

If you want to know what Secrets Manager is costing **your** organisation and what a cleaner model would look like in your clusters, we can start with a short discovery: inventory, cost estimate, and a migration outline.

**Outcome we aim for:** lower AWS secrets spend, one operating model for humans and workloads, and a platform your teams can extend without growing a per-secret cloud tax every month.

[Contact us](/contact) to schedule that conversation.
