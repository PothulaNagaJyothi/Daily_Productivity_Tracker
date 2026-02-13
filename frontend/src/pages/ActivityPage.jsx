/**
 * ActivityPage (Service Role Version)
 *
 * - Dark mode compatible
 * - Styled inputs and dropdown
 * - Optimistic add/update/delete
 */

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"
import Layout from "../components/Layout"
import ActivityList from "../components/ActivityList"
import ProgressBar from "../components/ProgressBar"
import toast from "react-hot-toast"

const CATEGORY_OPTIONS = [
  "Work",
  "Study",
  "Exercise",
  "Leisure",
  "Personal",
  "Other"
]

function ActivityPage() {
  const navigate = useNavigate()

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  )

  const [activities, setActivities] = useState([])
  const [totalMinutes, setTotalMinutes] = useState(0)

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Work")
  const [duration, setDuration] = useState("")
  const [editingId, setEditingId] = useState(null)

  const [loading, setLoading] = useState(false)

  const fetchDayData = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/days/${date}`)
      setActivities(res.data.activities || [])
      setTotalMinutes(res.data.totalMinutes || 0)
    } catch {
      toast.error("Failed to load activities")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDayData()
  }, [date])

  const resetForm = () => {
    setTitle("")
    setCategory("Work")
    setDuration("")
    setEditingId(null)
  }

  const handleSubmit = async () => {
    if (!title || !duration) {
      toast.error("Title and duration required")
      return
    }

    const durationNumber = Number(duration)

    if (editingId) {
      const previous = [...activities]

      const updated = activities.map((a) =>
        a.id === editingId
          ? { ...a, title, category, duration_minutes: durationNumber }
          : a
      )

      setActivities(updated)
      setTotalMinutes(
        updated.reduce((sum, a) => sum + a.duration_minutes, 0)
      )

      try {
        await api.put(`/activities/${editingId}`, {
          title,
          category,
          duration_minutes: durationNumber
        })

        toast.success("Activity updated")
        resetForm()
      } catch {
        setActivities(previous)
        fetchDayData()
        toast.error("Update failed")
      }

      return
    }

    const tempId = Date.now()

    const newActivity = {
      id: tempId,
      title,
      category,
      duration_minutes: durationNumber
    }

    const previous = [...activities]

    setActivities([...activities, newActivity])
    setTotalMinutes(totalMinutes + durationNumber)

    resetForm()

    try {
      await api.post("/activities", {
        date,
        title,
        category,
        duration_minutes: durationNumber
      })

      toast.success("Activity added")
      fetchDayData()
    } catch {
      setActivities(previous)
      fetchDayData()
      toast.error("Add failed")
    }
  }

  const handleDelete = async (id) => {
    const previous = [...activities]

    const updated = activities.filter((a) => a.id !== id)

    setActivities(updated)
    setTotalMinutes(
      updated.reduce((sum, a) => sum + a.duration_minutes, 0)
    )

    try {
      await api.delete(`/activities/${id}`)
      toast.success("Activity deleted")
    } catch {
      setActivities(previous)
      fetchDayData()
      toast.error("Delete failed")
    }
  }

  const handleEdit = (activity) => {
    setTitle(activity.title)
    setCategory(activity.category)
    setDuration(activity.duration_minutes)
    setEditingId(activity.id)
  }

  const remaining = 1440 - totalMinutes

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Daily Activity Tracker
      </h1>

      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="
          w-full mb-6
          px-3 py-2
          rounded-md
          border border-gray-300
          bg-white text-gray-900
          dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
        "
      />

      {/* Summary */}
      <div className="mb-4">
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          Total Minutes: {totalMinutes}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Remaining: {remaining}
        </p>
      </div>

      <ProgressBar totalMinutes={totalMinutes} />

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <input
          type="text"
          placeholder="Activity title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            border border-gray-300
            rounded-md px-3 py-2
            bg-white text-gray-900
            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition
          "
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            border border-gray-300
            rounded-md px-3 py-2
            bg-white text-gray-900
            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition
          "
        >
          {CATEGORY_OPTIONS.map((cat) => (
            <option
              key={cat}
              value={cat}
              className="bg-white dark:bg-gray-800"
            >
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Minutes"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="
            border border-gray-300
            rounded-md px-3 py-2
            bg-white text-gray-900
            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition
          "
        />

        <button
          onClick={handleSubmit}
          className="
            bg-blue-600 text-white
            px-4 py-2 rounded-md
            hover:bg-blue-700
            transition
          "
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      ) : (
        <ActivityList
          activities={activities}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <button
        onClick={() =>
          navigate(`/dashboard?date=${date}`)
        }
        className="
          mt-8 bg-green-600 text-white
          px-6 py-2 rounded-md
          hover:bg-green-700
          transition
        "
      >
        Analyse
      </button>
    </Layout>
  )
}

export default ActivityPage
