---
slug: success-story-sotysolar
title: Success Story - Software Enhancement in a Green Energy Solutions Company
authors: ramiro
tags: [Success Story, Software Enhancement, Kubernetes Adoption, Cloud FinOps, DevOps, Internal Developer Platform, AWS, Spain, Portugal, Europe, Green Energy, Solar]
image: img/2025-06-27-sotysolar-success-story/thumbnail.jpg
---

[Energy Part S.L](https://sotysolar.es) leads the solar panel installation sector in Europe with their innovative green solutions. The company modernized their technology stack through an Internal Developer Platform developed in collaboration with [Resizes Platform](https://resiz.es). This strategic partnership delivered significant improvements across multiple dimensions:

## **Key Results at a Glance**
- **🚀 2+ Hours Saved** per deployment cycle (75% reduction)
- **💰 30% Cost Reduction** in infrastructure spending
- **⚡ 60% Faster Build Times** with optimized containerization
- **🔄 99.9% Uptime** achieved with self-healing infrastructure
- **🌱 40% Reduction** in carbon footprint through efficient resource usage
- **📈 3x Increase** in deployment frequency

> *"The partnership with [Resizes Platform](https://resiz.es) transformed our development velocity and operational efficiency. We can now deploy with confidence and scale seamlessly to support our growing solar installation business across Spain and Portugal."* 
> 
> **— Eusebio, CTO, [Energy Part S.L](https://sotysolar.es)**

# The Challenge
With over 12,000 solar panels installed across Spain and Portugal, [SotySolar](https://sotysolar.es) was ready to scale their operations while maintaining their commitment to sustainability. Their existing infrastructure, based on traditional virtual machines and manual processes, was becoming a bottleneck for growth.

The company needed a solution that would enable them to:

- Scale their services efficiently without proportional cost increases
- Reduce deployment downtime and improve delivery speed
- Maintain their environmental commitments through optimized resource usage
- Implement modern software development practices

# The Solution: A Comprehensive Platform Transformation

## **Implementation Timeline**
- **Phase 1 (Months 1-2)**: Infrastructure assessment and migration planning
- **Phase 2 (Months 3-4)**: AWS migration and Kubernetes adoption
- **Phase 3 (Months 5-6)**: CI/CD optimization and security hardening
- **Phase 4 (Months 7-9)**: Performance tuning and monitoring implementation

## Cloud Infrastructure Migration: A Strategic Journey
When [SotySolar](https://sotysolar.es) first approached [Resizes Platform](https://resiz.es), their infrastructure was running on DigitalOcean – a choice that had served them well during their initial growth phase. However, as their solar panel installations scaled beyond 12,000 units across Spain and Portugal, they recognized the need for a more robust infrastructure solution.

The migration to Amazon Web Services represented a strategic upgrade rather than a rescue operation. AWS offered the enterprise-grade managed services ecosystem that [SotySolar](https://sotysolar.es) needed to support their ambitious expansion plans while maintaining their core commitment to environmental sustainability.

### **Technical Architecture**
- **Container Orchestration**: Amazon EKS (Kubernetes 1.28)
- **Database Layer**: AWS Aurora PostgreSQL (v15) + MongoDB 7.x (3-replica cluster)
- **Caching**: ElastiCache Redis 7.x
- **Storage**: S3 with cross-region replication
- **Security**: AWS Secrets Manager + IAM roles
- **Monitoring**: CloudWatch + Prometheus + Grafana

The migration strategy focused on leveraging AWS's comprehensive portfolio of managed services. Instead of maintaining their own database servers, [SotySolar](https://sotysolar.es) could rely on AWS Aurora and RDS for their relational data needs, while ElastiCache would handle their Redis requirements. The Amazon EKS service would orchestrate their containerized applications, and AWS Secrets Manager would secure their sensitive configuration data.

AWS's commitment to sustainability aligned perfectly with [SotySolar](https://sotysolar.es)'s mission. With AWS's pledge to match 100% of their energy usage with renewable sources by 2025 and achieve carbon neutrality by 2040, the migration represented a strategic alignment with partners who shared their environmental values.

The transformation from virtual machines to Kubernetes represented a significant operational improvement. Kubernetes enabled [SotySolar](https://sotysolar.es) to define their entire application infrastructure as code, using declarative configurations that could be version-controlled, peer-reviewed, and automatically deployed. This shift meant that their development, staging, and production environments could be guaranteed to be identical, eliminating environment inconsistencies.

The container orchestration capabilities of Kubernetes also unlocked new levels of resource efficiency. Where virtual machines had required dedicated resources regardless of actual usage, containers could be packed more efficiently onto the same hardware, with Kubernetes automatically managing the scheduling and resource allocation.

## Modern Development Practices: From Manual to Automated
The transformation of [SotySolar](https://sotysolar.es)'s development practices began with the introduction of GitOps methodology. For the first time, every aspect of their infrastructure could be described in code, stored in Git repositories, and treated with the same rigor as their application code. This meant that infrastructure changes could be proposed through pull requests, reviewed by the team, and automatically deployed once approved.

ArgoCD became the conductor of this new orchestrated approach, continuously monitoring Git repositories and ensuring that the running infrastructure matched exactly what was defined in code. When developers pushed changes to their repositories, they could watch as ArgoCD automatically synchronized these changes across their environments.

The database modernization journey involved careful strategic planning. [SotySolar](https://sotysolar.es)'s existing MongoDB installation, running on version 5.x, was approaching end-of-life support [October 2024]. [Resizes Platform](https://resiz.es) crafted an incremental upgrade strategy that would minimize risk while maximizing the benefits of newer database features. The journey to MongoDB 7.x unlocked advanced indexing capabilities, improved query performance, and enhanced security features.

The migration to AWS Aurora, RDS and ElastiCache represented [SotySolar](https://sotysolar.es)'s graduation to enterprise-grade data management. Instead of managing database servers, applying security patches, and configuring backup systems, the team could now rely on AWS's managed services to handle these operational concerns automatically.

Each database in the new architecture was designed with high availability from the ground up. The 3-replica MongoDB configuration meant that even if an entire AWS zone failed, [SotySolar](https://sotysolar.es)'s applications would continue operating without interruption.

## Performance Optimizations: The Quest for Speed and Efficiency
The performance optimization journey began with addressing build time inefficiencies. An 8-minute container build process was disrupting the natural flow of development and creating delays in the feedback loop that drives productive software development.

The solution required a fundamental rethinking of how [SotySolar](https://sotysolar.es)'s applications were packaged and deployed. [Resizes Platform](https://resiz.es) implemented multi-stage Docker builds that transformed the wasteful process into an elegant, efficient pipeline. The first stage would handle all the heavy lifting – downloading dependencies, compiling code, and preparing assets. The second stage would take only the essential runtime artifacts and create a lean, optimized image. This approach reduced the final image size by 60% while dramatically improving build times through intelligent layer caching strategies.

The creation of custom base images marked another breakthrough in the optimization journey. Instead of starting from generic operating system images and installing the same packages repeatedly, [SotySolar](https://sotysolar.es) could now begin with purpose-built base images that already contained their specific PHP runtime, extensions, and optimizations.

The migration to ARM64 architecture represented a strategic alignment with modern computing trends. By rebuilding their applications to run natively on ARM64, they eliminated translation overhead and achieved better performance while reducing resource consumption.

The implementation of self-hosted runners on Kubernetes transformed the CI/CD infrastructure. Custom Docker images pre-loaded with all necessary tools meant that jobs could begin executing immediately, eliminating the setup overhead that had been consuming precious development time. The Kubernetes-based deployment enabled automatic scaling based on the depth of the job queue.

Database performance optimization involved upgrading from MongoDB 5.x to 7.x, which unlocked advanced indexing strategies and query optimization features. The implementation of connection pooling addressed performance bottlenecks by optimizing connection reuse while ensuring efficient database server resource utilization.

The 3-replica architecture provided high availability and enabled read scaling that could dramatically improve application performance for read-heavy workloads.

# Technical Enhancements and Security: Building a Fortress of Trust
The security transformation of [SotySolar](https://sotysolar.es)'s infrastructure began with the migration to AWS Secrets Manager. Every hardcoded credential was carefully extracted from the codebase and moved to the centralized secrets management system. This process ensured that sensitive data was safely stored and automatically injected at runtime, with automated rotation capabilities providing additional security.

The network security architecture implemented defense in depth, where each layer provided protection against different types of threats. The migration to private subnets meant that [SotySolar](https://sotysolar.es)'s most critical components – their databases and application servers – became invisible to the outside world, accessible only through carefully controlled pathways.

The implementation of security groups as programmable firewalls allowed [SotySolar](https://sotysolar.es) to define their security policies as code, version-controlled and peer-reviewed just like their application code. This approach eliminated the common problem of security configurations drifting over time or being inconsistently applied across environments.

## Message Processing and Reliability: Never Losing a Beat
The transformation of [SotySolar](https://sotysolar.es)'s message processing system involved implementing Dead Letter Queues (DLQs) to create a robust, resilient message processing architecture. Now, when messages couldn't be processed successfully, they weren't lost – they were carefully preserved in the DLQ for investigation and reprocessing.

The AWS SQS migration brought enterprise-grade message durability to [SotySolar](https://sotysolar.es)'s operations. Messages were now automatically replicated across multiple data centers, with guaranteed delivery semantics that eliminated the possibility of message loss due to hardware failures. The configurable retry logic with exponential backoff meant that temporary system issues wouldn't result in message loss.

## Data Storage: Building Digital Vaults
The S3 bucket architecture represented [SotySolar](https://sotysolar.es)'s evolution from simple file storage to enterprise-grade data management. The new S3 architecture was designed like a digital vault system, with different security zones for different types of data. Public-facing content like marketing materials and product images were stored in buckets with appropriate public access policies, while sensitive customer data and business documents were secured in private buckets with strict access controls and encryption requirements.

The implementation of bucket policies as Infrastructure as Code meant that security configurations were no longer ad-hoc decisions made during crisis situations. Every access rule was documented, reviewed, and consistently applied across all environments. The cross-region replication strategy ensured that even if an entire AWS region failed, [SotySolar](https://sotysolar.es)'s critical data would remain accessible from backup locations.

## Observability: Eyes and Ears of the System
The comprehensive monitoring stack implemented by [Resizes Platform](https://resiz.es) provided real-time visibility into how [SotySolar](https://sotysolar.es)'s applications were performing, automatically detecting slow queries, memory leaks, and error spikes before they could impact customer experience.

The distributed tracing capabilities transformed the debugging experience. When issues occurred, the team could now trace individual requests through their entire system architecture, seeing exactly where delays occurred or errors originated.

The intelligent alerting system learned [SotySolar](https://sotysolar.es)'s normal operational patterns and could distinguish between genuine problems requiring immediate attention and normal operational variations that didn't warrant immediate escalation.

## Quality Assurance: Building Confidence
The testing strategy transformation represented [SotySolar](https://sotysolar.es)'s graduation to confidence-based releases. The comprehensive automated testing suite meant that potential issues could be caught and resolved during development, long before they could impact customers.

The implementation of chaos engineering took this confidence to the next level. By deliberately introducing controlled failures into their systems, [SotySolar](https://sotysolar.es) could verify that their disaster recovery procedures actually worked and that their applications could gracefully handle the unexpected failures that inevitably occur in production environments.

# Business Impact and Results

## **Competitive Advantage Achieved**
- **Market Leadership**: First solar company in Spain with enterprise-grade cloud infrastructure
- **Innovation Speed**: 3x faster feature delivery compared to industry average
- **Operational Excellence**: 99.9% uptime during peak solar installation season
- **Cost Leadership**: 30% lower infrastructure costs than competitors

## Operational Efficiency

- **Faster Deployments**: 2+ hour reduction in deployment cycles enables more frequent releases and faster time-to-market
- **Improved Reliability**: Self-healing Kubernetes infrastructure minimizes downtime and manual intervention
- **Enhanced Scalability**: Autoscaling capabilities automatically adjust resources based on demand

## Financial Benefits

- **Cost Optimization**: FinOps practices provide visibility and control over cloud spending
- **Resource Efficiency**: Automated provisioning ensures optimal resource utilization
- **Predictable Scaling**: Infrastructure adapts to needs without over-provisioning

## Environmental Impact

- **Reduced Carbon Footprint**: AWS's renewable energy commitment and efficient resource usage align with [SotySolar](https://sotysolar.es)'s sustainability goals
- **Optimized Resource Consumption**: Kubernetes autoscaling provisions only necessary resources, minimizing waste
- **Green Technology Leadership**: Modern infrastructure supports [SotySolar](https://sotysolar.es)'s position as an environmental technology leader

# Looking Forward
This collaboration between [Energy Part S.L](https://sotysolar.es) and [Resizes Platform](https://resiz.es) demonstrates how modern cloud-native technologies can drive both business efficiency and environmental responsibility. The Internal Developer Platform provides [SotySolar](https://sotysolar.es) with a robust foundation for continued growth while maintaining their commitment to sustainable practices.

The success of this partnership showcases the power of combining technical expertise with aligned values – proving that efficient technology solutions and environmental stewardship can work hand in hand.

---

## **Ready to Transform Your Infrastructure?**

**🚀 Reduce deployment times by 2+ hours and achieve 99.9% uptime**  
**💰 Cut infrastructure costs by 30% while improving performance**  
**🌱 Align your technology with your sustainability goals**

[Contact Resizes Platform](https://resiz.es) to learn how we can help your organization achieve similar results.

**📞 [Schedule a Technical Consultation](https://calendar.app.google/AYCwMMtZH58pyZPn7)** | **💬 [Join Our Discord Community](https://discord.gg/HjvRtMvT)**
>