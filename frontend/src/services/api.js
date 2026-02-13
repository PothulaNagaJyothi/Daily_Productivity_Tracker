/**
 * API Service Layer
 *
 * Responsibilities:
 * - Centralized Axios instance
 * - Attach Supabase JWT automatically
 * - Handle global errors
 * - Support environment-based configuration
 *
 * Security:
 * - Uses Supabase access_token
 * - NEVER exposes service role key
 */

import axios from "axios"
import { supabase } from "./supabase"

// Base URL from environment
const BASE_URL = import.meta.env.VITE_API_URL

/**
 * Create Axios instance
 */
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

/**
 * Request Interceptor
 *
 * Automatically attaches Supabase JWT
 * to every outgoing request.
 */
api.interceptors.request.use(
  async (config) => {
    try {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (session?.access_token) {
        config.headers.Authorization =
          `Bearer ${session.access_token}`
      }
    } catch (error) {
      console.error("Failed to attach auth token")
    }

    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Response Interceptor
 *
 * Handles:
 * - Global error logging
 * - 401 unauthorized handling
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status

      console.error(
        "API Error:",
        status,
        error.response.data
      )

      // Optional: auto-logout on 401
      if (status === 401) {
        console.warn("Unauthorized request")
      }

    } else if (error.request) {
      console.error("No response from backend")
    } else {
      console.error("Request setup error:", error.message)
    }

    return Promise.reject(error)
  }
)
