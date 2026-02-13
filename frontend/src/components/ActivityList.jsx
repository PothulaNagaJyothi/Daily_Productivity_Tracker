/**
 * ActivityList
 *
 * Features:
 * - Displays activities
 * - Edit functionality
 * - Delete confirmation
 * - Category color badges
 */

import { useState } from "react"

function getCategoryColor(category) {
  const map = {
    Work: "bg-blue-100 text-blue-700",
    Study: "bg-purple-100 text-purple-700",
    Exercise: "bg-green-100 text-green-700",
    Leisure: "bg-yellow-100 text-yellow-700"
  }

  return map[category] || "bg-gray-100 text-gray-700"
}

function ActivityList({ activities, onDelete, onEdit }) {
  const [confirmId, setConfirmId] = useState(null)

  if (!activities || activities.length === 0) {
    return <p className="text-gray-500">No activities added yet.</p>
  }

  return (
    <div className="space-y-4 mt-6">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="bg-gray-50 p-4 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">
                {activity.title}
              </p>

              <span
                className={`inline-block text-xs px-2 py-1 rounded mt-1 ${getCategoryColor(
                  activity.category
                )}`}
              >
                {activity.category || "Uncategorized"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">
                {activity.duration_minutes} mins
              </span>

              <button
                onClick={() => onEdit(activity)}
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                Edit
              </button>

              <button
                onClick={() => setConfirmId(activity.id)}
                className="text-red-600 text-sm hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>

          {confirmId === activity.id && (
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => {
                  onDelete(activity.id)
                  setConfirmId(null)
                }}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Confirm
              </button>

              <button
                onClick={() => setConfirmId(null)}
                className="bg-gray-300 px-3 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ActivityList
