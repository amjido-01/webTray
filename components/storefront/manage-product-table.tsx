"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Search, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

/* UI components */
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { capitalizeFirstLetter } from "@/lib/capitalize";
import { useStoreFront } from "@/hooks/use-store-front";
import { useCategory } from "@/hooks/use-category";
import { useAuthStore } from "@/store/useAuthStore";
import { TableSkeleton } from "../table-skeleton";
import { StoreProduct, Category } from "@/types";
import { useProduct } from "@/hooks/use-product";

/* TanStack Table */
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

/* Constants */
const PAGE_SIZE = 10;
const MAX_VISIBLE_PAGES = 5;
const FALLBACK_IMAGE = "/placeholder-product.png";

/* Extracted ProductCard Component */
const ProductCard = React.memo<{
  product: StoreProduct;
  categoryName: string;
  onToggleVisible: (id: number, currentVisibility: boolean) => void;
  onToggleFeature: (id: number, currentFeature: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isUpdating: boolean;
}>(
  ({
    product,
    categoryName,
    onToggleVisible,
    onToggleFeature,
    onEdit,
    onDelete,
    isUpdating,
  }) => {
    const imgSrc =
      product.images?.main || product.images?.thumbnail || FALLBACK_IMAGE;
    const [imgError, setImgError] = useState(false);

    return (
      <article
        className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden relative"
        aria-label={`Product: ${product.name}`}
      >
        {/* Loading overlay */}
        {isUpdating && (
          <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
          </div>
        )}

        {/* Image area */}
        <div className="relative h-40 w-full overflow-hidden bg-gray-50">
          {imgError ? (
            <Image
              src="/cups.jpg"
              alt={product.name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          {/* Status badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.feature && (
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-yellow-400 text-white shadow-sm">
                Featured
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full shadow-sm ${
                product.visible
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {product.visible ? "Visible" : "Hidden"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {capitalizeFirstLetter(product.name)}
              </h3>

              <div className="mt-2">
                <span className="inline-block bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                  {capitalizeFirstLetter(categoryName)}
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-3 line-clamp-2">
                {product.description || "No description available"}
              </p>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="text-sm font-medium whitespace-nowrap">
                ₦{Number(product.price).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Stock: {product.quantity}
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="mt-4 flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <Switch
                checked={product.visible}
                onCheckedChange={() =>
                  onToggleVisible(product.id, product.visible)
                }
                disabled={isUpdating}
                aria-label={`Toggle visibility for ${product.name}`}
              />
              <span>Visible</span>
            </label>

            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <Switch
                checked={product.feature}
                onCheckedChange={() =>
                  onToggleFeature(product.id, product.feature)
                }
                disabled={isUpdating}
                aria-label={`Toggle featured for ${product.name}`}
              />
              <span>Featured</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(product.id)}
              disabled={isUpdating}
              className="rounded-full border px-3 py-1 hover:bg-gray-100"
              aria-label={`Edit ${product.name}`}
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(product.id)}
              disabled={isUpdating}
              className="rounded-full px-3 border hover:bg-red-500 hover:text-white py-1"
              aria-label={`Delete ${product.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </article>
    );
  }
);

ProductCard.displayName = "ProductCard";

/* Main Component */
export default function ManageProductTable() {
  const { activeStore } = useAuthStore();
  const storeId = activeStore?.id;

  const {
    storeProducts,
    isFetchingStoreProducts,
    storeProductsError,
    changeProductVisibility,
    isUpdatingProductVisibility,
    changeProductFeatured,
    isUpdatingProductFeatured,
  } = useStoreFront();
  const {
    deleteProduct,
    deleteProductError,
    isDeletingProduct,
    deleteProductSuccess,
  } = useProduct();

  const { categories } = useCategory();

  // Table controls
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Track which product is being updated
  const [updatingProductId, setUpdatingProductId] = useState<number | null>(
    null
  );

  // Categories map
  const categoriesMap = useMemo(() => {
    const m = new Map<number, string>();
    categories?.forEach((c: Category) => {
      if (c?.id != null) m.set(Number(c.id), String(c.name));
    });
    return m;
  }, [categories]);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(storeProducts)) return [];
    if (selectedCategory === "all") return storeProducts;

    const categoryId = Number(selectedCategory);
    return storeProducts.filter((p) => p.categoryId === categoryId);
  }, [storeProducts, selectedCategory]);

  // Table columns
  const columns = useMemo<ColumnDef<StoreProduct>[]>(
    () => [
      { id: "name", accessorKey: "name" },
      { id: "price", accessorKey: "price" },
      { id: "description", accessorKey: "description" },
    ],
    []
  );

  // Table instance
  const table = useReactTable({
    data: filteredProducts,
    columns,
    state: { globalFilter, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _columnId, filterValue: unknown) => {
      const name = String(row.getValue("name") ?? "").toLowerCase();
      const desc = String(row.getValue("description") ?? "").toLowerCase();
      const term = String(filterValue ?? "")
        .trim()
        .toLowerCase();
      return !term || name.includes(term) || desc.includes(term);
    },
  });

  // Handler for visibility toggle
  const handleToggleVisible = useCallback(
    async (productId: number, currentVisibility: boolean) => {
      if (!storeId || isUpdatingProductVisibility) return;

      setUpdatingProductId(productId);
      try {
        await changeProductVisibility({
          productId,
          visibility: !currentVisibility,
          storeId,
        });
      } catch (error) {
        // Error already handled by the hook with toast
        console.error("Failed to toggle visibility:", error);
      } finally {
        setUpdatingProductId(null);
      }
    },
    [storeId, changeProductVisibility, isUpdatingProductVisibility]
  );

  // Handler for feature toggle (TODO: Add API endpoint)
  const handleToggleFeature = useCallback(
    async (productId: number, currentFeature: boolean) => {
      if (!storeId || isUpdatingProductFeatured) return;
      setUpdatingProductId(productId);
      try {
        await changeProductFeatured({
          productId,
          featured: !currentFeature,
          storeId,
        });
      } catch (error) {
        // Error already handled by the hook with toast
        console.error("Failed to toggle visibility:", error);
      } finally {
        setUpdatingProductId(null);
      }
      // You'll need to add a similar mutation in useStoreFront hook
    },
    [storeId, changeProductFeatured, isUpdatingProductFeatured]
  );

  const handleEdit = useCallback((productId: number) => {
    // Navigate to edit page or open edit modal
    console.log("Edit product:", productId);
  }, []);

  const handleDeleteClick = useCallback((productId: number) => {
    setDeleteConfirm(productId);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteConfirm || !storeId || isDeletingProduct) return;

    // Capture id locally to avoid clearing state before the API call
    const productId = deleteConfirm;

    // TODO: Implement delete product API call
    console.log("Delete product:", productId);

    try {
      await deleteProduct(productId);
      // clear the confirmation only after a successful request
      setDeleteConfirm(null);
    } catch (error) {
      // Error already handled by the hook with toast
      console.error("Failed to delete product:", error);
    }
  }, [deleteConfirm, storeId, isDeletingProduct, deleteProduct]);

  const handleCategoryChange = useCallback(
    (value: string) => {
      setSelectedCategory(value);
      table.setPageIndex(0);
    },
    [table]
  );

  // Pagination helpers
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        end = Math.min(MAX_VISIBLE_PAGES, totalPages);
      }
      if (currentPage > totalPages - 3) {
        start = Math.max(1, totalPages - MAX_VISIBLE_PAGES + 1);
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  // Error state
  if (storeProductsError) {
    return (
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="text-center text-red-500 py-10">
          <p className="font-medium">Failed to load products</p>
          <p className="text-sm text-gray-500 mt-2">
            {storeProductsError.message}
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isFetchingStoreProducts) return <TableSkeleton />;

  const pageRows = table.getPaginationRowModel().rows;

  return (
    <>
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-medium text-gray-800 mb-6">Products</h1>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search Products"
                className="pl-10 bg-white border border-gray-200 rounded-full h-10"
                value={globalFilter}
                onChange={(e) => {
                  setGlobalFilter(e.target.value);
                  table.setPageIndex(0);
                }}
                aria-label="Search products"
              />
            </div>

            <div className="w-full sm:w-56">
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full bg-white border border-gray-200 rounded-full h-10">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((cat: Category) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {capitalizeFirstLetter(cat.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageRows.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-10">
                {globalFilter || selectedCategory !== "all"
                  ? "No products match your search."
                  : "No products found. Add your first product to get started."}
              </div>
            ) : (
              pageRows.map((row) => {
                const product = row.original;
                const categoryName = product.categoryId
                  ? categoriesMap.get(Number(product.categoryId)) ??
                    `Category ${product.categoryId}`
                  : "Uncategorized";

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={categoryName}
                    onToggleVisible={handleToggleVisible}
                    onToggleFeature={handleToggleFeature}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                    isUpdating={updatingProductId === product.id}
                  />
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <nav
              className="flex items-center justify-center gap-4 py-6"
              aria-label="Pagination"
            >
              <button
                className={`px-5 py-2 rounded-full text-sm transition-colors ${
                  table.getCanPreviousPage()
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Previous page"
              >
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm border transition-colors ${
                      currentPage === page
                        ? "border-blue-500 text-blue-500 font-medium bg-blue-50"
                        : "border-gray-300 text-gray-500 hover:border-gray-400"
                    }`}
                    onClick={() => table.setPageIndex(page - 1)}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <span className="text-gray-400 text-sm">of {totalPages}</span>

              <button
                className={`px-5 py-2 rounded-full text-sm transition-colors ${
                  table.getCanNextPage()
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-400 cursor-not-allowed"
                }`}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Next page"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteConfirm !== null}
        onOpenChange={(open) => {
          // Prevent closing while deletion is in progress
          if (!open && !isDeletingProduct) {
            setDeleteConfirm(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="borde">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 dark:bg-red-950 rounded-full p-2">
                  <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <h2 className="text-center text-[16px] font-medium text-[#343434] mb-5">
                Are you sure you want to delete this product?
              </h2>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-3 sm:flex-row">
            <AlertDialogCancel className="flex-1 rounded-full border-2 border-[#111827] hover:bg-accent/50 bg-transparent">
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleDeleteConfirm}
              disabled={isDeletingProduct}
              className={`flex-1 rounded-full text-white ${
                isDeletingProduct
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#111827] hover:bg-slate-800"
              }`}
            >
              {isDeletingProduct ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
