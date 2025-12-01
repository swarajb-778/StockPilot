"use client";

import { useMotionValue, useMotionTemplate, motion, useSpring } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// Character set for random string generation
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Corner Icon Component
const CornerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={cn("h-5 w-5", className)}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

interface FeatureCardEvervaultProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  isDarkMode: boolean;
  index: number;
}

export const FeatureCardEvervault = ({
  icon: Icon,
  title,
  description,
  gradient,
  isDarkMode,
  index,
}: FeatureCardEvervaultProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const [randomString, setRandomString] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // Smooth spring animation for mouse position
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  useEffect(() => {
    setRandomString(generateRandomString(2000));
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setRandomString(generateRandomString(2000));
  };

  const maskImage = useMotionTemplate`radial-gradient(200px at ${springX}px ${springY}px, white, transparent)`;

  // Get gradient colors for the card hover effect
  const getGradientColors = () => {
    const gradientMap: Record<string, string> = {
      "from-blue-500 to-cyan-400": "from-blue-500/30 to-cyan-400/30",
      "from-purple-500 to-pink-500": "from-purple-500/30 to-pink-500/30",
      "from-amber-500 to-orange-500": "from-amber-500/30 to-orange-500/30",
      "from-emerald-500 to-teal-400": "from-emerald-500/30 to-teal-400/30",
      "from-rose-500 to-red-500": "from-rose-500/30 to-red-500/30",
      "from-indigo-500 to-violet-500": "from-indigo-500/30 to-violet-500/30",
    };
    return gradientMap[gradient] || "from-purple-500/30 to-pink-500/30";
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative p-6 rounded-2xl overflow-hidden group cursor-default",
        "border-2 transition-all duration-500",
        isDarkMode
          ? "bg-slate-900/50 border-slate-700/50 hover:border-purple-500/50"
          : "bg-white border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl"
      )}
    >
      {/* Corner Icons */}
      <CornerIcon
        className={cn(
          "absolute -top-2.5 -left-2.5 transition-all duration-300",
          isDarkMode ? "text-slate-600" : "text-gray-300",
          isHovered && "text-purple-500 scale-110"
        )}
      />
      <CornerIcon
        className={cn(
          "absolute -top-2.5 -right-2.5 transition-all duration-300",
          isDarkMode ? "text-slate-600" : "text-gray-300",
          isHovered && "text-purple-500 scale-110"
        )}
      />
      <CornerIcon
        className={cn(
          "absolute -bottom-2.5 -left-2.5 transition-all duration-300",
          isDarkMode ? "text-slate-600" : "text-gray-300",
          isHovered && "text-purple-500 scale-110"
        )}
      />
      <CornerIcon
        className={cn(
          "absolute -bottom-2.5 -right-2.5 transition-all duration-300",
          isDarkMode ? "text-slate-600" : "text-gray-300",
          isHovered && "text-purple-500 scale-110"
        )}
      />

      {/* Animated background pattern - only visible on hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <motion.div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            `bg-gradient-to-br ${getGradientColors()}`
          )}
          style={{ maskImage, WebkitMaskImage: maskImage }}
        />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <p className="absolute inset-0 text-[8px] leading-tight break-words whitespace-pre-wrap text-purple-500/50 font-mono font-bold p-2">
            {randomString}
          </p>
        </motion.div>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          isDarkMode
            ? "bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"
            : "bg-gradient-to-br from-purple-200/20 via-transparent to-pink-200/20"
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-lg",
            `bg-gradient-to-br ${gradient}`
          )}
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-7 h-7 text-white" strokeWidth={2} />
        </motion.div>

        <h3
          className={cn(
            "text-xl font-bold mb-3 transition-colors duration-300",
            isDarkMode
              ? "text-white group-hover:text-purple-300"
              : "text-gray-900 group-hover:text-purple-600"
          )}
        >
          {title}
        </h3>

        <p className={cn("leading-relaxed", isDarkMode ? "text-slate-300" : "text-gray-600")}>
          {description}
        </p>
      </div>

      {/* Bottom gradient line on hover */}
      <motion.div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100",
          `bg-gradient-to-r ${gradient}`,
          "transition-opacity duration-300"
        )}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default FeatureCardEvervault;

