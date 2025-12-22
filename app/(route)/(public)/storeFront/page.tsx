"use client";

import CategoryFilter from "@/components/store-front/store-front-cate-filter";
import ProductsGrid from "@/components/store-front/store-front-product-grid";
import StoreFrontSlide from "@/components/store-front/store-front-slide";
import { useStorefront } from "@/hooks/use-customer-store-front";

import React, { useState, useMemo, useEffect } from "react";

const StoreFrontPage = () => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const storeId = "ala-store";

  const {
    categories,
    isFetchingCategories,
    products: allProducts,
    isFetchingProducts,
    useFilteredProducts,
  } = useStorefront(storeId);

  // Auto-select first category when categories load
  useEffect(() => {
    if (categories.length > 0 && selectedCategoryIds.length === 0) {
      // Select the first category
      const firstCategoryId = categories[0].id;
      setSelectedCategoryIds([firstCategoryId]);
      setIsFilterApplied(true); // Auto-apply filter
      console.log("Auto-selected first category:", firstCategoryId);
    }
  }, [categories, selectedCategoryIds.length]);

  const {
    data: filteredProducts,
    isLoading: isLoadingFilteredProducts,
    isFetching: isFetchingFilteredProducts,
    refetch: refetchFilteredProducts,
  } = useFilteredProducts(isFilterApplied ? selectedCategoryIds : []);

  const displayProducts = useMemo(() => {
    if (isFilterApplied && selectedCategoryIds.length > 0) {
      return filteredProducts || [];
    }
    return allProducts || [];
  }, [isFilterApplied, selectedCategoryIds, allProducts, filteredProducts]);

  const isLoadingProducts = useMemo(() => {
    if (isFilterApplied && selectedCategoryIds.length > 0) {
      return isLoadingFilteredProducts || isFetchingFilteredProducts;
    }
    return isFetchingProducts;
  }, [
    isFilterApplied,
    selectedCategoryIds.length,
    isFetchingProducts,
    isLoadingFilteredProducts,
    isFetchingFilteredProducts,
  ]);

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleApplyFilter = () => {
    if (selectedCategoryIds.length === 0) {
      setIsFilterApplied(false);
      return;
    }
    setIsFilterApplied(true);
  };

  const clearFilters = () => {
    setSelectedCategoryIds([]);
    setIsFilterApplied(false);
  };

  const handleClearFilters = () => {
    if (categories.length > 0) {
      const firstCategoryId = categories[0].id;
      setSelectedCategoryIds([firstCategoryId]);
      setIsFilterApplied(true);
      console.log("Reset to first category after clear:", firstCategoryId);
    } else {
      setSelectedCategoryIds([]);
      setIsFilterApplied(false);
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || `Category ${categoryId}`;
  };

  const isDefaultFilter = useMemo(() => {
    return (
      categories.length > 0 &&
      selectedCategoryIds.length === 1 &&
      selectedCategoryIds[0] === categories[0]?.id
    );
  }, [categories, selectedCategoryIds]);

  useEffect(() => {}, [
    selectedCategoryIds,
    isFilterApplied,
    displayProducts,
    categories,
    isDefaultFilter,
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        {/* <StoreFrontHeader /> */}
        <StoreFrontSlide />

        <h1 className="font-bold text-[#4D4D4D] text-2xl">Products</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[20%]">
            <CategoryFilter
              categories={categories}
              selectedCategoryIds={selectedCategoryIds}
              onCategoryToggle={handleCategoryToggle}
              onApplyFilter={handleApplyFilter}
              isLoading={isFetchingCategories}
            />
          </div>

          <div className="w-full lg:w-[80%]">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <p className="text-gray-600 font-medium">
                  {isFilterApplied && selectedCategoryIds.length > 0
                    ? `Showing products from ${
                        selectedCategoryIds.length
                      } categor${
                        selectedCategoryIds.length === 1 ? "y" : "ies"
                      }`
                    : "Showing all products"}
                </p>
              </div>
            </div>

            {/* Products loading state info */}
            {isLoadingProducts && (
              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">
                  {isDefaultFilter
                    ? "Loading products from default category..."
                    : "Loading products..."}
                </p>
              </div>
            )}

            {/* No products message */}
            {!isLoadingProducts && displayProducts.length === 0 && (
              <div className="mb-6 p-6 bg-white rounded-lg shadow-sm text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  {isFilterApplied
                    ? `No products available in ${selectedCategoryIds
                        .map((id) => getCategoryName(id))
                        .join(", ")}`
                    : "There are no products available at the moment."}
                </p>
                {isFilterApplied && (
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    View All Products
                  </button>
                )}
              </div>
            )}

            <ProductsGrid
              products={displayProducts}
              isLoading={isLoadingProducts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreFrontPage;
