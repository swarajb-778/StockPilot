"use client";

import { useGetDashboardMetricsQuery, Product } from "@/state/api";
import { ShoppingBag, Package, SearchX, X, Star, TrendingUp, Boxes } from "lucide-react";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Rating from "../../(components)/Rating";
import Image from "next/image";

interface CardPopularProductsProps {
  searchFilter?: string;
}

const CardPopularProducts = ({ searchFilter = "" }: CardPopularProductsProps) => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="flex items-center gap-3">
                      {/* Product Image */}
                      {product.imageUrl ? (
                        <motion.div
                          className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 relative bg-gray-100"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          className={`w-14 h-14 rounded-lg bg-gradient-to-br ${getProductColor(product.name)} flex items-center justify-center flex-shrink-0`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Package className="w-6 h-6 text-white opacity-80" />
                        </motion.div>
                      )}
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
                        onClick={(e) => e.stopPropagation()}
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

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            getProductColor={getProductColor}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Product Details Modal Component
interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  getProductColor: (name: string) => string;
}

const ProductDetailsModal = ({ product, onClose, getProductColor }: ProductDetailsModalProps) => {
  const stockStatus = product.stockQuantity === 0 
    ? { label: "Out of Stock", color: "bg-red-100 text-red-700" }
    : product.stockQuantity <= 100
    ? { label: "Low Stock", color: "bg-orange-100 text-orange-700" }
    : { label: "In Stock", color: "bg-green-100 text-green-700" };

  const soldCount = Math.round(product.stockQuantity / 1000);

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image background */}
        <div className={`relative h-56 ${!product.imageUrl ? `bg-gradient-to-br ${getProductColor(product.name)}` : "bg-gray-100"}`}>
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Close Button */}
          <motion.button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Popular Badge */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-lg"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Popular
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-14rem)]">
          {/* Product Name & Status */}
          <div className="mb-4">
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {product.name}
            </motion.h2>
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                {stockStatus.label}
              </span>
              <span className="text-sm text-gray-500">
                {soldCount}k+ sold
              </span>
            </motion.div>
          </div>

          {/* Price & Rating */}
          <motion.div
            className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <p className="text-3xl font-bold text-purple-600">${product.price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Rating</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold text-gray-900">
                    {product.rating ? product.rating.toFixed(1) : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stock Info */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Boxes className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Stock Level</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Available Units</span>
              <span className="text-gray-700 font-semibold">{product.stockQuantity.toLocaleString()}</span>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  product.stockQuantity === 0
                    ? "bg-red-500"
                    : product.stockQuantity <= 100
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((product.stockQuantity / 1000) * 100, 100)}%` }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description || "No description available for this product. This is a popular item with high customer demand and excellent reviews."}
            </p>
          </motion.div>

          {/* Action Button */}
          <motion.button
            className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ShoppingBag className="w-5 h-5" />
            View Full Details
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
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
