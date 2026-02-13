/**
 * Activity Controller
 *
 * All operations are scoped to authenticated user.
 * User ID is taken from req.user.id.
 */

import supabase from "../config/supabase.js"


// ---------------------------------------
// Create Activity
// ---------------------------------------
export const createActivity = async (req, res) => {
  try {
    const userId = req.user.id
    const { date, title, category, duration_minutes } = req.body

    if (!date || !title || !duration_minutes) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      })
    }

    const { data, error } = await supabase
      .from("activities")
      .insert([
        {
          user_id: userId,
          date,
          title,
          category,
          duration_minutes
        }
      ])
      .select()

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }

    res.status(201).json({
      success: true,
      data: data[0]
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create activity"
    })
  }
}

// ---------------------------------------
// Update Activity
// ---------------------------------------
export const updateActivity = async (req, res) => {
  try {
    const userId = req.user.id
    const { id } = req.params
    const { title, category, duration_minutes } = req.body

    const { data, error } = await supabase
      .from("activities")
      .update({
        title,
        category,
        duration_minutes
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select()

    if (error || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Activity not found or unauthorized"
      })
    }

    res.json({
      success: true,
      data: data[0]
    })

  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to update activity"
    })
  }
}

// ---------------------------------------
// Delete Activity
// ---------------------------------------
export const deleteActivity = async (req, res) => {
  try {
    const userId = req.user.id
    const { id } = req.params

    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }

    res.json({
      success: true,
      message: "Activity deleted"
    })

  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete activity"
    })
  }
}

// ---------------------------------------
// Get Activities By Date
// ---------------------------------------
export const getActivitiesByDate = async (req, res) => {
  try {
    const userId = req.user.id
    const { date } = req.params

    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("user_id", userId)
      .eq("date", date)
      .order("created_at", { ascending: true })

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }

    const totalMinutes = data.reduce(
      (sum, activity) =>
        sum + activity.duration_minutes,
      0
    )

    res.json({
      success: true,
      activities: data,
      totalMinutes
    })

  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch activities"
    })
  }
}
