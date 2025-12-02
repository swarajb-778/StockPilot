"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
  index: number;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
  index,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  const linkRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (linkRef.current) {
      gsap.fromTo(
        linkRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.08,
          ease: "power3.out",
        }
      );
    }
  }, [index]);

  // Subtle hover effect using GSAP
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <Link href={href}>
      <motion.div
        ref={linkRef}
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-purple-500 hover:bg-purple-100 gap-3 transition-colors relative overflow-hidden ${
          isActive ? "bg-purple-200 text-white" : ""
        }
      `}
        whileHover={{ x: isCollapsed ? 0 : 10 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {isActive && (
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600"
            layoutId="activeIndicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <div ref={iconRef}>
          <Icon className="w-6 h-6 !text-gray-700" />
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="font-medium text-gray-700 whitespace-nowrap overflow-hidden"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const logoRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        }
      );
    }
  }, []);

  // Sidebar collapse/expand animation
  useEffect(() => {
    if (sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        width: isSidebarCollapsed ? "4rem" : "16rem",
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [isSidebarCollapsed]);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <motion.div
      ref={sidebarRef}
      className={sidebarClassNames}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <motion.div
          ref={logoRef}
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/StockPilotLogo.svg"
            alt="StockPilot Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </motion.div>

        <AnimatePresence>
          {!isSidebarCollapsed && (
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="font-extrabold text-xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
            >
              StockPilot
            </motion.h1>
          )}
        </AnimatePresence>

        <motion.button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-purple-100"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="w-4 h-4" />
        </motion.button>
      </div>

      {/* LINKS */}
      <div ref={linksContainerRef} className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
          index={0}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
          index={1}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
          index={2}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
          index={3}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
          index={4}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
          index={5}
        />
      </div>

      {/* FOOTER */}
      <AnimatePresence>
        {!isSidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-10"
          >
            <p className="text-center text-xs text-gray-500">
              &copy; 2025 StockPilot
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;
