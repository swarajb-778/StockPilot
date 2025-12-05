"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { UserButton, useUser } from "@clerk/nextjs";
import NotificationPanel from "../NotificationPanel";
import { useGetUnreadNotificationCountQuery } from "@/state/api";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const navRef = useRef(null);
  const { user, isLoaded } = useUser();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  // Fetch unread notification count
  const { data: unreadCount } = useGetUnreadNotificationCountQuery();

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  const notificationCount = unreadCount?.count || 0;

  return (
    <motion.div
      ref={navRef}
      className="flex justify-between items-center w-full mb-7"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <motion.button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-purple-100"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Menu className="w-4 h-4" />
        </motion.button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="cursor-pointer text-gray-500" size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="cursor-pointer text-gray-500" size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          {/* Notification Bell with Panel */}
          <div className="relative">
            <motion.button
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="cursor-pointer text-gray-500" size={24} />
              {notificationCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {notificationCount > 99 ? "99+" : notificationCount}
                </motion.span>
              )}
            </motion.button>

            {/* Notification Panel */}
            <NotificationPanel
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </div>

          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />

          {/* User Profile with Clerk */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {isLoaded ? (
              <>
                <UserButton
                  afterSignOutUrl="/sign-in"
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 rounded-full ring-2 ring-purple-500/30 hover:ring-purple-500/50 transition-all",
                      userButtonPopoverCard:
                        "shadow-xl border border-gray-200",
                      userButtonPopoverActionButton:
                        "hover:bg-purple-50",
                      userButtonPopoverActionButtonText: "text-gray-700",
                      userButtonPopoverFooter: "hidden",
                    },
                  }}
                />
                <span className="font-semibold text-gray-700">
                  {user?.firstName || user?.username || "User"}
                </span>
              </>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            )}
          </motion.div>
        </div>

        <Link href="/settings">
          <motion.div
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Settings className="cursor-pointer text-gray-500" size={24} />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Navbar;
