# SmartSupport – Frontend (React + Vite)

SmartSupport Frontend is a modern, responsive single-page web application designed for customer support operations. Built with **React 19**, **Vite**, and **Tailwind CSS**, it features role-based interfaces for Customers, Support Staff, and Administrators to handle ticket lifecycles seamlessly.

This repository contains the frontend application. The backend service is built using Spring Boot.

---

## ?? Related Links

- **Backend Repository:** [https://github.com/vaishnavisonawane893/smartsupport-backend](https://github.com/vaishnavisonawane893/smartsupport-backend)

---

## ?? Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite (Rolldown / Fast Refresh)
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **UI Components & Icons:** Headless UI, Heroicons, Lucide React
- **Routing:** React Router v7
- **HTTP Client:** Axios (configured with auth interceptors)
- **Charts & Analytics:** Recharts

---

## ?? Key Features

- **Role-Based Portals:**
  - **Customer Portal:** Submit new tickets with priority/category, view ticket history, and communicate in real-time threaded conversations.
  - **Support Staff Portal:** View assigned queue, update ticket states (Open, In Progress, Resolved), and add staff responses.
  - **Administrator Dashboard:** Comprehensive metrics overview, manage user accounts, add/modify staff members, and assign tickets.
- **Secure Authentication:** Automatic JWT storage in local storage, token attachment via Axios request interceptors, and protected route guards.
- **Modern Responsive Design:** Clean layout optimized for mobile, tablet, and desktop screens with custom Tailwind styling.
- **Real-Time Visual Indicators:** Status badges, priority colors, and intuitive feedback notifications.

---

## ?? Project Structure

```
smartsupport-frontend/
+-- public/                 # Static assets
+-- src/
¦   +-- api/
¦   ¦   +-- axios.js        # Axios instance configured with baseURL and JWT interceptor
¦   +-- assets/             # Images, illustrations, and logos
¦   +-- components/         # Reusable UI widgets, navigation bars, and modals
¦   +-- context/
¦   ¦   +-- AuthContext.jsx # Global user authentication state management
¦   +-- Pages/
¦   ¦   +-- Admin/          # Admin pages (ManageStaff, ManageUsers, AllTickets, etc.)
¦   ¦   +-- Auth/           # Login & Registration views
¦   ¦   +-- staff/          # Staff dashboard, assigned tickets, and details
¦   ¦   +-- Tickets/        # Customer ticket creation, list, and details
¦   +-- routes/             # Route configurations and protected route wrappers
¦   +-- App.jsx             # Main application shell
¦   +-- index.css           # Tailwind base styles and directives
¦   +-- main.jsx            # React root mount entry point
+-- .env.example            # Environment variables template
+-- eslint.config.js        # ESLint configuration
+-- package.json            # Dependencies and npm scripts
+-- tailwind.config.js      # Tailwind design configuration
+-- vite.config.js          # Vite build tool configuration
+-- README.md
```

---

## ??? Prerequisites

Before running the frontend locally, ensure you have:
1. **Node.js** (v18.x, v20.x, or v22+ recommended)
2. **npm** (v9+ or compatible package manager like yarn / pnpm)
3. **Git**

---

## ?? Environment Configuration

Create a `.env` file in the root of `smartsupport-frontend/` based on `.env.example`:

```env
# Backend API Base URL
VITE_BACKEND_URL=http://localhost:8080/api
```

> **Note:** When deploying to production (e.g., Vercel, Netlify), set `VITE_BACKEND_URL` to your live backend domain (e.g., `https://your-api.onrender.com/api`).

---

## ?? Local Setup & Running Instructions

### 1. Clone the repository
```bash
git clone https://github.com/vaishnavisonawane893/smartsupport-frontend.git
cd smartsupport-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Copy the template to `.env`:
```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Linux / macOS
cp .env.example .env
```

### 4. Start the development server
```bash
npm run dev
```

The application will be live at:
?? **`http://localhost:5173/`**

---

## ?? Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run preview
```

The compiled output will be generated in the `dist/` directory, ready to deploy to Netlify, Vercel, or AWS S3/CloudFront.

---

## ????? Author

**Vaishnavi Sonawane**  
GitHub: [@vaishnavisonawane893](https://github.com/vaishnavisonawane893)

---

## ?? License

This project is licensed under the MIT License.
