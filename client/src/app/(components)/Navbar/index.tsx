"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Bell, Menu, Moon, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const navRef = useRef(null);
  const searchRef = useRef(null);

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

  useEffect(() => {
    if (searchRef.current) {
      gsap.fromTo(
        searchRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          ease: "back.out(1.7)",
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

        <motion.div
          ref={searchRef}
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <motion.input
            type="search"
            placeholder="Search products & inventory..."
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-purple-500 transition-all"
            whileFocus={{
              borderColor: "#9333ea",
              boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.1)",
            }}
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </motion.div>
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
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <motion.span
              className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              3
            </motion.span>
          </motion.div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center"
              whileHover={{
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
              }}
              transition={{ duration: 0.3 }}
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-semibold">Admin</span>
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
