/**
 * SignupPage
 *
 * Behavior:
 * - Creates new user
 * - On success → redirect to login
 */

import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

function SignupPage() {
  const { signup } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    if (!email || !password) {
      toast.error("Email and password required")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    const { error } = await signup(email, password)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Account created successfully")
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">

        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Create Account
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="
              w-full px-3 py-2 rounded-md
              border border-gray-300
              bg-white text-gray-900
              dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full px-3 py-2 rounded-md
              border border-gray-300
              bg-white text-gray-900
              dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="
              w-full bg-blue-600 text-white
              py-2 rounded-md
              hover:bg-blue-700 transition
            "
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default SignupPage
