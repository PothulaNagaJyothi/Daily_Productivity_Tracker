/**
 * ActivityForm Component
 *
 * Handles user input for:
 * - Title
 * - Category
 * - Duration
 *
 * Parent manages state.
 */

function ActivityForm({
  title,
  category,
  duration,
  setTitle,
  setCategory,
  setDuration,
  onSubmit
}) {
  return (
    <div className="space-y-4 mb-8">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Activity Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Category (Work, Study, etc.)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Activity
      </button>
    </div>
  )
}

export default ActivityForm
