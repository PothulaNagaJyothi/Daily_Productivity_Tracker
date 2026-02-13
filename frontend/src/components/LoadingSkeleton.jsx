/**
 * LoadingSkeleton
 *
 * Used for loading states.
 * Gives smoother UX than simple text.
 */

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
    </div>
  )
}

export default LoadingSkeleton
