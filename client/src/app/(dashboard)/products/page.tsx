"use client";

import { useCreateProductMutation, useGetProductsQuery, Product } from "@/state/api";
import { 
  PlusCircleIcon, SearchIcon, Package, X, Star, Edit, Trash2, BarChart3,
  Upload, ImagePlus, Loader2
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import PageTransition from "@/app/(components)/PageTransition";
import Image from "next/image";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
  description?: string;
  image?: File | null;
};

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Debounce search term to prevent excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data: products,
    isLoading,
    isError,
    isFetching,
  } = useGetProductsQuery(debouncedSearchTerm);

  const [createProduct] = useCreateProductMutation();
  
  const handleCreateProduct = async (productData: ProductFormData) => {
    try {
      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price.toString());
      formData.append("stockQuantity", productData.stockQuantity.toString());
      formData.append("rating", productData.rating.toString());
      if (productData.description) {
        formData.append("description", productData.description);
      }
      if (productData.image) {
        formData.append("image", productData.image);
      }
      
      // Use fetch directly for FormData
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      
      // Refresh the products list
      window.location.reload();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="mx-auto pb-5 w-full">
        {/* SEARCH BAR */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center border-2 border-gray-200 rounded-xl bg-white max-w-lg shadow-sm"
            whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
          >
            <SearchIcon className="w-5 h-5 text-gray-400 ml-4" />
            <input
              className="w-full py-3 px-4 rounded-xl bg-white focus:outline-none text-gray-700 placeholder:text-gray-400"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mr-3 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setSearchTerm("")}
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
            {isFetching && searchTerm && (
              <div className="mr-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
              </div>
            )}
          </motion.div>
          {debouncedSearchTerm && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-500 mt-2 ml-1"
            >
              Found {products.length} product{products.length !== 1 ? "s" : ""} matching &quot;{debouncedSearchTerm}&quot;
            </motion.p>
          )}
        </motion.div>

        {/* HEADER BAR */}
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Header name="Products" />
          <motion.button
            className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors shadow-lg shadow-purple-500/20"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(124, 58, 237, 0.35)" }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" /> Create Product
          </motion.button>
        </motion.div>

        {/* BODY PRODUCTS LIST */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <AnimatePresence mode="popLayout">
            {products?.map((product) => (
              <motion.div
                key={product.productId}
                className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
                layout
                onClick={() => setSelectedProduct(product)}
              >
                <div className="flex flex-col items-center">
                  {/* Product Image */}
                  {product.imageUrl ? (
                    <div className="w-32 h-32 rounded-xl overflow-hidden mb-4 relative">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <motion.div
                      className={`w-32 h-32 rounded-xl bg-gradient-to-br ${getProductColor(product.name)} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Package className="w-12 h-12 text-white opacity-80" />
                    </motion.div>
                  )}
                  <h3 className="text-lg text-gray-900 font-semibold text-center">
                    {debouncedSearchTerm ? (
                      <HighlightText text={product.name} highlight={debouncedSearchTerm} />
                    ) : (
                      product.name
                    )}
                  </h3>
                  <p className="text-purple-600 font-bold text-lg mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="text-sm text-gray-600 mt-1">
                    Stock: {product.stockQuantity.toLocaleString()}
                  </div>
                  {product.rating && (
                    <div className="flex items-center mt-2">
                      <Rating rating={product.rating} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {products?.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Package className="w-20 h-20 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No products found</p>
            {debouncedSearchTerm && (
              <p className="text-gray-400 text-sm mt-1">
                Try a different search term or{" "}
                <button
                  className="text-purple-600 hover:underline"
                  onClick={() => setSearchTerm("")}
                >
                  clear the search
                </button>
              </p>
            )}
          </motion.div>
        )}

        {/* CREATE MODAL */}
        <AnimatePresence>
          {isModalOpen && (
            <CreateProductModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onCreate={handleCreateProduct}
            />
          )}
        </AnimatePresence>

        {/* PRODUCT DETAILS MODAL */}
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
    </PageTransition>
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

// Product Details Modal Component
interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  getProductColor: (name: string) => string;
}

const ProductDetailsModal = ({ product, onClose, getProductColor }: ProductDetailsModalProps) => {
  const stockStatus = product.stockQuantity === 0 
    ? { label: "Out of Stock", color: "bg-red-100 text-red-700" }
    : product.stockQuantity <= 10
    ? { label: "Low Stock", color: "bg-orange-100 text-orange-700" }
    : { label: "In Stock", color: "bg-green-100 text-green-700" };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient/image background */}
        <div className={`relative h-48 ${!product.imageUrl ? `bg-gradient-to-br ${getProductColor(product.name)}` : ""} p-6`}>
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <motion.button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
          
          {/* Floating Product Icon */}
          <motion.div
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${getProductColor(product.name)} flex items-center justify-center`}>
                <Package className="w-10 h-10 text-white" />
              </div>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="pt-16 pb-6 px-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {/* Product Name & Status */}
          <div className="text-center mb-6">
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {product.name}
            </motion.h2>
            <motion.span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {stockStatus.label}
            </motion.span>
          </div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-3 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-600 font-medium mb-1">Price</p>
              <p className="text-2xl font-bold text-purple-700">${product.price.toFixed(2)}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-sm text-blue-600 font-medium mb-1">In Stock</p>
              <p className="text-2xl font-bold text-blue-700">{product.stockQuantity.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <p className="text-sm text-yellow-600 font-medium mb-1">Rating</p>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <p className="text-2xl font-bold text-yellow-700">
                  {product.rating ? product.rating.toFixed(1) : "N/A"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            className="bg-gray-50 rounded-xl p-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-gray-500 mb-2">Description</p>
            <p className="text-gray-700">
              {product.description || "No description available for this product."}
            </p>
          </motion.div>

          {/* Stock Progress Bar */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Stock Level</span>
              <span className="text-gray-700 font-medium">{product.stockQuantity} / 1000</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  product.stockQuantity === 0
                    ? "bg-red-500"
                    : product.stockQuantity <= 10
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((product.stockQuantity / 1000) * 100, 100)}%` }}
                transition={{ delay: 0.9, duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit className="w-4 h-4" />
              Edit Product
            </motion.button>
            <motion.button
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </motion.button>
            <motion.button
              className="flex items-center justify-center py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Create Product Modal Component
interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: ProductFormData) => void;
}

const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModalProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | null) => {
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }
      
      setFormData({ ...formData, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onCreate(formData);
      onClose();
      setFormData({ name: "", price: 0, stockQuantity: 0, rating: 0, description: "", image: null });
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

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
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Package className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">Create New Product</h2>
          </div>
          <motion.button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                isDragging
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {imagePreview ? (
                <div className="relative">
                  <div className="relative w-32 h-32 mx-auto rounded-xl overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <motion.button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-0 right-1/2 translate-x-16 -translate-y-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                  <p className="text-sm text-gray-500 mt-3">{formData.image?.name}</p>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                    <ImagePlus className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-gray-600 mb-2">
                    Drag and drop an image here, or{" "}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports: JPEG, PNG, GIF, WebP (Max 5MB)
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                className="hidden"
              />
            </div>
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="0.00"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="0"
                value={formData.stockQuantity || ""}
                onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Rating (0-5)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex items-center gap-1 min-w-[60px]">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{formData.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              placeholder="Enter product description..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircleIcon className="w-4 h-4" />
                  Create Product
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Products;
