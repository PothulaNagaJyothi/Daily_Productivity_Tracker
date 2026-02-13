/**
 * NotFoundPage
 *
 * Shown when route does not exist.
 */

import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="text-center mt-20">
        <h1 className="text-5xl font-bold mb-4">
          404
        </h1>

        <p className="text-gray-500 mb-8">
          Page not found.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go Home
        </button>
      </div>
    </Layout>
  )
}

export default NotFoundPage
