/**
 * Date Utility Functions
 *
 * Centralized date helpers used across the application.
 * Keeps date logic out of components.
 */

/**
 * Returns today's date in YYYY-MM-DD format
 */
export function getToday() {
  return new Date().toISOString().split("T")[0]
}

/**
 * Format a Date object to YYYY-MM-DD
 */
export function formatDate(date) {
  const d = new Date(date)
  return d.toISOString().split("T")[0]
}

/**
 * Convert YYYY-MM-DD to readable format
 * Example: 2026-02-13 → Feb 13, 2026
 */
export function toReadableDate(dateString) {
  const date = new Date(dateString)

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}

/**
 * Returns last 7 days including given date
 * Output format: ["YYYY-MM-DD", ...]
 */
export function getLast7Days(baseDate) {
  const dates = []
  const base = new Date(baseDate)

  for (let i = 6; i >= 0; i--) {
    const d = new Date(base)
    d.setDate(base.getDate() - i)
    dates.push(formatDate(d))
  }

  return dates
}

/**
 * Extract MM-DD from YYYY-MM-DD
 * Useful for chart labels
 */
export function toShortLabel(dateString) {
  return dateString.slice(5)
}

/**
 * Validate if string is valid YYYY-MM-DD date
 */
export function isValidDate(dateString) {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}
