# B14-A8 | StudioSpace
### Find Your Space. Create Your Story.
**Brand:** STUDIOSPACE  
**Repository:** `b14-a8-shoot-location-client`  
**Live Application URL:** https://studiospace.vercel.app  
**Backend API URL:** https://studiospace-server.onrender.com  

---

## 1. Project Overview
**StudioSpace** is a peer-to-peer creative studio and production space rental marketplace engineered specifically for photographers, cinematographers, content creators, podcasters, sound engineers, and creative production crews.

Unlike generic booking platforms or hotel reservation clones, StudioSpace centers entirely around creative-industry workflows: hourly workspace reservations, transparent security deposit accounting, verified studio equipment checklists, soundproofing ratings (NC ratings), camlock 3-phase power drop specifications, corner cycloramas, and conflict-free reservation scheduling.

---

## 2. Key Features

1. **Editorial Minimal Luxury Aesthetic & Full Theme Engine:**
   - Photography-first editorial layout with clean white primary surfaces, warm-gray secondary backgrounds (`#F7F7F5`), rich noir accents, and warm bronze highlights (`#B58A5A`).
   - Seamless, flicker-free Light and Dark mode toggle powered by `next-themes`, persisted across browser sessions with zero hydration shift.

2. **Hourly Studio Reservation Engine with Conflict Prevention:**
   - Tailored hourly rental interaction: Creators select their call date, start time (load-in), and wrap time.
   - The client calculates real-time duration, rental cost, and refundable security deposits; the server independently re-verifies all monetary math and prevents double-booking overlaps against confirmed reservations down to the minute.

3. **Multi-Category Studio Discovery & Real-Time Filtering:**
   - Discover spaces across five disciplines: **Photo Studios**, **Sound Stages**, **Podcast Lounges**, **Music Suites**, and **Creative Workshops**.
   - Search by title or equipment, filter by location or price bracket, and sort by ratings or newest additions with automatic URL query parameter synchronization.

4. **Robust JWT & Better Auth Session Security via HTTPOnly Cookies:**
   - Secure authentication supporting email/password registration with strict inline password criteria (minimum 6 characters, at least one uppercase, at least one lowercase) and Google OAuth synchronization.
   - Mutation endpoints (`POST /api/studios`, `DELETE /api/studios/:id`, `POST /api/bookings`, `PATCH /api/bookings/:id/*`) are strictly guarded by server-side JWT verification in HTTPOnly cookies, returning HTTP 401 on unauthorized access.

5. **Dual-Perspective Operations Dashboard & PDF Invoice Generation:**
   - **Creator View:** Track upcoming shoot calls, pending reservation requests, and wishlisted favorite workspaces.
   - **Host View:** Manage published listings, review incoming booking requests, and transition reservation states (`Pending` → `Confirmed` → `Completed` or `Cancelled`).
   - Download official, professional **PDF Booking Invoices** for confirmed sessions generated on-the-fly with `jspdf`.

---

## 3. Technology Stack

### Frontend
- **Framework:** Next.js 15 (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS, tailwindcss-animate
- **UI Components:** Custom Minimal Luxury design system inspired by shadcn/ui
- **Forms & Validation:** React Hook Form + Zod
- **Slider:** Swiper.js (Autoplay, Fade, Pagination, Navigation)
- **Icons:** Lucide React
- **Notifications:** Sonner Toast Notifications
- **Theming:** next-themes
- **PDF Generation:** jsPDF

### Backend Integration
- **API Architecture:** RESTful JSON API
- **Runtime:** Express.js + Node.js (TypeScript)
- **Database:** MongoDB Atlas
- **Auth & Session:** Better Auth + JWT HTTPOnly cookies

---

## 4. Environment Variables

Create a `.env.local` file in the root of `b14-a8-shoot-location-client`:

```env
# Backend API Base URL
# Local: http://localhost:5000
# Production: https://studiospace-server.onrender.com (or leave empty "" to route through Next.js BFF proxy)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Backend proxy destination used by next.config.mjs rewrites for same-site cookie forwarding
BACKEND_API_URL=http://localhost:5000

# Client Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional ImgBB API Key for direct cloud photo uploads (free at https://api.imgbb.com/)
NEXT_PUBLIC_IMGBB_API_KEY=
```

---

## 5. Local Setup & Installation

### Prerequisites
- Node.js v18+ (tested on Node v24)
- npm v9+

### Quick Start
```bash
# 1. Clone repository
git clone https://github.com/your-username/b14-a8-shoot-location-client.git
cd b14-a8-shoot-location-client

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.local.example .env.local

# 4. Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Examiner Test Account

For examiner review, the database includes a verified host and creator account:

- **Email:** `examiner@studiospace.com`
- **Password:** `ExaminerPassword123!`
- **Capabilities:**
  - Pre-seeded owner of active creative studio listings.
  - Can accept or decline incoming booking inquiries on the Dashboard.
  - Can create, edit, and delete personal studio listings.
  - Quick **"Auto-fill"** button available directly on the `/login` screen for 1-click credential filling.

---

## 7. Deployment Instructions

### Deploy to Vercel (Frontend)
1. Push `b14-a8-shoot-location-client` to GitHub.
2. Import project into Vercel Dashboard.
3. Configure Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your live backend URL (e.g. `https://studiospace-server.onrender.com` or empty `""` for BFF proxy).
   - `BACKEND_API_URL`: `https://studiospace-server.onrender.com` (powers Next.js `/api/:path*` reverse-proxy rewrite).
   - `NEXT_PUBLIC_APP_URL`: Your Vercel frontend domain (e.g. `https://<your-project>.vercel.app`).
   - `NEXT_PUBLIC_IMGBB_API_KEY`: (Optional) Free API key from https://api.imgbb.com/ for direct photo uploads.
4. Deploy with Framework Preset: `Next.js`.

### Deploy to Render (Backend)
1. Import `b14-a8-shoot-location-server` repository into Render as a Web Service.
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Set environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGODB_URI`: Your MongoDB Atlas cluster connection string (`mongodb+srv://...`).
   - `MONGODB_DB_NAME`: `studiospace`
   - `BETTER_AUTH_SECRET`: Secure 32-character key.
   - `JWT_SECRET`: Secure 32-character key.
   - `BETTER_AUTH_URL`: Your Render backend URL (`https://<your-service>.onrender.com`).
   - `FRONTEND_URL`: Your Vercel production domain (`https://<your-app>.vercel.app`).
   - `GOOGLE_CLIENT_ID`: (Optional) Google OAuth Client ID from Google Cloud Console.
   - `GOOGLE_CLIENT_SECRET`: (Optional) Google OAuth Client Secret from Google Cloud Console.

---

## 8. Git Commit History
This repository maintains a comprehensive, logical commit trajectory with **20+ meaningful commits**, documenting the progression from architectural setup, design tokens, responsive components, booking modal, auth integration, to final production polish.
