# Daily Productivity Tracker Frontend

A modern, responsive web application for tracking daily activities and visualizing productivity. Built with **React**, **Vite**, and **Tailwind CSS**.

**Live Demo:** [https://dayledger.vercel.app/](https://dayledger.vercel.app/)

## Overview

The **Daily Productivity Tracker Frontend** provides a user-friendly interface to interact with the productivity API. It features secure authentication, a dynamic dashboard for managing daily logs, and real-time analytics visualization.

Key Features:
- **Authentication**: User Login and Signup powered by Supabase Auth.
- **Activity Management**: Add, Edit, and Delete daily activities with optimistic UI updates.
- **Dashboard**: View daily summaries and progress towards the 1440-minute limit.
- **Analytics**: Visualize time distribution across categories (Work, Study, Exercise, etc.).
- **Dark Mode**: Fully supported dark theme that respects system preference or user toggle.
- **Responsive Navigation**: Enhanced mobile menu and profile management.

---

## Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Framework**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **State Management**: React Context (Auth, Theme)
- **Charts**: Chart.js / react-chartjs-2
- **Notifications**: React Hot Toast

---

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components (Navbar, ActivityList, etc.)
│   ├── context/           # Global state (Auth, Theme)
│   ├── pages/             # Page components (ActivityPage, Dashboard, Login, NotFound)
│   ├── services/          # API services
│   │   ├── api.js         # Axios instance with Auth interceptors
│   │   └── supabase.js    # Supabase service client
│   ├── supabase.js        # Supabase client configuration (Frontend)
│   ├── utils/             # Helper functions
│   ├── App.jsx            # Main Router setup
│   └── main.jsx           # Entry point (Providers)
├── .env                   # Environment variables
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── tailwind.config.js     # Tailwind configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- The running **Backend** service (see `../backend/README.md`)

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the `frontend` folder:

   ```env
   # API URL (Backend)
   VITE_API_URL=http://localhost:5000/api
   
   # Supabase Configuration (Must match backend project)
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## Deployment

This application is deployed on **Vercel**.

### To Deploy Your Own:

1. **Build command**: `npm run build`
2. **Output directory**: `dist`
3. **Connect to Git**: Push your code and connect your repository to Vercel.
4. **Environment Variables**: Add `VITE_API_URL`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_ANON_KEY` to your Vercel project settings.

---

## Usage Guide

1. **Sign Up / Login**: Create an account. Authentication is handled via Supabase.
2. **Dashboard**:
   - Select a date.
   - Add activities (Work, Exercise, etc.).
   - Monitor the "Remaining Minutes" counter (Total: 1440).
3. **Analytics**:
   - Click "Analyse" to view your productivity score and category breakdown charts.
4. **Theme**:
   - The app automatically adapts to your system theme (Light/Dark).

---

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production (outputs to `dist/`).
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.

---

## License

ISC
