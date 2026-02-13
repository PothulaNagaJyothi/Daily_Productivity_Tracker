import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import validateRequest from "../middlewares/validation.middleware.js"
import { body, param } from "express-validator"
import * as activityController from "../controllers/activity.controller.js"

const router = express.Router()

// ---------------- CREATE ----------------
router.post(
  "/activities",
  authMiddleware,
  [
    body("date").isISO8601().withMessage("Invalid date"),
    body("title").isLength({ min: 1 }).withMessage("Title required"),
    body("duration_minutes")
      .isInt({ min: 1 })
      .withMessage("Duration must be positive number")
  ],
  validateRequest,
  activityController.createActivity
)

// ---------------- UPDATE ----------------
router.put(
  "/activities/:id",
  authMiddleware,
  [
    param("id").isUUID().withMessage("Invalid activity ID"),
    body("title").optional().isLength({ min: 1 }),
    body("duration_minutes").optional().isInt({ min: 1 })
  ],
  validateRequest,
  activityController.updateActivity
)

// ---------------- DELETE ----------------
router.delete(
  "/activities/:id",
  authMiddleware,
  [param("id").isUUID()],
  validateRequest,
  activityController.deleteActivity
)

// ---------------- GET BY DATE ----------------
router.get(
  "/days/:date",
  authMiddleware,
  [param("date").isISO8601()],
  validateRequest,
  activityController.getActivitiesByDate
)

export default router;
