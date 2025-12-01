"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import PageTransition from "@/app/(components)/PageTransition";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, X, Users as UsersIcon, Mail, Filter } from "lucide-react";

const columns: GridColDef[] = [
  { 
    field: "userId", 
    headerName: "ID", 
    width: 120,
    renderCell: (params) => (
      <span className="font-mono text-sm text-gray-500">{params.value}</span>
    ),
  },
  { 
    field: "name", 
    headerName: "Name", 
    width: 200,
    renderCell: (params) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
          {params.value?.charAt(0)?.toUpperCase()}
        </div>
        <span className="font-medium">{params.value}</span>
      </div>
    ),
  },
  { 
    field: "email", 
    headerName: "Email", 
    width: 280,
    renderCell: (params) => (
      <div className="flex items-center gap-2 text-gray-600">
        <Mail className="w-4 h-4" />
        <span>{params.value}</span>
      </div>
    ),
  },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchTerm) return users;
    
    const lowerSearch = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch) ||
        user.userId.toLowerCase().includes(lowerSearch)
    );
  }, [users, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

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
          <Header name="Users" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <UsersIcon className="w-4 h-4" />
            <span>{filteredUsers.length} users</span>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
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

            {/* Filter Toggle Button */}
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

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500">Quick filters:</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-sm rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                >
                  All Users
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-sm rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  Recently Added
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-sm rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  Active Users
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Search Results Info */}
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-sm text-gray-500"
            >
              Found {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} matching &quot;{searchTerm}&quot;
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
            rows={filteredUsers}
            columns={columns}
            getRowId={(row) => row.userId}
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

export default Users;
