/**
 * Main Express Application
 *
 * Responsibilities:
 * - Initialize Express
 * - Register global middlewares
 * - Apply security protections
 * - Register feature routes
 * - Handle 404
 * - Register global error handler
 *
 * NOTE:
 * This file does NOT start the server.
 * server.js handles listening.
 */

import cors from "cors"
import express from "express"
import helmet from "helmet"

import activityRoutes from "./routes/activity.routes.js"
import analyticsRoutes from "./routes/analytics.routes.js"

import { apiLimiter } from "./middlewares/rateLimit.middleware.js"
import {
  notFoundHandler,
  errorHandler
} from "./middlewares/error.middleware.js"

const app = express()

/**
 * -----------------------------
 * Security Middlewares
 * -----------------------------
 */

// Security headers
app.use(helmet())

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(null, false)
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

/**
 * -----------------------------
 * Body Parsers
 * -----------------------------
 */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * -----------------------------
 * Rate Limiting (API level)
 * -----------------------------
 *
 * Applies limiter only to API routes.
 * Cleaner than applying globally.
 */
app.use("/api", apiLimiter)

/**
 * -----------------------------
 * API Routes
 * -----------------------------
 */

app.use("/api", activityRoutes)
app.use("/api", analyticsRoutes)

/**
 * -----------------------------
 * Health Check Route
 * -----------------------------
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API is running"
  })
})

/**
 * -----------------------------
 * 404 Handler
 * -----------------------------
 */
app.use(notFoundHandler)

/**
 * -----------------------------
 * Global Error Handler
 * -----------------------------
 */
app.use(errorHandler)

export default app
