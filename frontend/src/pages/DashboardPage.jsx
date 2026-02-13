/**
 * DashboardPage (Service Role Version)
 *
 * - No userId in URL
 * - Backend extracts user from JWT
 */

import { useEffect, useState } from "react"
import { api } from "../services/api"
import { useLocation, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import LoadingSkeleton from "../components/LoadingSkeleton"

import { Pie, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
)

function DashboardPage() {
  const navigate = useNavigate()

  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const date = queryParams.get("date")

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)

        const res = await api.get(`/analytics/${date}`)
        setAnalytics(res.data)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (date) fetchAnalytics()
  }, [date])

  if (loading) {
    return (
      <Layout>
        <LoadingSkeleton />
      </Layout>
    )
  }

  if (!analytics) {
    return (
      <Layout>
        <p>No analytics available.</p>
      </Layout>
    )
  }

  const pieData = {
    labels: Object.keys(analytics.categoryBreakdown),
    datasets: [
      {
        data: Object.values(analytics.categoryBreakdown),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#8B5CF6",
          "#EF4444",
          "#06B6D4"
        ]
      }
    ]
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl">
          <p>Total Hours</p>
          <p className="text-2xl font-semibold">
            {analytics.totalHours}
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl">
          <p>Activities</p>
          <p className="text-2xl font-semibold">
            {analytics.activityCount}
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl">
          <p>Productivity Score</p>
          <p className="text-2xl font-semibold">
            {analytics.productivityScore}
          </p>
        </div>
      </div>

      <div className="max-w-md">
        <Pie data={pieData} />
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-10 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Back
      </button>
    </Layout>
  )
}

export default DashboardPage
