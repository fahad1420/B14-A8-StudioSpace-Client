# B14-A8 | StudioSpace
### Find Your Space. Create Your Story.

**Brand:** STUDIOSPACE  
**Live Frontend Application:** https://thestudiospace.vercel.app  
**Live Backend API Server:** https://studiospace-api-4vhn.onrender.com  
**Health Check:** https://studiospace-api-4vhn.onrender.com/api/health  
**Client GitHub Repository:** https://github.com/fahad1420/B14-A8-StudioSpace-Client  
**Server GitHub Repository:** https://github.com/fahad1420/B14-A8-StudioSpace-Server  

---

## 1. Project Overview

**StudioSpace** is a modern peer-to-peer creative studio and production workspace rental platform engineered specifically for photographers, cinematographers, podcasters, sound engineers, content creators, and production crews.

Unlike generic property booking platforms, StudioSpace centers entirely around creative-industry workflows: hourly workspace reservations, transparent refundable security deposit accounting, verified equipment checklists, sound isolation specs, camlock 3-phase power drop information, corner cycloramas, and conflict-free reservation scheduling.

---

## 2. Key Features & Assignment Requirements

### 1. Multi-Category Studio Discovery & Filtering
- Browse spaces across five dedicated creative categories:
  1. **Photo Studios** (Daylight lofts, seamless infinity cycloramas, strobe packages)
  2. **Sound Stages** (Sound-treated motion stages, 3-phase power, drive-in access)
  3. **Podcast Rooms / Lounges** (Turnkey sets with broadcast mics and multi-cam rigs)
  4. **Music Suites** (Vocal booths, tracking rooms, analog outboard gear)
  5. **Art Workshops** (Industrial spaces for set fabrication, painting, and rehearsals)
- Real-time search by studio name, equipment, or location.
- Multi-criteria filtering by category, price range, and sorting by newest, rating, or price (low-to-high / high-to-low) with URL query parameter synchronization.

### 2. Full Studio CRUD Operations
- **Add Studio (`/add-studio`):** Private route requiring authentication. Supports title, category, hourly rate, refundable security deposit, max capacity, location, image upload/URL, equipment amenities checklist, and markdown overview. Host identity is securely derived from the authenticated session.
- **Studio Details (`/studios/[id]`):** Rich gallery, architectural dimensions, equipment inventory, host profile card, customer reviews, and a "Request Reservation" action button.
- **Edit Studio (`/studios/edit/[id]`):** Owner-restricted route pre-filled with existing data. Rejects non-owners with `HTTP 403 Forbidden`.
- **Delete Studio (`/my-listings`):** Owner-restricted deletion with a custom confirmation modal dialog (zero browser `confirm()`).

### 3. Hourly Booking Engine & Conflict Prevention
- Hourly booking modal with call date, load-in (start time), and wrap (end time) selection.
- Automatic client calculation and strict server-side re-verification of hourly duration, rental cost, security deposit, and total payable amount.
- **Double-Booking Protection:** Server checks time-slice overlap against all confirmed reservations for that space:
  $$\text{start}_{\text{new}} < \text{end}_{\text{existing}} \quad \land \quad \text{end}_{\text{new}} > \text{start}_{\text{existing}}$$
  Overlapping booking requests are rejected with `HTTP 409 Conflict`.
- Hosts cannot rent their own spaces.

### 4. Host Booking Management Workflow
- Incoming reservations initiate with status `Pending`.
- Studio hosts manage incoming requests directly from the **Host Dashboard**:
  - `Confirm` $\rightarrow$ Locks schedule and updates status to `Confirmed`.
  - `Decline` / `Cancel` $\rightarrow$ Frees schedule and updates status to `Cancelled`.
  - `Mark Completed` $\rightarrow$ Transitions finished shoots from `Confirmed` to `Completed`.
- Creators can cancel their own `Pending` requests with a custom confirmation modal.

### 5. Official PDF Booking Invoices (jsPDF)
- Creators can download an official, professional **PDF Booking Invoice** for eligible **Confirmed** and **Completed** sessions.
- **User Flow:** Navigate to **My Bookings** (`/my-bookings`) or the **Dashboard** (`/dashboard`) $\rightarrow$ Click the **"Download Invoice"** button on any confirmed/completed booking card.
- **Invoice Specs:** Clean A4 layout (210mm $\times$ 297mm), StudioSpace branding, `#B58A5A` warm bronze accent, unique Invoice Reference ID, issue date, creator & host contact info, studio address, reservation hours, duration, rental calculation, refundable security deposit breakdown, and total payable.

### 6. Robust JWT & Google OAuth Authentication
- **Email/Password:** Full registration with inline validation:
  - Minimum 6 characters
  - At least one uppercase letter
  - At least one lowercase letter
- **Google OAuth (Production):** Real browser Google Cloud login with PKCE and database-backed state verification, routing through Vercel BFF reverse proxy (`/api/auth/callback/google`).
- **HTTPOnly Cookies:** Session tokens and JWTs (`studiospace_jwt_token`, `__Secure-better-auth.session_token`) are stored exclusively in HTTPOnly, Secure cookies. Zero authentication tokens are stored in `localStorage`.
- Protected API routes return `HTTP 401 Unauthorized` when accessed without credentials.
- Persistent session across page reloads (Ctrl+R / F5) without redirecting authenticated users to login.
- **Clean Logout:** Completely clears all auth cookies and invalidates the session in MongoDB Atlas.

### 7. Dual-Perspective Operations Dashboard (`/dashboard`)
- **Creator Hub:** Quick metrics, upcoming shoots, and saved workspaces.
- **Host Hub:** Active listings, incoming booking requests, and status transition controls.

### 8. Wishlist (Saved Studios)
- One-click heart toggle on studio cards and details pages.
- Persisted to the database in MongoDB Atlas `wishlists` collection.
- Persists across browser refreshes and displays on the Dashboard.

### 9. Editorial Minimal Luxury Aesthetic & Theme Engine
- Custom design system inspired by architectural monographs: clean white primary surfaces (`#FFFFFF`), warm-gray secondary cards (`#F7F7F5`), rich noir typography, and warm bronze accents (`#B58A5A`).
- Light Mode and Dark Mode toggle powered by `next-themes` with zero hydration shift or flicker.
- Fully responsive across mobile (<640px), tablet (768px-1024px), and desktop (>1024px).
- Zero `alert()` or `confirm()` calls; all user interactions use Sonner toast alerts and custom accessible dialogs.
- Custom styled 404 page with return actions.

---

## 3. Technology Stack

### Frontend
- **Framework:** Next.js 15 (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS, tailwindcss-animate
- **UI Architecture:** Custom Minimal Luxury design system with accessible modal dialogs
- **Hero Slider:** Swiper.js (Autoplay, Fade effect, Pagination, Navigation)
- **PDF Engine:** jsPDF (Client-side A4 invoice generation)
- **Icons:** Lucide React (including custom official SVG X logo)
- **Notifications:** Sonner Toasts
- **Theming:** next-themes (Light / Dark mode persistence)

### Backend Architecture
- **Server:** Node.js (v24+) + Express.js + TypeScript
- **Database:** MongoDB Atlas (native official `mongodb` driver)
- **Authentication:** Better Auth v1.4 + JWT HTTPOnly cookies
- **Validation:** Zod schemas
- **Hosting:** Vercel (Frontend) + Render (Backend)

---

## 4. Examiner Test Credentials

For grading review, use the pre-seeded verified account:

| Field | Value |
|---|---|
| **Email** | `examiner@studiospace.com` |
| **Password** | `ExaminerPassword123!` |
| **Role** | Verified Creative Host & Creator (owns seeded studio listings) |
| **Quick Action** | 1-click **"Fill Examiner Credentials"** shortcut available on `/login` |

---

## 5. Examiner Step-by-Step Evaluation Guide

1. **Visit Live Site:** Open [https://thestudiospace.vercel.app](https://thestudiospace.vercel.app).
2. **Review Homepage:** Check 3-slide hero slider, Explore/Host CTAs, 5 categories, 6 featured studios loaded dynamically from MongoDB, 4-step booking guide, and footer with X logo.
3. **Explore Studios (`/studios`):** Test live search, category filter pills, price range slider, and sort dropdown.
4. **Email/Password Login:**
   - Go to `/login` $\rightarrow$ Click **"Fill Examiner Credentials"** $\rightarrow$ Click **"Log In"**.
   - Observe immediate welcome toast, user profile in Navbar, and access to `/dashboard`.
   - Press **Ctrl+R** to verify session persists across browser refresh.
5. **Google OAuth Login:**
   - Sign out $\rightarrow$ Click **"Continue with Google"** on `/login` $\rightarrow$ Select your Google account.
   - Verify seamless redirect to `/dashboard` with your Google name and avatar in the Navbar.
6. **Hourly Booking & Double Booking:**
   - Open any studio details page $\rightarrow$ Click **"Request Reservation"**.
   - Select tomorrow's date, 10:00 to 14:00 $\rightarrow$ Observe real-time hours, rental, deposit, and total calculation.
   - Submit $\rightarrow$ Redirects to `/my-bookings` with status **Pending**.
   - Attempting to book an overlapping time slot for an already confirmed session returns a clear conflict warning.
7. **Host Approval & Status Transition:**
   - Switch to `/dashboard` $\rightarrow$ Host Tab $\rightarrow$ Review incoming booking.
   - Click **"Confirm"** $\rightarrow$ Status updates to **Confirmed**.
8. **PDF Invoice Download:**
   - Go to `/my-bookings` (or `/dashboard`).
   - Find the **Confirmed** booking $\rightarrow$ Click the **"Download Invoice"** button.
   - Verify an actual `.pdf` file downloads to your machine.
   - Open the file: verify A4 format, StudioSpace branding, rental calculation, deposit, and total.
9. **Wishlist:** Click the heart icon on any studio card $\rightarrow$ Refresh $\rightarrow$ Verify saved state persists and appears under Saved Workspaces on `/dashboard`.
10. **Theme Toggle:** Click the Sun/Moon icon in the Navbar $\rightarrow$ Verify Light mode is clean white, Dark mode is deep noir, and preference persists on refresh.

---

## 6. Environment Variables

Create `.env.local` in the root of `b14-a8-shoot-location-client`:

```env
# Backend API Base URL
# Leave empty "" in production for Next.js BFF proxy rewrite (same-site cookie forwarding)
# Local: http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000

# Backend proxy destination used by next.config.mjs rewrites
BACKEND_API_URL=http://localhost:5000

# Client Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional ImgBB API Key for cloud photo uploads (free at https://api.imgbb.com/)
NEXT_PUBLIC_IMGBB_API_KEY=
```

---

## 7. Local Setup & Installation

```bash
# 1. Clone repository
git clone https://github.com/fahad1420/B14-A8-StudioSpace-Client.git
cd B14-A8-StudioSpace-Client

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.local.example .env.local

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 8. Production Deployment Details

- **Frontend:** Deployed to **Vercel** (`https://thestudiospace.vercel.app`) using Next.js App Router preset.
- **Backend:** Deployed to **Render** (`https://studiospace-api-4vhn.onrender.com`) as a Node Web Service.
- **BFF Architecture:** Next.js `/api/:path*` rewrites proxy requests to Render, ensuring first-party cookie handling and eliminating cross-site cookie restrictions.

---

## 9. Git Commit History
This repository maintains a comprehensive, logical commit trajectory with **35+ meaningful commits**, documenting the progression from architectural setup, design tokens, responsive components, booking modal, auth integration, to final production polish.
