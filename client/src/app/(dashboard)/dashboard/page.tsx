"use client";

import {
  CheckCircle,
  Package,
  Search,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import StatCard from "./StatCard";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    // Simple debounce
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(value);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="space-y-6">
      {/* Search Bar for Dashboard */}
      <motion.div
        className="mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center border-2 border-gray-200 rounded-xl bg-white max-w-md shadow-sm"
          whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
        >
          <Search className="w-5 h-5 text-gray-400 ml-4" />
          <input
            className="w-full py-3 px-4 rounded-xl bg-white focus:outline-none text-gray-700 placeholder:text-gray-400"
            placeholder="Search popular products..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mr-3 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setSearchTerm("");
                setDebouncedSearch("");
              }}
            >
              ✕
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
        <CardPopularProducts searchFilter={debouncedSearch} />
        <CardSalesSummary />
        <CardPurchaseSummary />
        <CardExpenseSummary />
        <StatCard
          title="Customer & Expenses"
          primaryIcon={<Package className="text-purple-600 w-6 h-6" />}
          dateRange="22 - 29 October 2023"
          details={[
            {
              title: "Customer Growth",
              amount: "175.00",
              changePercentage: 131,
              IconComponent: TrendingUp,
            },
            {
              title: "Expenses",
              amount: "10.00",
              changePercentage: -56,
              IconComponent: TrendingDown,
            },
          ]}
        />
        <StatCard
          title="Dues & Pending Orders"
          primaryIcon={<CheckCircle className="text-purple-600 w-6 h-6" />}
          dateRange="22 - 29 October 2023"
          details={[
            {
              title: "Dues",
              amount: "250.00",
              changePercentage: 131,
              IconComponent: TrendingUp,
            },
            {
              title: "Pending Orders",
              amount: "147",
              changePercentage: -56,
              IconComponent: TrendingDown,
            },
          ]}
        />
        <StatCard
          title="Sales & Discount"
          primaryIcon={<Tag className="text-purple-600 w-6 h-6" />}
          dateRange="22 - 29 October 2023"
          details={[
            {
              title: "Sales",
              amount: "1000.00",
              changePercentage: 20,
              IconComponent: TrendingUp,
            },
            {
              title: "Discount",
              amount: "200.00",
              changePercentage: -10,
              IconComponent: TrendingDown,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
