/**
 * Auth Middleware
 *
 * Responsibilities:
 * - Extract Bearer token
 * - Verify token using Supabase
 * - Attach authenticated user to req.user
 * - Block unauthorized requests
 *
 * Security:
 * - Uses service role key (server-side only)
 * - Validates JWT properly
 */

import supabase from "../config/supabase.js"


const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing"
      })
    }

    const token = authHeader.split(" ")[1]

    // Verify token using Supabase
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      })
    }

    // Attach authenticated user to request
    req.user = data.user

    next()

  } catch (error) {
    console.error("Auth Middleware Error:", error.message)

    return res.status(500).json({
      success: false,
      message: "Authentication failed"
    })
  }
}

export default authMiddleware
