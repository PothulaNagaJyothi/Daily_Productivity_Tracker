/**
 * ProgressBar Component
 *
 * Displays daily completion percentage
 * based on total minutes out of 1440.
 */

function ProgressBar({ totalMinutes }) {
  const percentage = Math.min((totalMinutes / 1440) * 100, 100)

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Daily Progress</span>
        <span>{percentage.toFixed(1)}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
