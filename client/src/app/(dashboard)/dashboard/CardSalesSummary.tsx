"use client";

import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { gsap } from "gsap";

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [animatedValue, setAnimatedValue] = useState(0);

  const [timeframe, setTimeframe] = useState("weekly");

  const totalValueSum =
    salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;

  const averageChangePercentage =
    salesData.reduce((acc, curr, _, array) => {
      return acc + curr.changePercentage! / array.length;
    }, 0) || 0;

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

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
          value: totalValueSum / 1000000,
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
  }, [isLoading, totalValueSum]);

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

  return (
    <div 
      ref={cardRef}
      className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading ? (
        <div className="m-5 flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div ref={headerRef}>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Sales Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div ref={valueRef} className="flex justify-between items-center mb-6 px-7 mt-5">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400">Value</p>
                <span className="text-2xl font-extrabold">
                  ${animatedValue.toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}m
                </span>
                <span className="text-green-500 text-sm ml-2">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  {averageChangePercentage.toFixed(2)}%
                </span>
              </div>
              <select
                className="shadow-sm border border-gray-300 bg-white p-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
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
              <ResponsiveContainer width="100%" height={350} className="px-7">
                <BarChart
                  data={salesData}
                  margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) => {
                      return `$${(value / 1000000).toFixed(0)}m`;
                    }}
                    tick={{ fontSize: 12, dx: -1 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString("en")}`,
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
                  <Bar
                    dataKey="totalValue"
                    fill="#7c3aed"
                    barSize={10}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* FOOTER */}
          <div>
            <hr />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
              <p className="text-gray-500">{salesData.length || 0} days</p>
              <p className="text-sm">
                Highest Sales Date:{" "}
                <span className="font-bold text-purple-600">{highestValueDate}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSalesSummary;
