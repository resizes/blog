---
slug: one-message-dozens-of-calls
title: "One message, dozens of calls: how we measured and cut agent-chat spend"
description: "A chat message is not one request — it is a loop of model calls. How we attributed LiteLLM spend, saw the whole proxy in Grafana, and cut tokens without breaking the agent."
date: "2026-08-20"
authors: pablo
image: /img/20-08-2026_-_Agen-chat_spend.jpg
tags:
  - engineering
  - observability
  - llm
  - kubernetes
  - platform-engineering
---

LiteLLM isn't an infrastructure detail. It's the money bottleneck for almost everything we do with models: the Resizes AI chat, customer agents, internal pipelines. When the bill went up, the instinct was "the chat is expensive." The truth was broader: a shared proxy, no map, and an agent that turns one message into a loop of calls.

This post covers how we saw it, how we almost broke it by blindly cutting turns, and what ended up in code: per-agent and per-conversation attribution, less context, fewer tools, a real cap in the runtime, and a Grafana dashboard covering everything that goes through LiteLLM.

<!--truncate-->

## The symptom

In private beta the chat felt like it was "thinking too much": endless statuses, extra tool calls, sometimes a 502 mid-task. In parallel, LiteLLM spend didn't line up with user traffic.

The trap: a user message is not a request. It's this:

```text
User
  → web chat (Nuxt / Nitro API)
    → Agent Sandbox (EKS, one sandbox per deployment)
      → Hermes (agent runtime inside the sandbox)
        → N calls to LiteLLM  (think, tool, think, tool…)
          → model (Bedrock / Claude, Ollama Cloud, …)
```

Postgres — CloudNativePG (CNPG) in our cluster — stores what the person sees. LiteLLM stores what gets paid. If those two views don't cross, you're operating blind.

And Resizes AI wasn't the only client of the proxy. The same LiteLLM serves Resizes Agentic (our platform product), customer agents, and other internal services. Without platform-level metrics, a spend spike could be the chat… or any other consumer.

## Two problems, two instruments

| Question | Where it's answered |
|----------|-------------------|
| Which agent / org / conversation is spending? | LiteLLM spend logs + attribution headers + `X-Resizes-LiteLLM-Session` |
| Is the proxy healthy? Which model is failing? What's total traffic? | Prometheus + Grafana + Discord alerts |

We measured first. We cut second. In that order, on purpose.

## Layer 1 — Attributing Resizes AI spend

Before, every LiteLLM call was an anonymous data point. Now Nitro (the Nuxt server) builds identity at the first hop — `web chat` in the diagram above — and Hermes forwards those headers on every one of the N calls in the loop.

What travels:

| Header | Value |
|--------|--------|
| `X-Resizes-LiteLLM-User` | Deployment UUID |
| `X-Resizes-LiteLLM-Tags` | `org:Name,agent:AgentName,env:prod` |
| `X-Resizes-LiteLLM-Session` | Conversation UUID |

```ts
// server/services/litellm-attribution.ts
export function buildLitellmAttribution(
  input: LitellmAttributionInput,
): LitellmAttribution {
  const orgRaw = input.organizationName?.trim() || input.organizationId
  const orgTag = sanitizeLitellmTagValue(orgRaw) || 'unknown'
  const displayRaw = input.agentDisplayName?.trim() || 'unknown'
  const agentTag = sanitizeLitellmTagValue(displayRaw) || 'unknown'
  const env = input.spendEnvironment ?? resolveLitellmSpendEnvironment()

  const tags = [
    `org:${orgTag}`,
    `agent:${agentTag}`,
    `env:${env}`,
  ]

  return {
    user: input.deploymentId,
    tags,
    tagsHeader: tags.join(','),
    sessionId: sanitizeLitellmSessionId(input.conversationId),
  }
}
```

`env` resolves with priority: first the `RESIZES_SPEND_ENV` env var (if set), then it's inferred from `NUXT_PUBLIC_APP_URL` (`local` / `test` / `prod`), to avoid mixing dogfooding with production.

In Hermes, those headers get injected into every LiteLLM call. The detail that matters: every iteration in a thread shares the same session id (the `conversationId`), so we can count "how many calls one response generates."

```python
# integrations/hermes/resizes_litellm_attribution.py
if session:
    # Don't pass session_id as a kwarg: the OpenAI SDK rejects it.
    headers["x-litellm-session-id"] = session
    extra_body = dict(api_kwargs.get("extra_body") or {})
    extra_body["litellm_session_id"] = session
    api_kwargs["extra_body"] = extra_body
```

That last part isn't theoretical. The first attempt passed `session_id=` as a top-level argument. The chat died mid-stream:

```text
Completions.create() got an unexpected keyword argument 'session_id'
```

Observability is product code. One misplaced header takes down the chat.

## Layer 2 — Grafana for everything that talks to LiteLLM

Attributing Resizes AI isn't enough if the proxy is shared. We turned on Prometheus metrics in LiteLLM, in-cluster scrape, Grafana dashboard.

The public endpoint is `/v1/` (API). Metrics live inside the cluster, at `/metrics`, scraped every 30s. Auth is off on that endpoint because it is not exposed outside the cluster — only Prometheus scrapes it.

```yaml
# core/litellm/values.yaml
litellm_settings:
  callbacks:
    - prometheus
  require_auth_for_metrics_endpoint: false
```

```yaml
# ServiceMonitor
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: litellm
  labels:
    release: kube-prometheus-stack
spec:
  endpoints:
    - port: http
      path: /metrics
      interval: 30s
```

LiteLLM dashboard (uid `litellm-proxy`):

- Deployment status (healthy / partial / outage)
- Error rate by provider and model
- Request rate by provider and model
- Fallbacks ok / failed

That bounds the pie: it's no longer "LiteLLM is expensive." It's "Claude on Bedrock has X req/s and Y% error rate; this Ollama Cloud model is the other spike; Resizes AI is this slice of spend, the rest is Resizes Agentic / customer agents / CI."

Grafana answers proxy-wide health and volume. Spend logs + attribution headers answer who within Resizes AI. Together, the two are the map.

## The false shortcut: "let's set 10 turns"

With half the numbers in hand, the first cut was dropping the agent loop to 10 iterations and sending it in the `/v1/runs` body.

In Resizes Agentic we already knew 10 breaks agents that need long tool chains. There we landed on a 50-turn cap, with forced synthesis when the agent hits the limit.

Here the finding was worse: Hermes ignored `max_turns` from the body. The `/v1/runs` handler doesn't read it. The real cap is Hermes runtime config:

```yaml
# ~/.hermes/config.yaml (local) — on EKS, Helm: agent.maxTurns: 50
agent:
  max_turns: 50   # at the cap, Hermes asks for a summary; it doesn't blow up with a 502
  # bridged to HERMES_MAX_ITERATIONS
```

Sending JSON the other side doesn't consume is a placebo limit. We removed it from the body and left the knob where the runtime actually listens.

## What actually cuts tokens (without breaking the agent)

The cost of a turn is, roughly:

```text
cost ≈ context_tokens × n_iterations
```

Tools make it worse: each tool call is another iteration, often with a bigger prompt. Three levers, not one.

### History 40 → 15

Every iteration resends the thread. 40 previous messages in a 20-turn loop is a brutal multiplier.

```ts
// server/config/agent-runtime.ts
export const AGENT_RUNTIME_DEFAULT_CHAT_HISTORY_LIMIT = 15

export function getAgentRuntimeChatHistoryLimit(): number {
  return parsePositiveInt(
    process.env.AGENT_RUNTIME_CHAT_HISTORY_LIMIT,
    AGENT_RUNTIME_DEFAULT_CHAT_HISTORY_LIMIT,
  )
}
```

And it has to be used on both paths (sync and stream). We had the constant set to 15 and the chat was still reading 40: another placebo.

```ts
const history = await chatMessagesRepository.listByConversation(
  organizationId,
  deploymentId,
  conversationId,
  getAgentRuntimeChatHistoryLimit(),
)
```

### Tool discipline in the prompt

The agent reached for terminal and code on questions that didn't need them. We added short rules to every turn's instructions:

```ts
// server/services/agent-context-assembler.ts
'## Runtime efficiency rules',
'1. Prefer a single, direct answer. Do not split a reply into multiple model turns unless the user explicitly asks for step-by-step reasoning.',
'2. Only use tools (terminal, code execution, integrations) when they are strictly necessary to answer the user. For general chat, questions, summaries, or explanations, respond directly without calling tools unless the task requires an external system.',
'3. If a tool call fails once, stop and report the failure to the user instead of retrying automatically.',
'4. Do not run the same tool more than once per user message unless the user asks for it.',
```

It's not a rate limit. It's not paying for useless turns.

### A real cap at 50, with graceful degradation

50 turns, in Hermes's ConfigMap, in both test and prod. On hitting the cap the runtime asks for a summary; the user doesn't get left with a silent 502. This already existed in the runtime; we just weren't using it.

### A token chip in the composer

Spend was an AWS invoice line. We put a token chip in the composer so the remaining balance is visible in the chat — a fuel gauge, not a surprise bill.

## What actually improved

**Operations**

- Filter spend by `agent:AgentName`, `env:prod`, `org:…`, and group a thread's calls to see iterations per response.
- Request rate, error rate, and fallbacks for the whole proxy in Grafana — not just the chat.
- Outage / error-rate / fallback alerts without drowning Discord with the rest of the cluster.

**Product**

- Fewer tokens per turn (less history, fewer unnecessary tools).
- Agents that can complete long chains (50, not 10).
- A token balance the user can see while they type.

**Engineering**

- The turn limit lives where the runtime actually reads it.
- Observability treated as a feature: the Hermes session header got a test, not just "one more header." We also stopped treating a completed SSE stream as an error.

We cut history and unused tools; we cannot yet quote a savings percentage. What we can query today is the map: how much this agent spends, which model is failing, how many calls one message generates. Savings in euros will follow; the visibility is already here.

## What's still missing (on purpose)

- **Next:** budget alerts by tag — we already have the tags, just need the thresholds.
- **After that:** a LiteLLM virtual key per agent (hard isolation) — the Resizes AI architecture already designs for it per deployment, it just isn't implemented yet.
- **Further out:** syncing LiteLLM spend with the product's token balance; Langfuse-style traces (which prompt, which tool, cost per step); a fast-path for "hi" that doesn't even enter the agent loop.

We've stopped flying blind. There's no autopilot yet.

## Checklist if you're running agents on a shared proxy

1. Grafana / Prometheus over the whole proxy, not just your app.
2. The turn limit has to live where the runtime reads it (runtime config, not the API body).
3. Cut context and tools first; don't lower turns until the agent breaks.
4. At the cap: synthesize. Don't return a 502.
5. Hot-path telemetry needs the same rigor as the feature itself.
