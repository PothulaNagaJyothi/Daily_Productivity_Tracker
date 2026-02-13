/**
 * Date Utility Functions
 *
 * Responsible for:
 * - Validating date input
 * - Normalizing date format (YYYY-MM-DD)
 * - Providing safe date helpers
 *
 * Keeps date-related logic out of services/controllers.
 */

/**
 * Validates whether a string is a valid date.
 * Expected format: YYYY-MM-DD
 */
export const isValidDate = (dateString) => {
  if (!dateString) return false

  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

/**
 * Converts a Date object or date string
 * into standardized YYYY-MM-DD format.
 */
export const formatToISODate = (dateInput) => {
  const date = new Date(dateInput)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format')
  }

  return date.toISOString().split('T')[0]
}

/**
 * Returns today's date in YYYY-MM-DD format.
 */
export const getTodayDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

/**
 * Compares two date strings (YYYY-MM-DD).
 * Returns:
 * - 1 if date1 > date2
 * - -1 if date1 < date2
 * - 0 if equal
 */
export const compareDates = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  if (d1 > d2) return 1
  if (d1 < d2) return -1
  return 0
}