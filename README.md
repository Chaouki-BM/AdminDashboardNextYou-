# NextYou Admin Dashboard

A React + Vite admin dashboard for managing users, exercises, reports, and analytics.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Recharts
- Lucide React

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file in the project root:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_URL=http://localhost:5173
```

3. Start the development server:

```bash
npm run dev
```

The app runs on the URL printed by Vite (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Backend API

The frontend expects a backend running at `VITE_API_URL` and uses:

- `POST /api/admin/login`
- `GET /api/admin/stats`
- `GET /api/admin/users`
- `GET /api/admin/charts/registrations`
- `GET /api/admin/charts/countries`
- `GET /api/admin/charts/top-exercises`
- `GET /api/admin/reports`
- `GET /api/exercises`

## Authentication

- On successful login, the admin token is stored in `localStorage` as `adminToken`.
- Protected requests send `Authorization: Bearer <token>`.
