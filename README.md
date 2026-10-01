# Blog Platform

A modern publishing app for creating blog posts, collecting feedback, and managing content with a clean admin workflow.

## What this app includes

- Post creation and publishing flow
- Comment and report handling endpoints
- Cloudinary-ready media uploads
- Next.js frontend with a polished landing page
- Prisma integration for database access

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Configure your environment variables for Prisma/PostgreSQL.

3. Run the database setup if needed:

```bash
npx prisma generate
```

4. Start the app:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Useful commands

```bash
npm run build
npm run lint
```

## Project notes

This repository is designed for a small content platform where writers can publish posts, reviewers can manage reports, and the app can be extended with richer moderation and content workflows.
