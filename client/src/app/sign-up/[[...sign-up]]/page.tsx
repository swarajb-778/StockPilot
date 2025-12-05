"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { ClerkAuthProvider } from "@/app/providers";

function SignUpContent() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for dark mode preference
    const savedMode = localStorage.getItem("isDarkMode");
    if (savedMode !== null) {
      const isDark = savedMode === "true";
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Default to dark mode
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-neutral-950' : 'bg-gray-50'}`}>
      {/* Animated background paths */}
      <BackgroundPaths />

      {/* Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo and Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 mb-4 shadow-lg shadow-purple-500/30 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src="/StockPilotLogo.svg"
                alt="StockPilot Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </motion.div>
          </Link>
          <h1 className={`text-3xl font-bold mb-2 ${
            isDarkMode 
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400' 
              : 'text-gray-900'
          }`}>
            Join StockPilot
          </h1>
          <p className={isDarkMode ? 'text-neutral-400' : 'text-gray-600'}>
            Create your account to get started
          </p>
        </motion.div>

        {/* CardSpotlight wrapper for Clerk Sign Up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardSpotlight
            className={`p-0 rounded-2xl overflow-hidden ${
              isDarkMode 
                ? 'bg-neutral-900/95 border-neutral-800' 
                : 'bg-white/95 border-gray-200'
            }`}
            radius={400}
            color={isDarkMode ? "#262626" : "#e5e5e5"}
          >
            <SignUp
              appearance={{
                elements: {
                  rootBox: "mx-auto relative z-10",
                  card: "bg-transparent shadow-none border-0 p-6",
                  headerTitle: isDarkMode ? "text-white" : "text-gray-900",
                  headerSubtitle: isDarkMode ? "text-neutral-400" : "text-gray-500",
                  socialButtonsBlockButton: isDarkMode
                    ? "bg-neutral-800/50 border border-neutral-700 text-white hover:bg-neutral-700/50 transition-all"
                    : "bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100 transition-all",
                  socialButtonsBlockButtonText: isDarkMode ? "text-white" : "text-gray-900",
                  dividerLine: isDarkMode ? "bg-neutral-700" : "bg-gray-200",
                  dividerText: isDarkMode ? "text-neutral-500" : "text-gray-500",
                  formFieldLabel: isDarkMode ? "text-neutral-300" : "text-gray-700",
                  formFieldInput: isDarkMode
                    ? "bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20",
                  formButtonPrimary:
                    "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white transition-all shadow-lg shadow-purple-500/25",
                  footerActionLink: isDarkMode 
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-purple-600 hover:text-purple-500",
                  footerActionText: isDarkMode ? "text-neutral-400" : "text-gray-500",
                  identityPreviewText: isDarkMode ? "text-white" : "text-gray-900",
                  identityPreviewEditButton: isDarkMode ? "text-purple-400" : "text-purple-600",
                  formFieldInputShowPasswordButton: isDarkMode ? "text-neutral-500" : "text-gray-500",
                  otpCodeFieldInput: isDarkMode
                    ? "bg-neutral-800/50 border-neutral-700 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-900",
                  footer: "bg-transparent",
                  footerAction: "bg-transparent",
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                  socialButtonsVariant: "iconButton",
                },
              }}
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              forceRedirectUrl="/dashboard"
            />
          </CardSpotlight>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <ClerkAuthProvider>
      <SignUpContent />
    </ClerkAuthProvider>
  );
}
