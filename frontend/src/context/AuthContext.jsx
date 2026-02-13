/**
 * AuthContext
 *
 * Manages:
 * - Current user
 * - Session
 * - Login
 * - Signup
 * - Logout
 */

import { createContext, useEffect, useState } from "react"
import { supabase } from "../services/supabase"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get existing session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    // Listen to auth changes
    const { data: listener } =
      supabase.auth.onAuthStateChange(
        (_, session) => {
          setUser(session?.user ?? null)
        }
      )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signup = async (email, password) => {
    return await supabase.auth.signUp({
      email,
      password
    })
  }

  const login = async (email, password) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}
