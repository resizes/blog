---
slug: resizes-blog
title: Resizes Blog
authors: alex
tags: [PlatformEngineering, Blog, Documentation, DevOps]
---

# How to create and publish the best blog ever! 🔝

From Resizes, we are committed to creating the best blog for our users. That's why we were looking for a platform that would allow us to create a blog with a modern design, easy to use, and with the best performance.

We have chosen Docusaurus, a modern static website generator. It is optimized for technical documentation and has great capabilities for creating blogs. It is built using React and Markdown, which makes it easy to use and customize. We think is a robust way to manage and publish content, leveraging modern development tools and practices.

<!--truncate-->

## Step 1: Setting Up Your Docusaurus Blog

### Initialize Your Docusaurus Project

1. **Install Node.js**: Ensure you have Node.js installed on your system.
2. **Create a New Docusaurus Site**: Run the following command in your terminal:

```bash
npx create-docusaurus@latest blog classic
```

3. **Navigate to Your Project Directory**:

```bash
cd blog
```

4. **Start Your Development Server**: Run `npx docusaurus start`. This command starts a local development server and opens up a browser window.

You have now a Docusaurus site running on your local machine. 

:::note
You can find more information about Docusaurus in the [official documentation](https://docusaurus.io/docs).
:::

### Customize Your Blog

- Edit `docusaurus.config.js` to customize your site's layout, theme, and functionalities.
- Add blog posts by creating markdown files in the `/blog` directory.

## Step 2: Deploying Your Blog with GitHub Actions

### Set Up GitHub Actions

1. In your GitHub repository, navigate to the **Actions** tab and create a new workflow.
2. Use the following template for your `.github/workflows/deployment.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci
      - name: Build website
        run: npm run build
      
      - name: Set build folder as artifact
        uses: actions/upload-pages-artifact@v3
        with:
          name: github-pages
          path: ./build
      
      - uses: actions/deploy-pages@v4
```

3. This workflow automatically builds and deploys your site to GitHub Pages whenever you push to the main branch.

## Step 3: Configuring a Custom Domain with Amazon Route 53

### Register Your Domain

1. Go to the Amazon Route 53 console and register a new domain if you don't already have one.

### Configure DNS Settings

1. After your domain is registered, navigate to the **Hosted zones** in Route 53.
2. Create a new record set for your domain:
    - **Name**: Your domain name
    - **Type**: A - IPv4 address
    - **Alias**: Yes
    - **Alias Target**: Your GitHub Pages URL
3. Add a CNAME record if you are using a subdomain instead:
    - **Name**: blog
    - **Type**: CNAME
    - **Value**: Your GitHub Pages URL, e.g. `yourusername.github.io`

### Update Your Docusaurus Configuration

1. In your `docusaurus.config.js`, update the `url` and `baseUrl` fields with your custom domain.

## Step 4: Enjoy Your New Blog!

You can now start customizing your blog. Adding blog posts, customizing the theme, and creating a great user experience for your readers. We hope you enjoy your new blog and find it useful for your projects.

## Step 5: Share Your Blog with the World

We are very proud to write the meta blog post and share it inside our blog. Welcome to the Resizes Blog! 🚀

If you find any issue or you want to contribute to our blog or even if you would like to copy our blog, feel free to do it! We are happy to share our knowledge with the community. 

Don't be shy and open a pull request in our [GitHub repository](https://github.com/resizes/blog)! 📝

Here, we will share our thoughts, ideas, and experiences on a variety of topics, including platform engineering, DevOps, Cloud Native trends, tips and tricks about different technologies and tools and many more!

Stay tuned for more content and updates. We hope you enjoy reading our blog as much as we enjoy writing it. 📚

