"use client";

import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { gsap } from "gsap";

const CardPurchaseSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [animatedValue, setAnimatedValue] = useState(0);

  const [timeframe, setTimeframe] = useState("monthly");

  // Calculate totals from purchase data
  const totalPurchases = purchaseData.reduce(
    (acc, curr) => acc + (curr.totalPurchased || 0),
    0
  );

  const averageChangePercentage =
    purchaseData.length > 0
      ? purchaseData.reduce((acc, curr, _, array) => {
          return acc + (curr.changePercentage || 0) / array.length;
        }, 0)
      : 0;

  // GSAP Animations
  useEffect(() => {
    if (!isLoading && cardRef.current) {
      const ctx = gsap.context(() => {
        // Card entrance
        gsap.fromTo(
          cardRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          }
        );

        // Header animation
        gsap.fromTo(
          headerRef.current,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out",
          }
        );

        // Value counter animation
        const counter = { value: 0 };
        gsap.to(counter, {
          value: totalPurchases,
          duration: 2,
          delay: 0.3,
          ease: "power2.out",
          onUpdate: () => {
            setAnimatedValue(counter.value);
          },
        });

        // Chart reveal animation
        gsap.fromTo(
          chartRef.current,
          { opacity: 0, scaleY: 0.8 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.8,
            delay: 0.5,
            ease: "power3.out",
            transformOrigin: "bottom",
          }
        );
      }, cardRef);

      return () => ctx.revert();
    }
  }, [isLoading, totalPurchases]);

  // Hover animation
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }

  // Format chart data
  const chartData = purchaseData.map((item) => ({
    date: item.date,
    purchases: item.totalPurchased || 0,
  }));

  return (
    <div
      ref={cardRef}
      className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading ? (
        <div className="m-5 flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div ref={headerRef}>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Purchase Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="flex justify-between items-center mb-6 px-7 mt-5">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400">Total Purchases</p>
                <span className="text-2xl font-extrabold">
                  ${animatedValue.toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`text-sm ml-2 ${
                    averageChangePercentage >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {averageChangePercentage >= 0 ? (
                    <TrendingUp className="inline w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="inline w-4 h-4 mr-1" />
                  )}
                  {Math.abs(averageChangePercentage).toFixed(2)}%
                </span>
              </div>
              <select
                className="shadow-sm border border-gray-300 bg-white p-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                value={timeframe}
                onChange={(e) => {
                  setTimeframe(e.target.value);
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            {/* CHART */}
            <div ref={chartRef}>
              <ResponsiveContainer width="100%" height={200} className="px-2">
                <LineChart
                  data={chartData}
                  margin={{ top: 0, right: 10, left: -15, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    tickFormatter={(value) => {
                      return `$${value.toLocaleString()}`;
                    }}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString("en")}`,
                      "Purchases",
                    ]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                    }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="purchases"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* FOOTER */}
          <div>
            <hr />
            <div className="flex justify-between items-center mt-4 text-sm px-7 mb-4">
              <p className="text-gray-500">{purchaseData.length || 0} periods</p>
              <p className="text-sm text-gray-500">
                Track your purchases
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;

