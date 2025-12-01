import { Router } from "express";
import {
  getNotifications,
  getUnreadCount,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteReadNotifications,
  checkLowStockAlerts,
} from "../controllers/notificationController";

const router = Router();

// GET routes
router.get("/", getNotifications);
router.get("/unread-count", getUnreadCount);
router.get("/check-low-stock", checkLowStockAlerts);

// POST routes
router.post("/", createNotification);
router.post("/mark-all-read", markAllAsRead);

// PATCH routes
router.patch("/:notificationId/read", markAsRead);

// DELETE routes
router.delete("/read", deleteReadNotifications);
router.delete("/:notificationId", deleteNotification);

export default router;

