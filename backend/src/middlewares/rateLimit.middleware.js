/**
 * Rate Limit Middleware
 *
 * Protects backend from:
 * - Brute force attacks
 * - API abuse
 * - Request flooding
 *
 * Config:
 * - 100 requests per 15 minutes (general)
 * - 20 requests per 15 minutes (strict)
 */

import rateLimit from "express-rate-limit"

/**
 * General API limiter
 * Applies to most routes
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
})

/**
 * Strict limiter (for sensitive routes)
 */
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Slow down."
  }
})
