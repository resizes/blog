---
slug: github-stacked-prs
title: GitHub Stacked PRs - How to Split Large Changes into Small PRs Without Losing Your Mind
authors: guille
tags: [GitHub, Pull Requests, Workflow, Developer Experience]
image: img/github-stacked-prs.png
---

The problem of giant PRs that nobody wants to review is universal. You open a pull request with 50 modified files and think: "this is going to take days to review." Reviewers lose context, conflicts pile up, and feedback gets fragmented.

GitHub just launched **gh-stack**, a native tool to manage **Stacked PRs** — chained PRs that build on top of each other, independently reviewable but mergeable in cascade.

<!--truncate-->

## What Are Stacked PRs?

A **stack** is a chain of PRs where each PR has the previous PR's branch as its base:

```
main ← PR1 (auth-layer) ← PR2 (api-routes) ← PR3 (frontend)
```

**Key features:**

- Each PR shows **only its diff**, not everything before it
- GitHub understands the full stack and shows a **visual map**
- Merge is **in cascade**: merge PR1 → others automatically rebase
- Branch protection rules apply to the final branch (main), not intermediate ones

## Installation

```bash
# Install the extension
gh extension install github/gh-stack

# Optional alias to type less
gh stack alias
# Now you can use `gs` instead of `gh stack`
```

**For AI coding agents** (GitHub Copilot, etc.):

```bash
npx skills add github/gh-stack
```

This gives your AI agent context to create and manage stacks.

## Basic Workflow

### 1. Start a stack

```bash
cd my-project
gh stack init
```

It will ask you to name your first branch. The stack uses the default branch (main) as trunk.

### 2. Work on the first layer

```bash
# ... write code ...
git add .
git commit -m "Add auth middleware"
```

### 3. Add layers to the stack

```bash
gh stack add api-routes

# ... write code ...
git add .
git commit -m "Add API routes"
```

### 4. Push and create PRs

```bash
gh stack push      # Push all branches
gh stack submit    # Create PRs and link them as a stack
```

### 5. View the status

```bash
gh stack view
```

Shows all branches, links to PRs, CI status, and last commit.

## Cascade Merge: The Magic Behind It

When you're ready to merge:

1. **Partial merge:** You can merge only the lower PRs. The rest automatically rebase.
2. **Full merge:** Merge all PRs in the stack with one click.
3. **Automatic rebase:** After merge, remaining PRs update themselves.

**Visual example:**

```
main ← PR1 (auth) ← PR2 (api) ← PR3 (frontend)
       ↓ merge PR1
main ←────────────── PR2 (api) ← PR3 (frontend)
                         ↓ merge PR2
main ←──────────────────────────── PR3 (frontend)
```

No branch conflicts. GitHub handles everything.

## Ideal Use Cases

### Large features in parallel development

You're working on a feature with 3 parts: backend, API, frontend. With stacks:

- Create PR1 with the backend
- While it's being reviewed, add PR2 with the API (on top of PR1)
- While both are being reviewed, add PR3 with frontend (on top of PR2)

Everything gets reviewed in parallel, but each reviewer only sees their part.

### Layered refactors

You want to refactor the auth system:

- PR1: New folder structure
- PR2: Move logic to services
- PR3: Update tests

Each change is independently reviewable.

### Multi-team reviews

One team reviews the backend, another the frontend. With stacks, each team only sees what concerns them.

## Quick CLI Reference

| Command | What it does |
|---------|--------------|
| `gs init` | Start a new stack |
| `gs add <name>` | Add a layer to the stack |
| `gs push` | Push all branches |
| `gs submit` | Create PRs on GitHub |
| `gs view` | Show stack status |
| `gs rebase` | Rebase the entire stack |
| `gs merge` | Merge stack PRs |

## Comparison with Other Tools

| Tool | gh-stack | Graphite |
|------|----------|-----------|
| Integration | Native to GitHub | External service |
| CLI | `gh stack` | `gt` |
| UI in GitHub | Yes, stack map | No |
| Configuration | Zero setup | Requires setup |
| Price | Free | Freemium |

## TL;DR

**gh-stack** solves the large PR problem by letting you:

- ✅ Split changes into focused layers
- ✅ Maintain context in each review
- ✅ Cascade merge without headaches
- ✅ Work in parallel without blockers
- ✅ Everything integrated natively in GitHub

**Install and try:**

```bash
gh extension install github/gh-stack
cd your-repo
gh stack init
```

## Resources

- [Official Documentation](https://github.github.com/gh-stack/)
- [Quick Start Guide](https://github.github.com/gh-stack/getting-started/quick-start/)
- [CLI Reference](https://github.github.com/gh-stack/reference/cli/)