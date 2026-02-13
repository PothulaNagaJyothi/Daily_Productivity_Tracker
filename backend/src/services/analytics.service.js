/**
 * Analytics Service Layer
 *
 * Responsible for:
 * - Aggregating activity data
 * - Calculating daily statistics
 * - Generating category breakdown
 * - Computing simple productivity score
 *
 * This file contains only analytical logic.
 * No HTTP handling belongs here.
 */

import { supabase } from '../config/supabaseClient.js'

const MAX_MINUTES = 1440

/**
 * Get analytics summary for a specific user and date.
 */
export const getDailyAnalytics = async (userId, date) => {

  if (!userId || !date) {
    throw new Error('Missing userId or date')
  }

  // Step 1: Fetch the day record
  const { data: day, error: dayError } = await supabase
    .from('days')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .single()

  // If no record exists, return empty analytics
  if (dayError && dayError.code === 'PGRST116') {
    return buildEmptyAnalytics()
  }

  if (dayError) throw dayError

  // Step 2: Fetch activities for that day
  const { data: activities, error: activityError } = await supabase
    .from('activities')
    .select('*')
    .eq('day_id', day.id)

  if (activityError) throw activityError

  // Step 3: Calculate category breakdown
  const categoryBreakdown = {}

  activities.forEach(activity => {
    const category = activity.category || 'Uncategorized'

    if (!categoryBreakdown[category]) {
      categoryBreakdown[category] = 0
    }

    categoryBreakdown[category] += activity.duration_minutes
  })

  // Step 4: Calculate percentages
  const categoryPercentages = {}

  Object.keys(categoryBreakdown).forEach(category => {
    categoryPercentages[category] = (
      (categoryBreakdown[category] / day.total_minutes) * 100
    ).toFixed(2)
  })

  // Step 5: Calculate productivity score
  const productivityScore = calculateProductivityScore(categoryBreakdown)

  return {
    totalMinutes: day.total_minutes,
    totalHours: (day.total_minutes / 60).toFixed(2),
    remainingMinutes: MAX_MINUTES - day.total_minutes,
    activityCount: activities.length,
    categoryBreakdown,
    categoryPercentages,
    productivityScore
  }
}

/**
 * Returns a default empty analytics object.
 */
const buildEmptyAnalytics = () => {
  return {
    totalMinutes: 0,
    totalHours: 0,
    remainingMinutes: MAX_MINUTES,
    activityCount: 0,
    categoryBreakdown: {},
    categoryPercentages: {},
    productivityScore: 0
  }
}

/**
 * Simple productivity scoring logic.
 *
 * You can tune this later.
 * Current logic:
 * - Work/Study time boosts score
 * - Exercise gives bonus
 * - Excess leisure reduces score
 *
 * Score is normalized between 0–100.
 */
const calculateProductivityScore = (categoryBreakdown) => {

  let score = 50 // Base score

  const workTime =
    (categoryBreakdown['Work'] || 0) +
    (categoryBreakdown['Study'] || 0)

  const exerciseTime = categoryBreakdown['Exercise'] || 0
  const leisureTime = categoryBreakdown['Leisure'] || 0

  // Reward productive time (max +30)
  score += Math.min(workTime / 30, 30)

  // Reward exercise (max +10)
  score += Math.min(exerciseTime / 15, 10)

  // Penalize excessive leisure (max -20)
  score -= Math.min(leisureTime / 30, 20)

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, Math.round(score)))

  return score
}