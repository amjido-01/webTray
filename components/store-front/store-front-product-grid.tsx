import React from 'react'
import { Product } from '@/hooks/use-customer-store'; 
import ProductCard from '../product-card';

interface ProductsGridProps {
  products: Product[]; 
  isLoading?: boolean;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void; // Add this line
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  isLoading = false,
  onAddToCart,
  onViewDetails // Add this
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-sm border overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">No products found matching your filters.</p>
        <p className="text-gray-400 text-sm mt-2">Try selecting different categories or check back later.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails} // Pass it to ProductCard
        />
      ))}
    </div>
  );
}

export default ProductsGrid;