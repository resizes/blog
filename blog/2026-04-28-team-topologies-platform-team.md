---
title: Team Topologies - How to Structure a Platform Team That Actually Works
slug: team-topologies-platform-team
authors: laura
tags: [platform-engineering, team-topologies, devops, idp]
image: /img/blog/team-topologies/preview.jpg
---

Platform engineering is now a critical function in modern software organizations. Gartner predicts that 80% of large engineering organizations will have dedicated platform teams by 2026. But simply having a platform team isn't enough. The real challenge lies in structuring it successfully.

Many engineering teams struggle with balancing autonomy and alignment, often becoming either isolated silos or overloaded bottlenecks that slow down development instead of accelerating it.

This is where **team topologies** come in. A strategic approach to designing platform teams that ensures they integrate smoothly with engineering workflows and maximize their impact.

<!--truncate-->

## What Are Team Topologies?

Team topologies is a conceptual framework to evolve organizational structures and achieve software team interactions for fast, reliable, and adaptive delivery. It eliminates silos in software development, enhancing productivity and optimizing resource allocation.

The framework was introduced by Matthew Skelton and Manuel Pais in their book *Team Topologies: Organizing Business and Technology Teams for Fast Flow*. It identifies **four fundamental team types** and interaction modes to optimize product and service delivery.

Traditional platform teams are structured around specific functions like infrastructure, security, and operations. While this provides specialization, it often leads to siloed work and communication barriers.

Team topologies introduce a more dynamic structure with clearly defined roles and interactions — designed to help organizations structure their teams to support business goals and impact agility, developer productivity, and architectural requirements.

## The Four Team Types

### 1. Stream-Aligned Teams

Dedicated to a single product, delivering end-to-end value to customers. They maintain a continuous flow of software updates and are directly aligned with a specific business domain.

Key characteristics:
- Own the entire development lifecycle (design to deployment)
- Work independently to minimize dependencies
- Are the foundation — other team types are structured around them

### 2. Enabling Teams

Help stream-aligned teams adopt new technologies and best practices without taking over their work. They act as mentors and consultants, reducing knowledge gaps.

What they do:
- Provide training, coaching, and mentoring
- Give informed recommendations about tooling and frameworks
- Focus on addressing problems, not providing solutions
- Increase autonomy of stream-aligned teams

### 3. Complicated Subsystem Teams

Handle highly specialized and computationally complex areas that need deep expertise:
- Machine learning models
- Advanced algorithms
- Legacy system maintenance

Stream-aligned teams don't need to build complex functionalities outside their core responsibilities. This team reduces their cognitive load.

### 4. Platform Teams

Develop, build, maintain, and support internal tools, services, and infrastructure that help stream-aligned teams operate autonomously.

**Key insight**: While stream-aligned teams retain full autonomy of building and running applications, platform teams provide internal services to abstract underlying complexity.

This enhances developer productivity (DevEx) and ensures a cohesive experience across different products.

## Why You Need Platform Teams

One of the most significant hidden costs of cloud adoption is **cognitive load**. 

In the past, operations teams managed networking, databases, and security while developers focused on application code. Today, developers are expected to manage infrastructure, deployment pipelines, security, compliance, and observability — all while delivering new features.

This cognitive burden slows development and increases errors.

> "The real challenge isn't just about shifting left or making teams more autonomous — it's about providing the right guardrails so developers aren't overwhelmed by the sheer number of things they need to manage." — Manuel Pais

**Platform teams solve this by:**
- Offloading complexity
- Providing standardized solutions and "paved roads"
- Making best practices easy to adopt
- Building Internal Developer Platforms (IDPs) with self-service tools

Instead of every developer becoming a cloud architect, they rely on platform teams to abstract complexity.

## Best Practices for Structuring a Platform Team

### Designate a Platform Owner

A platform owner with product management skills helps:
- Define the platform's vision
- Understand user needs
- Prioritize development

### Treat the Platform as a Product

Most organizations treat platform engineering as a behind-the-scenes support function. A successful platform team adopts a **product mindset**:

- Prioritize developer needs
- Gather feedback continuously
- Iterate on solutions
- Apply user research, roadmaps, versioning, and usability testing

Build reusable, secure, and well-abstracted building blocks that simplify development while maintaining guardrails for security and compliance.

### Start Small: MVP and TVP

Don't try to build the perfect platform from scratch.

- **MVP (Minimum Viable Product)**: A minimal, well-focused version that delivers early value based on continuous feedback
- **TVP (Thinnest Viable Platform)**: Allocate resources properly throughout the platform lifecycle

### Focus on Developer Experience

A well-structured platform team optimizes for DevEx by:
- Providing self-service capabilities
- Offering standardized environments (test, staging, production)
- Reducing friction in the development process
- Using internal developer portals for unified logging, monitoring, and service discovery

### Foster Collaboration

Encourage communication and feedback between the platform team and its users. Communities of Practice (CoPs) are a great way to build this learning culture.

### Define Clear Metrics

Platform teams must track key performance metrics:

| Metric | What it measures |
|--------|------------------|
| Time to first deployment | Onboarding friction |
| Platform-related incidents | System uptime and resilience |
| Adoption rate | Team usage |
| Developer satisfaction | DevEx quality |

## TL;DR

Platform engineering isn't just about managing infrastructure — it's about helping developers build and ship software efficiently.

**Team topologies applied to platform teams:**
- ✅ Reduce cognitive load on developers
- ✅ Foster collaboration between teams
- ✅ Accelerate business outcomes
- ✅ Deliver high-impact internal tooling

Viewing platform engineering through team topologies provides a structured way to assess whether teams are set up for success and aligned with organizational goals.

## Resources

- [Team Topologies Book](https://teamtopologies.com/) by Matthew Skelton and Manuel Pais
- [Platform Teams Guide](https://mia-platform.eu/blog/platform-teams/) — Mia-Platform
- [Shift Down to the Platform](https://mia-platform.eu/blog/shift-down-to-the-platform/) — Cognitive load explained

---

