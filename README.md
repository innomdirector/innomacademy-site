# INNO M Academy

Official website for INNO M Academy.

This repository contains:
- a React + Vite frontend
- an Express + MongoDB backend

## Project Structure

```text
innom-full-project/
├── frontend/   # React, Vite, Tailwind, blog prerendering
└── backend/    # Express API, MongoDB, registrations, course catalog
```

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Vitest

### Backend
- Node.js
- Express
- MongoDB / Mongoose
- dotenv
- CORS

## Features

- Marketing website for INNO M Academy
- Course catalog
- Registration form
- Blog pages
- SEO metadata and sitemap support
- Prerendered blog pages for improved indexing

## Local Development

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd innom-full-project
```

### 2. Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file inside `backend/`.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
FRONTEND_URL=https://innomacademy.ge
```

If you add frontend environment variables later, place them inside `frontend/.env` and use the `VITE_` prefix.

## Run Locally

### Start backend

```bash
cd backend
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

Frontend usually runs on:

```text
http://localhost:5173
```

Backend usually runs on:

```text
http://localhost:5000
```

## Frontend Scripts

From `frontend/`:

```bash
npm run dev
npm run build
npm run build:client
npm run prerender:blog
npm run lint
npm run preview
npm run test
```

## Backend Scripts

From `backend/`:

```bash
npm run dev
npm run seed:courses
```

## Production Build

Frontend production build:

```bash
cd frontend
npm run build
```

This command:
- builds the client
- prerenders blog pages into `frontend/dist`

## Deployment Notes

This project is deployed with:
- frontend static files served by Nginx
- backend running on Node.js with PM2
- domain and SSL configured on AWS / EC2

Typical frontend deployment flow:

1. Build the frontend locally
2. Upload the contents of `frontend/dist/` to the server
3. Fix file permissions
4. Reload Nginx

Typical backend deployment flow:

1. Pull latest changes
2. Install dependencies if needed
3. Verify `.env`
4. Restart PM2 process

## SEO Notes

The project includes:
- `robots.txt`
- `sitemap.xml`
- canonical tags
- Open Graph / Twitter metadata
- prerendered blog pages

If you update blog URLs, sitemap data, or blog slugs, rebuild the frontend before deploying.

## Testing

Frontend tests use Vitest.

Run:

```bash
cd frontend
npm run test
```

## Important Notes

- Do not commit real secrets to GitHub
- Keep production `.env` values only on the server
- If you update static assets, rebuild the frontend before deployment
- If static files return `403` after deployment, re-apply ownership and permission fixes on the server

## License

This project is private and maintained for INNO M Academy.
