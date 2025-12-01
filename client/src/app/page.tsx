"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun, Sparkles, Package, BarChart3, Bell, Users, TrendingUp, Shield, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { FeatureCardEvervault } from "@/components/ui/feature-card";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Elegant floating shapes component
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute pointer-events-none", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.1]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

// Stat Counter Component with animation
const StatCounter = ({
  value,
  label,
  delay,
  isDarkMode,
}: {
  value: string;
  label: string;
  delay: number;
  isDarkMode: boolean;
}) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    if (counterRef.current && isInView) {
      gsap.fromTo(
        counterRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: delay,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isInView, delay]);

  return (
    <div ref={counterRef} className="text-center" style={{ opacity: 0 }}>
      <motion.div
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {value}
      </motion.div>
      <div className={cn("mt-1 font-medium", isDarkMode ? "text-slate-300" : "text-gray-600")}>
        {label}
      </div>
    </div>
  );
};

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Initialize dark mode from localStorage
  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("isDarkMode");
    if (savedMode !== null) {
      setIsDarkMode(savedMode === "true");
    } else {
      setIsDarkMode(true);
    }
  }, []);

  // Sync dark mode with localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("isDarkMode", String(isDarkMode));
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDarkMode, mounted]);

  // GSAP Hero animation
  useEffect(() => {
    if (heroRef.current && mounted) {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-badge",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          ".hero-title",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-subtitle",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-buttons",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
    }
  }, [mounted]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!isLoaded || !mounted) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", isDarkMode ? "bg-[#030303]" : "bg-gray-50")}>
        <motion.div
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const features = [
    {
      icon: Package,
      title: "Product Management",
      description: "Track inventory levels, manage stock, and never run out of products again.",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: BarChart3,
      title: "Sales Analytics",
      description: "Get insights into your sales performance with beautiful charts and reports.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Receive notifications for low stock, new orders, and important updates.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Invite team members and manage roles with granular permissions.",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      icon: TrendingUp,
      title: "Expense Tracking",
      description: "Monitor expenses by category and optimize your business spending.",
      gradient: "from-rose-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with encrypted data and secure authentication.",
      gradient: "from-indigo-500 to-violet-500",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "1M+", label: "Products Tracked" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-500 overflow-hidden",
        isDarkMode ? "bg-[#030303] text-white" : "bg-gray-50 text-gray-900"
      )}
    >
      {/* Elegant floating shapes background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlay */}
        <div
          className={cn(
            "absolute inset-0 blur-3xl",
            isDarkMode
              ? "bg-gradient-to-br from-purple-500/[0.03] via-transparent to-pink-500/[0.03]"
              : "bg-gradient-to-br from-purple-500/[0.05] via-transparent to-pink-500/[0.05]"
          )}
        />

        {/* Elegant shapes - only show in dark mode for premium feel */}
        {isDarkMode && (
          <>
            <ElegantShape
              delay={0.3}
              width={600}
              height={140}
              rotate={12}
              gradient="from-purple-500/[0.12]"
              className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
            />
            <ElegantShape
              delay={0.5}
              width={500}
              height={120}
              rotate={-15}
              gradient="from-pink-500/[0.12]"
              className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
            />
            <ElegantShape
              delay={0.4}
              width={300}
              height={80}
              rotate={-8}
              gradient="from-blue-500/[0.12]"
              className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
            />
            <ElegantShape
              delay={0.6}
              width={200}
              height={60}
              rotate={20}
              gradient="from-cyan-500/[0.12]"
              className="right-[15%] md:right-[20%] top-[8%] md:top-[12%]"
            />
            <ElegantShape
              delay={0.7}
              width={150}
              height={40}
              rotate={-25}
              gradient="from-violet-500/[0.12]"
              className="left-[20%] md:left-[25%] top-[3%] md:top-[8%]"
            />
          </>
        )}

        {/* Light mode animated blobs */}
        {!isDarkMode && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[120px] bg-purple-400/10"
              style={{ y: backgroundY }}
              animate={{ x: [0, 100, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] bg-blue-400/10"
              animate={{ x: [0, -80, 0], y: [0, -50, 0], scale: [1.2, 1, 1.2] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      {/* Top fade gradient for depth */}
      {isDarkMode && (
        <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030303] to-transparent pointer-events-none z-20" />
      )}

      {/* Navigation */}
      <motion.nav
        className={cn(
          "sticky top-0 z-50 px-6 py-4 backdrop-blur-xl",
          isDarkMode
            ? "bg-[#030303]/80 border-b border-white/[0.05]"
            : "bg-white/80 border-b border-gray-200/50"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} transition={{ type: "spring", stiffness: 400 }}>
              <Image src="/StockPilotLogo.svg" alt="StockPilot Logo" width={44} height={44} className="w-11 h-11" />
            </motion.div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
              StockPilot
            </span>
          </motion.div>

          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className={cn(
                "p-2.5 rounded-xl transition-all duration-300",
                isDarkMode ? "bg-white/[0.05] hover:bg-white/[0.1] text-yellow-400" : "bg-gray-100 hover:bg-gray-200 text-slate-700"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 180 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <Link href="/sign-in">
              <motion.button
                className={cn(
                  "px-5 py-2.5 font-semibold rounded-xl transition-all duration-300",
                  isDarkMode ? "text-slate-300 hover:text-white hover:bg-white/[0.08]" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </Link>
            <Link href="/sign-up">
              <motion.button
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main ref={heroRef} className="relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              className={cn(
                "hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border backdrop-blur-sm",
                isDarkMode
                  ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                  : "bg-purple-100 border-purple-200 text-purple-700"
              )}
              whileHover={{ scale: 1.05 }}
            >
              <Circle className={cn("h-2 w-2", isDarkMode ? "fill-purple-400" : "fill-purple-600")} />
              <span className="tracking-wide">Inventory Management Made Simple</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className={cn("bg-clip-text text-transparent", isDarkMode ? "bg-gradient-to-b from-white to-white/80" : "bg-gradient-to-b from-gray-900 to-gray-700")}>
                Take Control of Your
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                Inventory
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={cn(
                "hero-subtitle text-base sm:text-lg md:text-xl mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4",
                isDarkMode ? "text-slate-300" : "text-gray-600"
              )}
            >
              Track products, monitor sales, manage purchases, and analyze expenses all in one powerful dashboard.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <motion.button
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/sign-in">
                <motion.button
                  className={cn(
                    "px-8 py-4 rounded-2xl font-semibold text-lg border-2 transition-all duration-300",
                    isDarkMode
                      ? "bg-slate-800/50 hover:bg-slate-700/50 text-white border-slate-600 hover:border-purple-500"
                      : "bg-white hover:bg-gray-50 text-gray-900 border-gray-300 hover:border-purple-400 shadow-lg"
                  )}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </Link>
            </div>

            {/* Trust indicators */}
            <motion.div
              className={cn("mt-12 flex flex-wrap items-center justify-center gap-6 text-sm font-medium", isDarkMode ? "text-slate-400" : "text-gray-500")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {["No credit card required", "14-day free trial", "Cancel anytime"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Features Grid with Evervault Cards */}
          <div className="mt-28 md:mt-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCardEvervault
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                isDarkMode={isDarkMode}
                index={index}
              />
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            className={cn(
              "mt-28 p-10 rounded-3xl backdrop-blur-sm",
              isDarkMode
                ? "bg-gradient-to-br from-purple-900/20 via-slate-900/40 to-pink-900/20 border-2 border-white/[0.05]"
                : "bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-200/50 shadow-xl"
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatCounter key={stat.label} value={stat.value} label={stat.label} delay={index * 0.1} isDarkMode={isDarkMode} />
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Bottom fade gradient for depth */}
      {isDarkMode && (
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-10" />
      )}

      {/* Footer */}
      <footer
        className={cn(
          "relative z-10 px-6 py-10 mt-20 border-t backdrop-blur-sm",
          isDarkMode ? "border-white/[0.05] bg-[#030303]/50" : "border-gray-200 bg-white/50"
        )}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
            <Image src="/StockPilotLogo.svg" alt="StockPilot Logo" width={32} height={32} className="w-8 h-8" />
            <span className={cn("font-semibold", isDarkMode ? "text-slate-400" : "text-gray-600")}>StockPilot</span>
          </motion.div>
          <p className={isDarkMode ? "text-slate-500" : "text-gray-500"}>&copy; 2025 StockPilot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
