"use client";

import { useGetProductsQuery, Product } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PageTransition from "@/app/(components)/PageTransition";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Search,
  X,
  Package,
  Filter,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const columns: GridColDef[] = [
  { 
    field: "productId", 
    headerName: "ID", 
    width: 100,
    renderCell: (params) => (
      <span className="font-mono text-sm text-gray-500">{params.value?.slice(0, 8)}...</span>
    ),
  },
  { 
    field: "name", 
    headerName: "Product Name", 
    width: 220,
    renderCell: (params) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
          <Package className="w-4 h-4 text-white" />
        </div>
        <span className="font-medium">{params.value}</span>
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    type: "number",
    renderCell: (params) => (
      <span className="font-semibold text-purple-600">${params.row.price?.toFixed(2)}</span>
    ),
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 120,
    type: "number",
    renderCell: (params) => (
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span>{params.row.rating ? params.row.rating.toFixed(1) : "N/A"}</span>
      </div>
    ),
  },
  {
    field: "stockQuantity",
    headerName: "Stock",
    width: 150,
    type: "number",
    renderCell: (params) => {
      const stock = params.value as number;
      let bgColor = "bg-green-100 text-green-700";
      let icon = <CheckCircle className="w-4 h-4" />;
      
      if (stock === 0) {
        bgColor = "bg-red-100 text-red-700";
        icon = <AlertTriangle className="w-4 h-4" />;
      } else if (stock <= 10) {
        bgColor = "bg-orange-100 text-orange-700";
        icon = <AlertTriangle className="w-4 h-4" />;
      }
      
      return (
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${bgColor}`}>
          {icon}
          <span>{stock.toLocaleString()}</span>
        </div>
      );
    },
  },
];

type FilterType = "all" | "low_stock" | "out_of_stock" | "high_value";

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Filter products based on search term and active filter
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let filtered = [...products];
    
    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerSearch) ||
          product.productId.toLowerCase().includes(lowerSearch)
      );
    }
    
    // Apply category filter
    switch (activeFilter) {
      case "low_stock":
        filtered = filtered.filter((p) => p.stockQuantity > 0 && p.stockQuantity <= 10);
        break;
      case "out_of_stock":
        filtered = filtered.filter((p) => p.stockQuantity === 0);
        break;
      case "high_value":
        filtered = filtered.filter((p) => p.price >= 100);
        break;
    }
    
    // Apply price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    return filtered;
  }, [products, searchTerm, activeFilter, priceRange]);

  // Stats
  const stats = useMemo(() => {
    if (!products) return { total: 0, lowStock: 0, outOfStock: 0, highValue: 0 };
    return {
      total: products.length,
      lowStock: products.filter((p) => p.stockQuantity > 0 && p.stockQuantity <= 10).length,
      outOfStock: products.filter((p) => p.stockQuantity === 0).length,
      highValue: products.filter((p) => p.price >= 100).length,
    };
  }, [products]);

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

  const filterButtons: { key: FilterType; label: string; count: number; color: string }[] = [
    { key: "all", label: "All Products", count: stats.total, color: "purple" },
    { key: "low_stock", label: "Low Stock", count: stats.lowStock, color: "orange" },
    { key: "out_of_stock", label: "Out of Stock", count: stats.outOfStock, color: "red" },
    { key: "high_value", label: "High Value", count: stats.highValue, color: "green" },
  ];

  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <Header name="Inventory" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Package className="w-4 h-4" />
            <span>{filteredProducts.length} items</span>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors bg-gray-50 focus:bg-white"
              />
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            {/* Filter Toggle */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                showFilters
                  ? "border-purple-500 bg-purple-50 text-purple-600"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters</span>
            </motion.button>
          </div>

          {/* Filter Chips */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex flex-wrap gap-2">
                {filterButtons.map((filter) => (
                  <motion.button
                    key={filter.key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeFilter === filter.key
                        ? `bg-${filter.color}-100 text-${filter.color}-700 border-2 border-${filter.color}-300`
                        : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
                    }`}
                    style={{
                      backgroundColor:
                        activeFilter === filter.key
                          ? filter.color === "purple"
                            ? "#f3e8ff"
                            : filter.color === "orange"
                            ? "#ffedd5"
                            : filter.color === "red"
                            ? "#fee2e2"
                            : "#dcfce7"
                          : undefined,
                      color:
                        activeFilter === filter.key
                          ? filter.color === "purple"
                            ? "#7c3aed"
                            : filter.color === "orange"
                            ? "#ea580c"
                            : filter.color === "red"
                            ? "#dc2626"
                            : "#16a34a"
                          : undefined,
                      borderColor:
                        activeFilter === filter.key
                          ? filter.color === "purple"
                            ? "#c4b5fd"
                            : filter.color === "orange"
                            ? "#fdba74"
                            : filter.color === "red"
                            ? "#fca5a5"
                            : "#86efac"
                          : "transparent",
                    }}
                  >
                    <span>{filter.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-xs ${
                        activeFilter === filter.key
                          ? "bg-white/50"
                          : "bg-gray-200"
                      }`}
                    >
                      {filter.count}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Price Range Filter */}
              <div className="mt-4 flex items-center gap-4">
                <span className="text-sm text-gray-500">Price range:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                    placeholder="Min"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                    placeholder="Max"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Search Results Info */}
          {(searchTerm || activeFilter !== "all") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex items-center justify-between text-sm text-gray-500"
            >
              <span>
                Showing {filteredProducts.length} of {products.length} products
              </span>
              {(searchTerm || activeFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                    setPriceRange([0, 1000]);
                  }}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Data Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5"
        >
          <DataGrid
            rows={filteredProducts}
            columns={columns}
            getRowId={(row) => row.productId}
            checkboxSelection
            disableRowSelectionOnClick
            className="bg-white shadow-sm rounded-xl border border-gray-200 !text-gray-700"
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#7c3aed",
                color: "white",
                borderRadius: "12px 12px 0 0",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 600,
              },
              "& .MuiCheckbox-root": {
                color: "#7c3aed",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f3e8ff",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f3f4f6",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #e5e7eb",
              },
              "& .MuiTablePagination-root": {
                color: "#6b7280",
              },
            }}
          />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Inventory;
