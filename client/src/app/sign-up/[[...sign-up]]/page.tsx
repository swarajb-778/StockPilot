"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

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
          <h1 className="text-3xl font-bold text-white mb-2">
            Join StockPilot
          </h1>
          <p className="text-gray-400">Create your account to get started</p>
        </motion.div>

        {/* Clerk Sign Up Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-300",
                socialButtonsBlockButton:
                  "bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all",
                socialButtonsBlockButtonText: "text-white",
                dividerLine: "bg-white/20",
                dividerText: "text-gray-400",
                formFieldLabel: "text-gray-300",
                formFieldInput:
                  "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20",
                formButtonPrimary:
                  "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-500/30",
                footerActionLink: "text-purple-400 hover:text-purple-300",
                identityPreviewText: "text-white",
                identityPreviewEditButton: "text-purple-400",
                formFieldInputShowPasswordButton: "text-gray-400",
                otpCodeFieldInput: "bg-white/10 border-white/20 text-white",
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
        </motion.div>
      </motion.div>
    </div>
  );
}
