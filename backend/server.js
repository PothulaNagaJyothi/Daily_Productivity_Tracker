/**
 * Server Entry Point
 *
 * Responsibilities:
 * - Load environment variables
 * - Apply global rate limiting
 * - Start HTTP server
 * - Handle unexpected shutdowns
 */

import dotenv from "dotenv"

// Load environment variables first
dotenv.config()

import app from "./src/app.js"
import { apiLimiter } from "./src/middlewares/rateLimit.middleware.js"



const PORT = process.env.PORT || 5000

/**
 * Important for production (Render, Railway, etc.)
 * Ensures correct IP detection for rate limiting
 */
app.set("trust proxy", 1)

/**
 * Apply rate limiter globally to all API routes
 * If your routes are prefixed with /api, use:
 * app.use("/api", apiLimiter)
 */
app.use(apiLimiter)

let server

const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`)
    })
  } catch (error) {
    console.error("❌ Failed to start server:", error.message)
    process.exit(1)
  }
}

/**
 * Graceful shutdown
 */
const shutdown = (signal) => {
  console.log(`⚠️  ${signal} received. Shutting down...`)

  if (server) {
    server.close(() => {
      console.log("✅ Server closed")
      process.exit(0)
    })
  } else {
    process.exit(1)
  }
}

process.on("SIGTERM", () => shutdown("SIGTERM"))
process.on("SIGINT", () => shutdown("SIGINT"))

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message)
  shutdown("UnhandledRejection")
})

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message)
  shutdown("UncaughtException")
})

startServer()
