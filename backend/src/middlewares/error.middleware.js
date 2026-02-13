/**
 * Global Middleware Utilities
 *
 * Contains:
 * - asyncHandler
 * - notFoundHandler
 * - errorHandler
 */

/**
 * Wrap async route handlers
 * Automatically forwards errors to errorHandler
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/**
 * Handles unknown routes
 * Must be placed after all routes
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  })
}

/**
 * Centralized Error Handler
 */
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message)

  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : 500

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message
  })
}
