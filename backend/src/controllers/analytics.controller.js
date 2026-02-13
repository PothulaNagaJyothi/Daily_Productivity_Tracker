/**
 * Analytics Controller
 *
 * Provides daily analytics:
 * - totalMinutes
 * - totalHours
 * - activityCount
 * - categoryBreakdown
 * - productivityScore
 */

import supabase from "../config/supabase.js"


export const getDailyAnalytics = async (req, res) => {
  try {
    const userId = req.user.id
    const { date } = req.params

    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("user_id", userId)
      .eq("date", date)

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

    const totalHours = (totalMinutes / 60).toFixed(2)

    const activityCount = data.length

    const categoryBreakdown = {}

    data.forEach((activity) => {
      if (!categoryBreakdown[activity.category]) {
        categoryBreakdown[activity.category] = 0
      }
      categoryBreakdown[activity.category] +=
        activity.duration_minutes
    })

    const productivityScore = Math.min(
      100,
      Math.round((totalMinutes / 480) * 100)
    )

    res.json({
      success: true,
      totalMinutes,
      totalHours,
      activityCount,
      categoryBreakdown,
      productivityScore
    })

  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics"
    })
  }
}
