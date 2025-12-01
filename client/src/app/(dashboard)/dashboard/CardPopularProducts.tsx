"use client";

import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag, Package, SearchX } from "lucide-react";
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Rating from "../../(components)/Rating";

interface CardPopularProductsProps {
  searchFilter?: string;
}

const CardPopularProducts = ({ searchFilter = "" }: CardPopularProductsProps) => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!dashboardMetrics?.popularProducts) return [];
    if (!searchFilter) return dashboardMetrics.popularProducts;
    
    return dashboardMetrics.popularProducts.filter((product) =>
      product.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [dashboardMetrics?.popularProducts, searchFilter]);

  // Generate a consistent color based on product name
  const getProductColor = (name: string) => {
    const colors = [
      "from-purple-400 to-purple-600",
      "from-blue-400 to-blue-600",
      "from-green-400 to-green-600",
      "from-pink-400 to-pink-600",
      "from-indigo-400 to-indigo-600",
      "from-teal-400 to-teal-600",
      "from-orange-400 to-orange-600",
      "from-cyan-400 to-cyan-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16 overflow-hidden">
      {isLoading ? (
        <div className="m-5 flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-7 pt-5 pb-2">
            <h3 className="text-lg font-semibold">Popular Products</h3>
            {searchFilter && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
              >
                {filteredProducts.length} results
              </motion.span>
            )}
          </div>
          <hr />
          <div className="overflow-auto h-full">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.productId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between gap-3 px-5 py-4 border-b hover:bg-gray-50 transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Product Image Placeholder */}
                      <motion.div
                        className={`w-14 h-14 rounded-lg bg-gradient-to-br ${getProductColor(product.name)} flex items-center justify-center flex-shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Package className="w-6 h-6 text-white opacity-80" />
                      </motion.div>
                      <div className="flex flex-col justify-between gap-1">
                        <div className="font-bold text-gray-700">
                          {searchFilter ? (
                            <HighlightText
                              text={product.name}
                              highlight={searchFilter}
                            />
                          ) : (
                            product.name
                          )}
                        </div>
                        <div className="flex text-sm items-center">
                          <span className="font-bold text-purple-500 text-xs">
                            ${product.price}
                          </span>
                          <span className="mx-2">|</span>
                          <Rating rating={product.rating || 0} />
                        </div>
                      </div>
                    </div>

                    <div className="text-xs flex items-center">
                      <motion.button
                        className="p-2 rounded-full bg-purple-100 text-purple-600 mr-2 hover:bg-purple-200 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </motion.button>
                      {Math.round(product.stockQuantity / 1000)}k Sold
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-gray-400"
                >
                  <SearchX className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-sm">No products match your search</p>
                  <p className="text-xs mt-1">Try a different keyword</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

// Helper component to highlight search terms
const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="bg-yellow-200 text-yellow-800 rounded px-0.5">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

export default CardPopularProducts;
