/**
 * App Component
 *
 * Responsibilities:
 * - Define all application routes
 * - Protect authenticated routes
 * - Handle public routes (Login / Signup)
 * - Provide 404 fallback
 *
 * Route Structure:
 * - /login       → Public
 * - /signup      → Public
 * - /            → Protected (Activity Tracker)
 * - /dashboard   → Protected (Analytics)
 * - *            → 404
 */

import { BrowserRouter, Routes, Route } from "react-router-dom"

import ActivityPage from "./pages/ActivityPage"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- Public Routes ---------- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* ---------- Protected Routes ---------- */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ActivityPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ---------- 404 Fallback ---------- */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
