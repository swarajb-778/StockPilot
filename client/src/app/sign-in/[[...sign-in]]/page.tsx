"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
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
              whileHover={{ scale: 1.1, rotate: 5 }}
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
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700/80 dark:from-white dark:to-white/80 mb-2">
            Welcome to StockPilot
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">Sign in to manage your inventory</p>
        </motion.div>

        {/* Clerk Sign In Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-neutral-200 dark:border-white/10 shadow-2xl",
                headerTitle: "text-neutral-900 dark:text-white",
                headerSubtitle: "text-neutral-600 dark:text-neutral-300",
                socialButtonsBlockButton:
                  "bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/20 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/20 transition-all",
                socialButtonsBlockButtonText: "text-neutral-900 dark:text-white",
                dividerLine: "bg-neutral-200 dark:bg-white/20",
                dividerText: "text-neutral-500 dark:text-neutral-400",
                formFieldLabel: "text-neutral-700 dark:text-neutral-300",
                formFieldInput:
                  "bg-neutral-100 dark:bg-white/10 border-neutral-200 dark:border-white/20 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-purple-500 focus:ring-purple-500/20",
                formButtonPrimary:
                  "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-500/30",
                footerActionLink: "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300",
                identityPreviewText: "text-neutral-900 dark:text-white",
                identityPreviewEditButton: "text-purple-600 dark:text-purple-400",
                formFieldInputShowPasswordButton: "text-neutral-500 dark:text-neutral-400",
                otpCodeFieldInput: "bg-neutral-100 dark:bg-white/10 border-neutral-200 dark:border-white/20 text-neutral-900 dark:text-white",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "iconButton",
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/dashboard"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
