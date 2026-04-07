"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Package, Search, SlidersHorizontal } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "all",        label: "All"        },
  { value: "processing", label: "Processing" },
  { value: "shipped",    label: "Shipped"    },
  { value: "delivered",  label: "Delivered"  },
  { value: "cancelled",  label: "Cancelled"  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function StorefrontOrdersTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Apply status filter on top of global search
  const filteredData =
    statusFilter === "all"
      ? data
      : data.filter(
          (row: any) => row.status === statusFilter
        );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages  = table.getPageCount();
  const totalRows   = table.getFilteredRowModel().rows.length;

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end   = Math.min(totalPages, currentPage + 2);
      if (currentPage <= 3)                  end   = Math.min(maxVisible, totalPages);
      if (currentPage > totalPages - 3)      start = Math.max(1, totalPages - maxVisible + 1);
      for (let i = start; i <= end; i++) pages.push(i);
    }

    return pages;
  };

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders"
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              table.setPageIndex(0);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Filter</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              table.setPageIndex(0);
            }}
            className="border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row count */}
      <p className="text-sm font-semibold text-[#4D4D4D] mb-4">
        {totalRows} order{totalRows !== 1 ? "s" : ""}
      </p>

      {/* Table */}
      <div className="rounded-lg overflow-hidden">
        {/* Header */}
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="hidden sm:grid grid-cols-[60px_1fr_80px_120px_120px] gap-4 px-6 py-3 bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase tracking-wide"
          >
            {headerGroup.headers.map((header) => (
              <span key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </span>
            ))}
          </div>
        ))}

        {/* Rows */}
        {table.getRowModel().rows.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No orders found matching your criteria.</p>
          </div>
        ) : (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-1 sm:grid-cols-[60px_1fr_80px_120px_120px] gap-2 sm:gap-4 px-6 border-b last:border-b-0 hover:bg-gray-50 transition cursor-pointer items-center"
            >
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
              !table.getCanPreviousPage()
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => table.setPageIndex(pageNum - 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition ${
                  currentPage === pageNum
                    ? "border-2 border-blue-500 text-blue-600 bg-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            ))}
            <span className="text-sm text-gray-500 mx-1">of {totalPages}</span>
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
              !table.getCanNextPage()
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
