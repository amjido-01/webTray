// components/store-front-ui.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useStorefront, Product } from "@/hooks/use-customer-store";
import { useCartStore } from "@/store/use-cart-store";
import { toast } from "sonner";
import StoreFrontSlide from "@/components/store-front/store-front-slide";
import CategoryFilter from "@/components/store-front/store-front-cate-filter";
import ProductsGrid from "@/components/store-front/store-front-product-grid";
import StoreFrontSkeleton from "./store-front/store-front-skeleton";
import { Search, ShoppingCart } from "lucide-react";

interface StorefrontUIProps {
  slug: string;
}

export default function StorefrontUI({ slug }: StorefrontUIProps) {
  const router = useRouter();
  const { 
    categories, 
    isFetchingCategories, 
    categoriesError,
    allProducts, 
    isFetchingAllProducts, 
    allProductsError,
    useProductsByCategory 
  } = useStorefront(slug);
  
  const addToCart = useCartStore((state) => state.addToCart);

  // We use sessionStorage to remember filters when navigating back from a product page
  const CATEGORY_KEY = `storefront_${slug}_categories`;
  const SEARCH_KEY = `storefront_${slug}_search`;
  const PAGE_KEY = `storefront_${slug}_page`;

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(CATEGORY_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(SEARCH_KEY) || "";
    }
    return "";
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(PAGE_KEY);
      return saved ? parseInt(saved, 10) : 1;
    }
    return 1;
  });
  const ITEMS_PER_PAGE = 9;

  // Persist state to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(CATEGORY_KEY, JSON.stringify(selectedCategoryIds));
      sessionStorage.setItem(SEARCH_KEY, searchQuery);
      sessionStorage.setItem(PAGE_KEY, currentPage.toString());
    }
  }, [selectedCategoryIds, searchQuery, currentPage]);

  // Reset pagination when categories or search change ONLY if called manually
  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1); // Reset page on category click
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset page on search typing
  };

  // Fetch products based on selected categories
  const { data: categoryProducts = [], isLoading: isFetchingCategoryProducts } =
    useProductsByCategory(selectedCategoryIds);

  const isFetchingProducts = selectedCategoryIds.length > 0 
    ? isFetchingCategoryProducts 
    : isFetchingAllProducts;

  const displayProducts = useMemo(() => {
    const activeProducts = selectedCategoryIds.length > 0 ? categoryProducts : allProducts;
    
    let visibleProducts = activeProducts.filter((product) => product.visible);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      visibleProducts = visibleProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.description && p.description.toLowerCase().includes(query))
      );
    }
    
    // Sort so featured equal true is first
    return visibleProducts.sort((a, b) => {
      if (a.feature && !b.feature) return -1;
      if (!a.feature && b.feature) return 1;
      return 0; // maintain original order otherwise
    });
  }, [allProducts, categoryProducts, selectedCategoryIds.length, searchQuery]);

  const isDefaultFilter = selectedCategoryIds.length === 0;

  const totalPages = Math.ceil(displayProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = displayProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );



  // Apply filter button handler (if you still need a button)
  const handleApplyFilter = () => {
    // Filter is already applied automatically when selectedCategoryIds changes
    // This can be used for additional logic or UI feedback if needed
    if (selectedCategoryIds.length === 0) {
      toast.info("Please select at least one category");
    }
  };

  // Reset to default (first category)
  const handleClearFilters = () => {
    if (categories.length > 0) {
      const firstCategoryId = categories[0].id;
      setSelectedCategoryIds([firstCategoryId]);
    } else {
      setSelectedCategoryIds([]);
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || `Category ${categoryId}`;
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    const result = addToCart(product, quantity);

    if (result === "added") {
      toast.success(`${product.name} added to your cart.`);
    } else if (result === "incremented") {
      toast(`${product.name} is already in your cart, ${quantity} more added to your cart!`, {
        icon: <ShoppingCart className="h-4 w-4" />,
      });
    } else {
      toast.error(`Cannot add more of ${product.name} to the cart.`, {
        description: "You've reached the maximum available stock.",
      });
    }
  };

  if (isFetchingCategories) {
    return <StoreFrontSkeleton />;
  }

  if (categoriesError || allProductsError) {
    const errorMessage = (categoriesError as Error)?.message || (allProductsError as Error)?.message || "This store is currently offline or does not exist.";
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full p-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Store Unavailable</h2>

          <button 
            onClick={() => router.push('/')}
            className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="space-y-6 p-4 max-w-7xl mx-auto">
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
              <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600 font-medium whitespace-nowrap">
                  {selectedCategoryIds.length > 0
                    ? `Showing products from ${
                        selectedCategoryIds.length
                      } categor${
                        selectedCategoryIds.length === 1 ? "y" : "ies"
                      }`
                    : "No category selected"}
                </p>
                
                <div className="relative w-full sm:w-64 lg:w-72">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  />
                </div>
              </div>

              {isFetchingProducts && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">
                    {isDefaultFilter
                      ? "Loading products from default category..."
                      : "Loading products..."}
                  </p>
                </div>
              )}

              {!isFetchingProducts && displayProducts.length === 0 && (
                <div className="mb-6 p-6 bg-white rounded-lg shadow-sm text-center border">
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
                    {selectedCategoryIds.length > 0
                      ? `No products available in ${selectedCategoryIds
                          .map((id) => getCategoryName(id))
                          .join(", ")}`
                      : "Please select a category to view products."}
                  </p>
                  {selectedCategoryIds.length > 0 && (
                    <button
                      onClick={handleClearFilters}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Reset to Default Category
                    </button>
                  )}
                </div>
              )}

              <ProductsGrid
                products={paginatedProducts}
                isLoading={isFetchingProducts}
                onAddToCart={handleAddToCart}
                slug={slug}
              />
              
              {/* Pagination Controls */}
              {totalPages > 1 && !isFetchingProducts && (
                <div className="flex justify-center items-center gap-2 mt-12 mb-4">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 text-sm flex-shrink-0 flex items-center justify-center rounded transition ${
                          currentPage === i + 1 
                            ? 'bg-gray-900 text-white font-medium' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}