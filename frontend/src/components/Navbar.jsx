import { NavLink, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { supabase } from "../supabase"

function Navbar() {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const profileRef = useRef(null)
  const navigate = useNavigate()

  const today = new Date().toISOString().split("T")[0]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setProfileOpen(false)
    navigate("/login")
  }

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const linkClasses = ({ isActive }) =>
    `
    relative px-3 py-2 transition text-sm font-medium
    ${isActive
      ? "text-blue-600 dark:text-blue-400"
      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"}
  `

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Productivity
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">

          <NavLink to="/" className={linkClasses}>
            {({ isActive }) => (
              <span className="relative">
                Tracker
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300" />
                )}
              </span>
            )}
          </NavLink>

          <NavLink
            to={`/dashboard?date=${today}`}
            className={linkClasses}
          >
            {({ isActive }) => (
              <span className="relative">
                Analytics
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300" />
                )}
              </span>
            )}
          </NavLink>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Profile
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-3 text-sm">
                <button
                  onClick={handleLogout}
                  className="w-full text-left cursor-pointer hover:text-red-500 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-800 dark:text-gray-200"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
{open && (
  <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-3 text-base font-medium">

    <NavLink
      to="/"
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `
        block w-full px-4 py-2 rounded-md transition
        ${
          isActive
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }
        `
      }
    >
      Tracker
    </NavLink>

    <NavLink
      to={`/dashboard?date=${today}`}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `
        block w-full px-4 py-2 rounded-md transition
        ${
          isActive
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }
        `
      }
    >
      Analytics
    </NavLink>

    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">

      <button
        onClick={() => {
          setOpen(false)
          // Add your logout logic here
        }}
        className="block w-full text-left px-4 py-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
      >
        Logout
      </button>

    </div>

  </div>
)}
    </nav>
  )
}

export default Navbar
