# Capital Solar Energy

Premium conversion-focused website for Capital Solar Energy — Canberra's trusted solar installer.

## Tech Stack

**Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP, Shadcn UI  
**Backend:** Node.js, Express.js, MongoDB  
**Deployment:** Vercel (frontend) · VPS/AWS (backend)

## Project Structure

```
clientsite/
├── frontend/          # Next.js application
└── backend/           # Express API for quote submissions
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

API runs on [http://localhost:5000](http://localhost:5000)

Requires MongoDB running locally or a MongoDB Atlas connection string.

## Features

- Premium agency-grade UI with custom animations
- Multi-step quote form with file upload
- SEO: JSON-LD schema, sitemap, robots, location pages
- Sticky glass header, parallax hero, GSAP process timeline
- Interactive technology showcase with product tabs
- Location-based SEO pages for Canberra keywords

## Deployment

### Frontend (Vercel)

1. Connect repository to Vercel
2. Set root directory to `frontend`
3. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-api-domain.com`

### Backend (VPS/AWS)

1. Deploy backend folder to your server
2. Set environment variables from `.env.example`
3. Run with PM2: `pm2 start src/index.js --name capital-solar-api`
4. Configure reverse proxy (nginx) for HTTPS

## SEO Pages

- `/locations/solar-canberra`
- `/locations/solar-installation-canberra`
- `/locations/battery-storage-canberra`
- `/locations/heat-pump-canberra`
- `/locations/solar-panels-act`
