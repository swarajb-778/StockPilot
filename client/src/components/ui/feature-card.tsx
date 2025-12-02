"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

// Generate random characters for the hover effect
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

interface FeatureCardEvervaultProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  isDarkMode: boolean;
  index: number;
}

export function FeatureCardEvervault({
  icon: Icon,
  title,
  description,
  gradient,
  isDarkMode,
  index,
}: FeatureCardEvervaultProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const str = generateRandomString(800);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    
    // Regenerate random string on mouse move for dynamic effect
    if (isHovered) {
      const str = generateRandomString(800);
      setRandomString(str);
    }
  }

  const maskImage = useMotionTemplate`radial-gradient(200px at ${mouseX}px ${mouseY}px, white, transparent)`;
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group/card relative p-6 rounded-2xl overflow-hidden cursor-default transition-all duration-300",
        isDarkMode 
          ? "bg-slate-900/80 border border-white/[0.08]" 
          : "bg-white border border-gray-200 shadow-lg"
      )}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
    >
      {/* Corner Icons */}
      <CornerIcon className="absolute h-5 w-5 -top-2.5 -left-2.5" isDarkMode={isDarkMode} />
      <CornerIcon className="absolute h-5 w-5 -bottom-2.5 -left-2.5" isDarkMode={isDarkMode} />
      <CornerIcon className="absolute h-5 w-5 -top-2.5 -right-2.5" isDarkMode={isDarkMode} />
      <CornerIcon className="absolute h-5 w-5 -bottom-2.5 -right-2.5" isDarkMode={isDarkMode} />

      {/* Evervault-style pattern overlay on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl">
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500",
            `bg-gradient-to-r ${gradient}`
          )}
          style={{ 
            maskImage, 
            WebkitMaskImage: maskImage,
            opacity: isDarkMode ? 0.15 : 0.08
          }}
        />
        {isDarkMode && (
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-60 transition-opacity duration-500"
            style={{ maskImage, WebkitMaskImage: maskImage }}
          >
            <p className="absolute inset-0 text-[8px] leading-[10px] break-words whitespace-pre-wrap text-white/30 font-mono overflow-hidden p-2">
              {randomString}
            </p>
          </motion.div>
        )}
      </div>

      {/* Glow effect on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl",
        isDarkMode 
          ? `bg-gradient-to-br ${gradient} blur-xl`
          : ""
      )} style={{ opacity: isDarkMode ? 0.1 : 0 }} />

      {/* Border glow on hover */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500",
          "border-2",
          isDarkMode ? "border-purple-500/30" : "border-purple-300/50"
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
        
        <h3 className={cn(
          "text-xl font-bold mb-3 transition-colors duration-300",
          isDarkMode 
            ? "text-white group-hover/card:text-purple-300" 
            : "text-gray-900 group-hover/card:text-purple-600"
        )}>
          {title}
        </h3>
        
        <p className={cn(
          "leading-relaxed text-sm",
          isDarkMode ? "text-slate-400" : "text-gray-600"
        )}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// Corner icon component
function CornerIcon({ className, isDarkMode }: { className?: string; isDarkMode: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={cn(
        className,
        "transition-colors duration-300",
        isDarkMode 
          ? "text-white/20 group-hover/card:text-purple-400/50" 
          : "text-gray-300 group-hover/card:text-purple-400"
      )}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}

