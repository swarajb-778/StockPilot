import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all notifications (with optional filtering)
export const getNotifications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { type, isRead, limit } = req.query;

    const whereClause: {
      type?: string;
      isRead?: boolean;
    } = {};

    if (type) {
      whereClause.type = type.toString();
    }

    if (isRead !== undefined) {
      whereClause.isRead = isRead === "true";
    }

    const notifications = await prisma.notifications.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      take: limit ? parseInt(limit.toString()) : 50,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error retrieving notifications" });
  }
};

// Get unread notification count
export const getUnreadCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const count = await prisma.notifications.count({
      where: {
        isRead: false,
      },
    });

    res.json({ count });
  } catch (error) {
    console.error("Error getting unread count:", error);
    res.status(500).json({ message: "Error getting unread count" });
  }
};

// Create a new notification
export const createNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { type, title, message, userId } = req.body;

    const notification = await prisma.notifications.create({
      data: {
        type,
        title,
        message,
        userId: userId || null,
      },
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Error creating notification" });
  }
};

// Mark a notification as read
export const markAsRead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { notificationId } = req.params;

    const notification = await prisma.notifications.update({
      where: {
        notificationId,
      },
      data: {
        isRead: true,
      },
    });

    res.json(notification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Error marking notification as read" });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await prisma.notifications.updateMany({
      where: {
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({ message: "Error marking all notifications as read" });
  }
};

// Delete a notification
export const deleteNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { notificationId } = req.params;

    await prisma.notifications.delete({
      where: {
        notificationId,
      },
    });

    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Error deleting notification" });
  }
};

// Delete all read notifications
export const deleteReadNotifications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await prisma.notifications.deleteMany({
      where: {
        isRead: true,
      },
    });

    res.json({ message: `Deleted ${result.count} read notifications` });
  } catch (error) {
    console.error("Error deleting read notifications:", error);
    res.status(500).json({ message: "Error deleting read notifications" });
  }
};

// Check for low stock and create alerts
export const checkLowStockAlerts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const threshold = parseInt(req.query.threshold?.toString() || "10");

    const lowStockProducts = await prisma.products.findMany({
      where: {
        stockQuantity: {
          lte: threshold,
        },
      },
    });

    const notifications = [];

    for (const product of lowStockProducts) {
      // Check if we already have a recent alert for this product
      const existingAlert = await prisma.notifications.findFirst({
        where: {
          type: "stock_alert",
          message: {
            contains: product.productId,
          },
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      });

      if (!existingAlert) {
        const notification = await prisma.notifications.create({
          data: {
            type: "stock_alert",
            title: "Low Stock Alert",
            message: `${product.name} is running low on stock (${product.stockQuantity} remaining). Product ID: ${product.productId}`,
          },
        });
        notifications.push(notification);
      }
    }

    res.json({
      message: `Created ${notifications.length} new stock alerts`,
      alerts: notifications,
    });
  } catch (error) {
    console.error("Error checking low stock:", error);
    res.status(500).json({ message: "Error checking low stock alerts" });
  }
};

