/**
 * Layout Component
 *
 * Responsibilities:
 * - Provide sticky header with navbar
 * - Provide dark mode toggle
 * - Wrap page content
 * - Apply smooth transitions and animations
 * - Maintain responsive centered layout
 */

import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import Navbar from "./Navbar"

function Layout({ children }) {
  const { dark, setDark } = useContext(ThemeContext)

  return (
    <div
      className="
        min-h-screen
        bg-gray-100 dark:bg-gray-900
        transition-colors duration-300
      "
    >
      {/* Sticky Header */}
      <header
        className="
          sticky top-0 z-50
          bg-white dark:bg-gray-800
          shadow-md
          transition-colors duration-300
        "
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Navbar Links */}
          <Navbar />

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="
              ml-6
              px-4 py-2
              rounded-lg
              text-sm font-medium
              bg-gray-200 dark:bg-gray-700
              hover:bg-gray-300 dark:hover:bg-gray-600
              transition
            "
          >
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      {/* Page Content */}
      <main
        className="
          max-w-6xl mx-auto
          px-6 py-10
          transition-all duration-300
          animate-page
        "
      >
        {children}
      </main>
    </div>
  )
}

export default Layout
