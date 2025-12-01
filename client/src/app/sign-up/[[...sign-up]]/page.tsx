"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Package, BarChart3, Bell } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"
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
              className="inline-flex items-center justify-center mb-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src="/StockPilotLogo.svg"
                alt="StockPilot Logo"
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </motion.div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Join <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">StockPilot</span>
          </h1>
          <p className="text-slate-400">Create your account to get started</p>
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
                card: "bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl",
                headerTitle: "text-white",
                headerSubtitle: "text-slate-300",
                socialButtonsBlockButton:
                  "bg-slate-800/50 border border-slate-600/50 text-white hover:bg-slate-700/50 transition-all",
                socialButtonsBlockButtonText: "text-white",
                dividerLine: "bg-slate-600",
                dividerText: "text-slate-400",
                formFieldLabel: "text-slate-300",
                formFieldInput:
                  "bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20",
                formButtonPrimary:
                  "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/30",
                footerActionLink: "text-purple-400 hover:text-purple-300",
                identityPreviewText: "text-white",
                identityPreviewEditButton: "text-purple-400",
                formFieldInputShowPasswordButton: "text-slate-400 hover:text-slate-300",
                otpCodeFieldInput: "bg-slate-800/50 border-slate-600/50 text-white",
                footer: "hidden",
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

        {/* Features highlight - Updated styling */}
        <motion.div
          className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[
            { icon: Package, text: "Track Inventory", color: "from-blue-500 to-cyan-400" },
            { icon: BarChart3, text: "Analytics", color: "from-purple-500 to-pink-500" },
            { icon: Bell, text: "Smart Alerts", color: "from-amber-500 to-orange-500" },
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              className="text-center p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-purple-500/50 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -3 }}
            >
              <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-medium text-slate-300">{feature.text}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sign in link */}
        <motion.p
          className="text-center mt-6 text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Already have an account?{" "}
          <Link href="/sign-in" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
