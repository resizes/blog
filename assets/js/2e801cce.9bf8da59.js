"use strict";(self.webpackChunkresizes=self.webpackChunkresizes||[]).push([[9450],{6029:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"dora-metrics","metadata":{"permalink":"/dora-metrics","editUrl":"https://github.com/resizes/blog/tree/main/blog/2024-01-10-dora-metrics/index.md","source":"@site/blog/2024-01-10-dora-metrics/index.md","title":"DORA Metrics","description":"\ud83d\udccc Elevate your team\'s performance with DORA Metrics! \ud83d\udcca","date":"2024-01-10T00:00:00.000Z","formattedDate":"January 10, 2024","tags":[{"label":"DevOps","permalink":"/tags/dev-ops"},{"label":"DORAMetrics","permalink":"/tags/dora-metrics"},{"label":"PerformanceOptimization","permalink":"/tags/performance-optimization"},{"label":"Automation","permalink":"/tags/automation"},{"label":"PerformanceEngineering","permalink":"/tags/performance-engineering"},{"label":"PlatformEngineering","permalink":"/tags/platform-engineering"}],"readingTime":0.305,"hasTruncateMarker":true,"authors":[{"name":"Rober Junquera","title":"Business Strategy & Product Manager","url":"https://github.com/roberjunquera","imageURL":"https://github.com/roberjunquera.png","key":"rober"},{"name":"Alejandro Albuerne","title":"Design & UX","url":"https://github.com/aalbuerne","imageURL":"https://github.com/aalbuerne.png","key":"alex"}],"frontMatter":{"slug":"dora-metrics","title":"DORA Metrics","authors":["rober","alex"],"tags":["DevOps","DORAMetrics","PerformanceOptimization","Automation","PerformanceEngineering","PlatformEngineering"]},"unlisted":false,"nextItem":{"title":"CI/CD with OIDC","permalink":"/cicd-oidc"}},"content":"\ud83d\udccc Elevate your team\'s performance with DORA Metrics! \ud83d\udcca \\n\\nUnlock insights into lead time, deployment frequency, mean time to recovery and change failure rate. Learn how to optimize your DevOps practices for success. \ud83d\udca1\\n\\n![Dora Metrics](./dora-1.png)\\n\\n\x3c!--truncate--\x3e\\n\\n![Lead Time For Changes](./dora-2.png)\\n\\n![Deployment Frequency](./dora-3.png)\\n\\n![Mean Time To Recovery](./dora-4.png)\\n\\n![Change Failure Rate](./dora-5.png)\\n\\n![Dora Metrics](./dora-6.png)\\n\\n\ud83d\ude80 DORA Metrics: The Key to DevOps Success \ud83d\ude80"},{"id":"cicd-oidc","metadata":{"permalink":"/cicd-oidc","editUrl":"https://github.com/resizes/blog/tree/main/blog/2024-01-03-cicd-oidc.mdx","source":"@site/blog/2024-01-03-cicd-oidc.mdx","title":"CI/CD with OIDC","description":"\ud83d\ude80 Leveraging OIDC for Enhanced Security and Efficiency Between GitHub Actions/GitLab CI and AWS \ud83d\udd12","date":"2024-01-03T00:00:00.000Z","formattedDate":"January 3, 2024","tags":[{"label":"CI/CD","permalink":"/tags/ci-cd"},{"label":"OIDC","permalink":"/tags/oidc"},{"label":"GitHub","permalink":"/tags/git-hub"},{"label":"GitLab","permalink":"/tags/git-lab"},{"label":"Terraform","permalink":"/tags/terraform"},{"label":"AWS","permalink":"/tags/aws"},{"label":"Security","permalink":"/tags/security"}],"readingTime":1.845,"hasTruncateMarker":false,"authors":[{"name":"Guille Vigil","title":"Platform Engineer","url":"https://guillermotti.com","imageURL":"https://github.com/guillermotti.png","key":"guille"}],"frontMatter":{"slug":"cicd-oidc","title":"CI/CD with OIDC","authors":["guille"],"tags":["CI/CD","OIDC","GitHub","GitLab","Terraform","AWS","Security"]},"unlisted":false,"prevItem":{"title":"DORA Metrics","permalink":"/dora-metrics"},"nextItem":{"title":"IDPs and Platform Engineering","permalink":"/idp-and-platform-engineering"}},"content":"\ud83d\ude80 Leveraging OIDC for Enhanced Security and Efficiency Between GitHub Actions/GitLab CI and AWS \ud83d\udd12\\n\\nIn the rapidly evolving landscape of DevOps and cloud computing, the integration of GitHub Actions or GitLab CI with AWS using OpenID Connect (OIDC) stands out as a game changer. Here\'s why embracing OIDC can significantly benefit your CI/CD pipelines:\\n\\n1. Enhanced Security: OIDC eliminates the need to store long-lived credentials like AWS access keys in your GitHub or GitLab repositories. This reduces the risk of credential leakage and enhances the overall security of your deployment processes.\\n\\n2. Seamless Identity Federation: OIDC allows AWS to trust GitHub Actions or GitLab CI to authenticate users, streamlining the identity verification process. This simplifies user management and ensures a more secure and efficient authentication mechanism.\\n\\n3. Automated Role Assumption: With OIDC, specific AWS roles can be assumed directly in GitHub Actions or GitLab CI pipelines. This facilitates granular permission control and ensures that only necessary permissions are granted for each task, enhancing both security and compliance, following the principle of least privilege.\\n\\n4. Scalability and Flexibility: OIDC enables a more scalable and flexible approach to managing cloud resources. As your project grows, it\'s easy to update and manage permissions without altering the underlying infrastructure.\\n\\n5. Cost-Effective: By leveraging OIDC, there\'s a reduction in the management overhead associated with credential rotation and management, potentially leading to cost savings and reduced operational complexity.\\n\\n\ud83d\udd17 Integrating OIDC with your CI/CD pipelines in GitHub Actions or GitLab CI not only fortifies your security posture but also streamlines your operational workflows. It\'s a win-win for teams looking to enhance their cloud capabilities in a secure and efficient manner.\\n\\n:::info References\\n\\n- [GitHub Actions OIDC Integration](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)\\n- [GitLab CI OIDC Integration](https://docs.gitlab.com/ee/ci/cloud_services/aws)\\n\\n:::\\n\\nNote that other cloud providers like Azure or GCP have also OIDC integrations with GitHub Actions or GitLab CI. And other CI/CD tools like Azure DevOps may have OIDC integrations with cloud providers. Find your best combination!\\n\\nIf you are using GitHub Actions and AWS, you can use our open sourced Terraform module to create IAM related resources and handle permissions for different branches or tags:\\n\\nhttps://github.com/resizes/platform-terraform-module-github-oidc-aws-role\\n\\n```js\\n<button onClick={() => alert(\'button clicked!\')}>Click me!</button>\\n```\\n\\n<button onClick={() => alert(\'button clicked!\')}>Click me!</button>"},{"id":"idp-and-platform-engineering","metadata":{"permalink":"/idp-and-platform-engineering","editUrl":"https://github.com/resizes/blog/tree/main/blog/2023-12-26-idp-and-platform-engineering.md","source":"@site/blog/2023-12-26-idp-and-platform-engineering.md","title":"IDPs and Platform Engineering","description":"\ud83d\ude80 Embracing Innovation in Tech: The Power of Platform Engineering and Internal Developer Platforms (IDPs) \ud83c\udf1f","date":"2023-12-26T00:00:00.000Z","formattedDate":"December 26, 2023","tags":[{"label":"PlatformEngineering","permalink":"/tags/platform-engineering"},{"label":"InternalDeveloperPlatforms","permalink":"/tags/internal-developer-platforms"},{"label":"TechInnovation","permalink":"/tags/tech-innovation"},{"label":"SoftwareDevelopment","permalink":"/tags/software-development"},{"label":"DigitalTransformation","permalink":"/tags/digital-transformation"},{"label":"DevOps","permalink":"/tags/dev-ops"}],"readingTime":1.61,"hasTruncateMarker":true,"authors":[{"name":"Rober Junquera","title":"Business Strategy & Product Manager","url":"https://github.com/roberjunquera","imageURL":"https://github.com/roberjunquera.png","key":"rober"}],"frontMatter":{"slug":"idp-and-platform-engineering","title":"IDPs and Platform Engineering","authors":"rober","tags":["PlatformEngineering","InternalDeveloperPlatforms","TechInnovation","SoftwareDevelopment","DigitalTransformation","DevOps"]},"unlisted":false,"prevItem":{"title":"CI/CD with OIDC","permalink":"/cicd-oidc"},"nextItem":{"title":"Resizes Mission","permalink":"/resizes-mission"}},"content":"\ud83d\ude80 Embracing Innovation in Tech: The Power of Platform Engineering and Internal Developer Platforms (IDPs) \ud83c\udf1f\\n\\nIn the rapidly evolving landscape of technology, two game-changers have emerged as key players: Platform Engineering and Internal Developer Platforms (IDPs). These innovative approaches are reshaping how we build, deploy, and manage software. Let\'s dive into their transformative benefits:\\n\\n- Streamlined Development Process: IDPs provide a unified platform for development teams, significantly reducing the complexity involved in software creation. This streamlined approach accelerates development cycles, enabling quicker deployment and faster time-to-market.\\n\\n\x3c!--truncate--\x3e\\n\\n- Enhanced Collaboration: Platform Engineering fosters a collaborative environment where developers, operations teams, and other stakeholders can work seamlessly together. This synergy not only boosts productivity but also enhances the quality of the end product.\\n\\n- Scalability and Flexibility: With the scalability offered by Platform Engineering, businesses can effortlessly adapt to changing demands. IDPs complement this by offering flexible tools that cater to various development needs, ensuring that scalability does not compromise performance.\\n\\n- Consistency and Standardization: IDPs establish standardized processes and toolsets across projects, leading to consistency in development practices. This uniformity is crucial for maintaining quality and reliability in software products.\\n\\n- Empowering Developers: By abstracting away the complexities of infrastructure management, IDPs allow developers to focus on what they do best \u2013 coding. This empowerment leads to higher job satisfaction and increased innovation.\\n\\n- Cost-Effective Solutions: Platform Engineering can lead to significant cost savings by optimizing resource utilization and reducing the overhead associated with managing disparate systems and tools.\\n\\n- Enhanced Security and Compliance: With a centralized platform, enforcing security protocols and compliance standards becomes more manageable, ensuring that all development activities adhere to the highest security norms.\\n\\n\ud83c\udf10 Looking Ahead: As we embrace these technologies, the potential for innovation is boundless. Platform Engineering and IDPs are not just tools; they represent a paradigm shift in how we approach software development, promising a future of efficiency, collaboration, and excellence in technology."},{"id":"resizes-mission","metadata":{"permalink":"/resizes-mission","editUrl":"https://github.com/resizes/blog/tree/main/blog/2023-12-19-resizes-mission.md","source":"@site/blog/2023-12-19-resizes-mission.md","title":"Resizes Mission","description":"\ud83d\ude80 Embracing DevOps and Platform Engineering for Modern Businesses \ud83d\ude80","date":"2023-12-19T00:00:00.000Z","formattedDate":"December 19, 2023","tags":[{"label":"DevOps","permalink":"/tags/dev-ops"},{"label":"PlatformEngineering","permalink":"/tags/platform-engineering"},{"label":"CloudNative","permalink":"/tags/cloud-native"},{"label":"DeveloperExperience","permalink":"/tags/developer-experience"},{"label":"Innovation","permalink":"/tags/innovation"}],"readingTime":1.37,"hasTruncateMarker":true,"authors":[{"name":"Ramiro \xc1lvarez","title":"Platform Engineer","url":"https://ramiroalvfer.com","imageURL":"https://github.com/kaskol10.png","key":"ramiro"}],"frontMatter":{"slug":"resizes-mission","title":"Resizes Mission","authors":"ramiro","tags":["DevOps","PlatformEngineering","CloudNative","DeveloperExperience","Innovation"]},"unlisted":false,"prevItem":{"title":"IDPs and Platform Engineering","permalink":"/idp-and-platform-engineering"}},"content":"\ud83d\ude80 Embracing DevOps and Platform Engineering for Modern Businesses \ud83d\ude80\\n\\nIn the ever-evolving tech landscape, DevOps is more alive than ever. At Resizes, we\'re harnessing the power of DevOps methodologies and best practices to revolutionize Internal Developer Platforms (IDPs) and implement Platform Engineering across companies of all sizes.\\n\\n\x3c!--truncate--\x3e\\n\\n\ud83d\udd11 Our goal? To fulfill the original DevOps promise: \u201cyou build it, you run it\u201d.\\n\\n\ud83d\udca1 Enhancing Developer Experience with Cloud Native Tech: With the latest in Cloud Native technologies, we\'re here to dramatically improve your Developer Experience (DevEx). Our approach ensures that your development teams are not bogged down by repetitive tasks, fostering high performance and reducing dependency on Ops teams.\\n\\n\ud83c\udf1f The Secret to High-Performing Teams? Teams that excel have one thing in common: they\'ve built an Internal Developer Platform that\'s pivotal to their DevOps success. These platforms not only boost developer experience and productivity but also utilize a blend of open-source and proprietary tools, treating the platform as a critical product.\\n\\n\ud83d\udee0\ufe0f Build or Be Built: Remember, if you don\'t proactively build your platform, it will inevitably build itself. The real question is whether you standardize this process or leave it to chance.\\n\\n\ud83d\udcca DORA Metrics in Focus: We\'re keeping a keen eye on key DORA metrics like deployment frequency, change lead time, change failure rate, and MTTR (service production restoration time) to ensure peak performance.\\n\\n\ud83d\udce6 Containerization: The Scale Game-Changer: In our journey, containerization has emerged as the essential element for scaling apps efficiently.\\n\\nJoin us at Resizes in shaping the future of DevOps and Platform Engineering. Let\'s create systems that not only work but excel in the modern digital era."}]}')}}]);