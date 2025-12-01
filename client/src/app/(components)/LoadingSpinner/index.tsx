"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const LoadingSpinner = ({ size = "md", color = "purple" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const colorClasses = {
    purple: "border-purple-500",
    blue: "border-blue-500",
    green: "border-green-500",
    gray: "border-gray-500",
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-2 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.purple} border-t-transparent`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Skeleton loading component
export const Skeleton = ({
  className = "",
  variant = "rectangular",
}: {
  className?: string;
  variant?: "rectangular" | "circular" | "text";
}) => {
  const variantClasses = {
    rectangular: "rounded-lg",
    circular: "rounded-full",
    text: "rounded h-4",
  };

  return (
    <motion.div
      className={`bg-gray-200 ${variantClasses[variant]} ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Card skeleton for product cards
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4">
      <div className="flex flex-col items-center">
        <Skeleton className="w-32 h-32 mb-4" variant="rectangular" />
        <Skeleton className="w-24 h-5 mb-2" variant="text" />
        <Skeleton className="w-16 h-6 mb-2" variant="text" />
        <Skeleton className="w-20 h-4" variant="text" />
      </div>
    </div>
  );
};

// Table row skeleton
export const TableRowSkeleton = ({ columns = 4 }: { columns?: number }) => {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-100">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          className="flex-1 h-4"
          variant="text"
        />
      ))}
    </div>
  );
};

// Dashboard card skeleton
export const DashboardCardSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5">
      <Skeleton className="w-32 h-5 mb-4" variant="text" />
      <div className="space-y-3">
        <Skeleton className="w-full h-4" variant="text" />
        <Skeleton className="w-3/4 h-4" variant="text" />
        <Skeleton className="w-1/2 h-4" variant="text" />
      </div>
    </div>
  );
};

// Stats skeleton
export const StatSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-4">
      <Skeleton className="w-20 h-4 mb-2" variant="text" />
      <Skeleton className="w-28 h-8" variant="text" />
    </div>
  );
};

// Full page loading skeleton
export const PageLoadingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-4"
    >
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="w-48 h-8" variant="text" />
        <Skeleton className="w-32 h-10" variant="rectangular" />
      </div>
      
      {/* Search bar skeleton */}
      <Skeleton className="w-80 h-12" variant="rectangular" />
      
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
