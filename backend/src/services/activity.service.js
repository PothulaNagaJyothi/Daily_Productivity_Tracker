/**
 * Activity Service Layer
 *
 * Responsible for:
 * - Enforcing business rules (1440-minute limit)
 * - Managing activity CRUD operations
 * - Keeping daily total_minutes in sync
 *
 * This layer contains ALL business logic.
 * Controllers should never contain validation or database logic.
 */

import { supabase } from '../config/supabaseClient.js'

const MAX_MINUTES = 1440

/**
 * Add a new activity for a specific user and date.
 * Enforces the 1440-minute daily constraint.
 */
export const addActivity = async ({
  user_id,
  date,
  title,
  category,
  duration_minutes
}) => {

  // Basic validation
  if (!user_id || !date || !title || !duration_minutes) {
    throw new Error('Missing required fields')
  }

  if (duration_minutes <= 0) {
    throw new Error('Duration must be greater than 0')
  }

  // Step 1: Check if a day record exists for the user + date
  let { data: day, error: dayError } = await supabase
    .from('days')
    .select('*')
    .eq('user_id', user_id)
    .eq('date', date)
    .single()

  if (dayError && dayError.code !== 'PGRST116') {
    // PGRST116 = no rows found (not a real error for us)
    throw dayError
  }

  // Step 2: If no day record exists, create one
  if (!day) {
    const { data: newDay, error: createError } = await supabase
      .from('days')
      .insert([{ user_id, date, total_minutes: 0 }])
      .select()
      .single()

    if (createError) throw createError
    day = newDay
  }

  // Step 3: Enforce 1440-minute rule
  const newTotal = day.total_minutes + duration_minutes

  if (newTotal > MAX_MINUTES) {
    throw new Error('Daily limit of 1440 minutes exceeded')
  }

  // Step 4: Insert activity
  const { error: insertError } = await supabase
    .from('activities')
    .insert([
      {
        day_id: day.id,
        title,
        category,
        duration_minutes
      }
    ])

  if (insertError) throw insertError

  // Step 5: Update total_minutes in days table
  const { error: updateError } = await supabase
    .from('days')
    .update({ total_minutes: newTotal })
    .eq('id', day.id)

  if (updateError) throw updateError

  return {
    message: 'Activity added successfully',
    totalMinutes: newTotal,
    remainingMinutes: MAX_MINUTES - newTotal
  }
}

/**
 * Get all activity data for a specific user and date.
 * Returns day metadata and activities list.
 */
export const getDayData = async (userId, date) => {

  if (!userId || !date) {
    throw new Error('Missing userId or date')
  }

  // Fetch day record
  const { data: day, error: dayError } = await supabase
    .from('days')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .single()

  if (dayError && dayError.code !== 'PGRST116') {
    throw dayError
  }

  if (!day) {
    // No data yet for that day
    return {
      day: null,
      activities: [],
      totalMinutes: 0,
      remainingMinutes: MAX_MINUTES
    }
  }

  // Fetch all activities for that day
  const { data: activities, error: activityError } = await supabase
    .from('activities')
    .select('*')
    .eq('day_id', day.id)
    .order('created_at', { ascending: true })

  if (activityError) throw activityError

  return {
    day,
    activities,
    totalMinutes: day.total_minutes,
    remainingMinutes: MAX_MINUTES - day.total_minutes
  }
}

/**
 * Update an existing activity.
 * Recalculates daily total and re-validates 1440 constraint.
 */
export const updateActivity = async (activityId, { duration_minutes, title, category }) => {

  if (!activityId) {
    throw new Error('Activity ID is required')
  }

  // Fetch existing activity
  const { data: activity, error: activityError } = await supabase
    .from('activities')
    .select('*')
    .eq('id', activityId)
    .single()

  if (activityError) throw activityError

  // Fetch associated day record
  const { data: day, error: dayError } = await supabase
    .from('days')
    .select('*')
    .eq('id', activity.day_id)
    .single()

  if (dayError) throw dayError

  // Calculate updated total
  const updatedDuration = duration_minutes ?? activity.duration_minutes
  const newTotal =
    day.total_minutes - activity.duration_minutes + updatedDuration

  if (newTotal > MAX_MINUTES) {
    throw new Error('Daily limit of 1440 minutes exceeded')
  }

  // Update activity
  const { error: updateActivityError } = await supabase
    .from('activities')
    .update({
      duration_minutes: updatedDuration,
      title: title ?? activity.title,
      category: category ?? activity.category
    })
    .eq('id', activityId)

  if (updateActivityError) throw updateActivityError

  // Update day total
  const { error: updateDayError } = await supabase
    .from('days')
    .update({ total_minutes: newTotal })
    .eq('id', day.id)

  if (updateDayError) throw updateDayError

  return {
    message: 'Activity updated successfully',
    totalMinutes: newTotal,
    remainingMinutes: MAX_MINUTES - newTotal
  }
}

/**
 * Delete an activity.
 * Updates the day's total_minutes accordingly.
 */
export const deleteActivity = async (activityId) => {

  if (!activityId) {
    throw new Error('Activity ID is required')
  }

  // Fetch activity
  const { data: activity, error: activityError } = await supabase
    .from('activities')
    .select('*')
    .eq('id', activityId)
    .single()

  if (activityError) throw activityError

  // Fetch associated day
  const { data: day, error: dayError } = await supabase
    .from('days')
    .select('*')
    .eq('id', activity.day_id)
    .single()

  if (dayError) throw dayError

  const newTotal = day.total_minutes - activity.duration_minutes

  // Delete activity
  const { error: deleteError } = await supabase
    .from('activities')
    .delete()
    .eq('id', activityId)

  if (deleteError) throw deleteError

  // Update total minutes
  const { error: updateError } = await supabase
    .from('days')
    .update({ total_minutes: newTotal })
    .eq('id', day.id)

  if (updateError) throw updateError

  return {
    message: 'Activity deleted successfully',
    totalMinutes: newTotal,
    remainingMinutes: MAX_MINUTES - newTotal
  }
}