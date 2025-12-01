"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Package,
  User,
  Settings,
  Check,
  CheckCheck,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import {
  useGetNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
  Notification,
} from "@/state/api";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  
  const { data: notifications = [], isLoading, refetch } = useGetNotificationsQuery({ limit: 20 });
  const { data: unreadCount } = useGetUnreadNotificationCountQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "stock_alert":
        return <Package className="w-5 h-5 text-orange-500" />;
      case "user_activity":
        return <User className="w-5 h-5 text-blue-500" />;
      case "system":
        return <Settings className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "stock_alert":
        return "bg-orange-50 border-orange-200";
      case "user_activity":
        return "bg-blue-50 border-blue-200";
      case "system":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsRead(notificationId);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const readNotifications = notifications.filter((n) => n.isRead);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount && unreadCount.count > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full">
                      {unreadCount.count} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadNotifications.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMarkAllAsRead}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                      title="Mark all as read"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[400px] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <Bell className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                <div>
                  {/* Unread Section */}
                  {unreadNotifications.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-gray-50 border-b">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Unread
                        </span>
                      </div>
                      {unreadNotifications.map((notification, index) => (
                        <NotificationItem
                          key={notification.notificationId}
                          notification={notification}
                          index={index}
                          onMarkAsRead={handleMarkAsRead}
                          onDelete={handleDelete}
                          getIcon={getNotificationIcon}
                          getColor={getNotificationColor}
                          formatTime={formatTimeAgo}
                        />
                      ))}
                    </div>
                  )}

                  {/* Read Section */}
                  {readNotifications.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-gray-50 border-b border-t">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Earlier
                        </span>
                      </div>
                      {readNotifications.map((notification, index) => (
                        <NotificationItem
                          key={notification.notificationId}
                          notification={notification}
                          index={index}
                          onMarkAsRead={handleMarkAsRead}
                          onDelete={handleDelete}
                          getIcon={getNotificationIcon}
                          getColor={getNotificationColor}
                          formatTime={formatTimeAgo}
                          isRead
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 border-t bg-gray-50">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => refetch()}
                  className="w-full py-2 text-sm text-purple-600 font-medium hover:bg-purple-50 rounded-lg transition-colors"
                >
                  Refresh Notifications
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Notification Item Component
interface NotificationItemProps {
  notification: Notification;
  index: number;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  getIcon: (type: Notification["type"]) => React.ReactNode;
  getColor: (type: Notification["type"]) => string;
  formatTime: (date: string) => string;
  isRead?: boolean;
}

const NotificationItem = ({
  notification,
  index,
  onMarkAsRead,
  onDelete,
  getIcon,
  getColor,
  formatTime,
  isRead = false,
}: NotificationItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={`px-4 py-3 border-b hover:bg-gray-50 transition-colors group ${
        isRead ? "opacity-70" : ""
      }`}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-xl ${getColor(
            notification.type
          )} flex items-center justify-center border`}
        >
          {getIcon(notification.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {notification.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                {notification.message}
              </p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {formatTime(notification.createdAt)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {!isRead && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onMarkAsRead(notification.notificationId)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-green-600 hover:bg-green-50 rounded-md transition-colors"
              >
                <Check className="w-3 h-3" />
                Mark read
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(notification.notificationId)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </motion.button>
          </div>
        </div>

        {/* Unread indicator */}
        {!isRead && (
          <div className="flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationPanel;

