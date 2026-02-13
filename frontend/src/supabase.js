/**
 * Supabase Client Configuration
 *
 * This file initializes and exports
 * the Supabase client for frontend usage.
 *
 * Uses:
 * - Public anon key (safe for browser)
 * - VITE environment variables
 */

import { createClient } from "@supabase/supabase-js"

// Read environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Basic safety check
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables are missing.")
}

// Create Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
