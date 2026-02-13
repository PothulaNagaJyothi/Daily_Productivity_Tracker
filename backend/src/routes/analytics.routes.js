/**
 * Analytics Routes
 *
 * All analytics are user-specific.
 * User ID is extracted from req.user.id
 */

import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import * as analyticsController from "../controllers/analytics.controller.js"

const router = express.Router()

// --------------------------------------
// Get Analytics For Specific Date
// --------------------------------------
router.get(
  "/analytics/:date",
  authMiddleware,
  analyticsController.getDailyAnalytics
)

export default router;
