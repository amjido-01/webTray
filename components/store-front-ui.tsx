"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStorefront, Product } from "@/hooks/use-customer-store";
import StoreFrontSlide from "@/components/store-front/store-front-slide";
import CategoryFilter from "@/components/store-front/store-front-cate-filter";
import ProductsGrid from "@/components/store-front/store-front-product-grid";
import StoreFrontSkeleton from "./store-front/store-front-skeleton";
import ProductDetailModal from "./store-front/product-detail-modal";
import Image from "next/image";

interface StorefrontUIProps {
  slug: string;
}

interface CartItem extends Product {
  cartQuantity: number;
}

export default function StorefrontUI({ slug }: StorefrontUIProps) {
  const router = useRouter();
  const { categories, isFetchingCategories, useProductsByCategory } = useStorefront(slug);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (categories.length > 0 && selectedCategoryIds.length === 0) {
      const firstCategoryId = categories[0].id;
      setSelectedCategoryIds([firstCategoryId]);
      setIsFilterApplied(true);
    }
  }, [categories, selectedCategoryIds.length]);

  const { data: products = [], isLoading: isFetchingProducts } = 
    useProductsByCategory(isFilterApplied ? selectedCategoryIds : []);

    console.log(products, "kkk")

  const displayProducts = useMemo(() => {
    return products.filter((product) => product.visible);
  }, [products]);

  const isDefaultFilter = useMemo(() => {
    return categories.length > 0 && selectedCategoryIds.length === 1 && 
           selectedCategoryIds[0] === categories[0]?.id;
  }, [categories, selectedCategoryIds]);

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleApplyFilter = () => {
    if (selectedCategoryIds.length === 0) {
      setIsFilterApplied(false);
      return;
    }
    setIsFilterApplied(true);
  };

  const handleClearFilters = () => {
    if (categories.length > 0) {
      const firstCategoryId = categories[0].id;
      setSelectedCategoryIds([firstCategoryId]);
      setIsFilterApplied(true);
    } else {
      setSelectedCategoryIds([]);
      setIsFilterApplied(false);
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || `Category ${categoryId}`;
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      if (existing.cartQuantity + quantity <= product.quantity) {
        setCart(cart.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        ));
      }
    } else {
      setCart([...cart, { ...product, cartQuantity: quantity }]);
    }
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(cart.map((item) => {
      if (item.id === productId) {
        const newQuantity = item.cartQuantity + delta;
        if (newQuantity <= 0) return null;
        if (newQuantity > item.quantity) return item;
        return { ...item, cartQuantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + parseFloat(item.price) * item.cartQuantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.cartQuantity, 0);
  };

  if (isFetchingCategories) {
    return <StoreFrontSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h1 className="text-xl font-semibold">Store</h1>
                <nav className="hidden md:flex gap-6">
                  <button className="text-sm text-gray-600 hover:text-gray-900">Home</button>
                  <button className="text-sm text-gray-600 hover:text-gray-900">Products</button>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setShowCart(!showCart)} className="relative p-2 hover:bg-gray-100 rounded-full transition">
                  <ShoppingCart className="w-5 h-5" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {getCartCount()}
                    </span>
                  )}
                </button>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
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
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600 font-medium">
                  {isFilterApplied && selectedCategoryIds.length > 0
                    ? `Showing products from ${selectedCategoryIds.length} categor${selectedCategoryIds.length === 1 ? 'y' : 'ies'}`
                    : 'Showing all products'}
                </p>
              </div>

              {isFetchingProducts && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">
                    {isDefaultFilter ? 'Loading products from default category...' : 'Loading products...'}
                  </p>
                </div>
              )}

              {!isFetchingProducts && displayProducts.length === 0 && (
                <div className="mb-6 p-6 bg-white rounded-lg shadow-sm text-center border">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">
                    {isFilterApplied
                      ? `No products available in ${selectedCategoryIds.map((id) => getCategoryName(id)).join(', ')}`
                      : 'There are no products available at the moment.'}
                  </p>
                  {isFilterApplied && (
                    <button onClick={handleClearFilters} 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                      View All Products
                    </button>
                  )}
                </div>
              )}

              <ProductsGrid
                products={displayProducts}
                isLoading={isFetchingProducts}
                onAddToCart={(product) => addToCart(product, 1)}
                slug={slug} // Add this line
              />
            </div>
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)}></div>
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Shopping Cart ({getCartCount()})</h2>
                <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Your cart is empty</p>
                    <p className="text-gray-500 text-sm mt-2">Add products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 bg-white rounded flex-shrink-0 overflow-hidden border">
                            <Image width={100} height={100}  src={item.images?.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate text-sm">{item.name}</h3>
                            <p className="text-sm text-gray-600 font-semibold">
                              ₦{parseFloat(item.price).toLocaleString()}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 bg-white border rounded hover:bg-gray-50 transition">
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-medium w-8 text-center text-sm">{item.cartQuantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 bg-white border rounded hover:bg-gray-50 transition">
                                <Plus className="w-4 h-4" />
                              </button>
                              <button onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-red-600 hover:text-red-700 p-1 transition">
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₦{getCartTotal().toLocaleString()}
                    </span>
                  </div>
                  <button 
                    onClick={() => router.push(`/store/${slug}/checkout`)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        relatedProducts={displayProducts.filter(p => p.id !== selectedProduct?.id)}
      />
    </>
  );
}