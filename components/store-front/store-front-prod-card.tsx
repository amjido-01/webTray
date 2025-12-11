// product-card.tsx
import { Product } from "@/hooks/use-customer-store-front";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: Product;
  categoryName?: string; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product, categoryName }) => {
  const formatPrice = (price: string) => {
    return `₦${parseFloat(price).toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden hover:shadow-sm transition-shadow duration-300">
      <div className="h-48 bg-gray-200 relative">
        <Image
          src={ "/icons/Frame 170.png"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-[#4D4D4D] text-[16px] line-clamp-1">
            {product.name}
          </h3>
          <span className="text-[16px] font-bold text-[#1A1A1A]">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="inline-block bg-[#DADADA] text-[#4D4D4D] text-[14px] px-2 py-1 rounded-full font-medium">
            {categoryName || `Category ${product.categoryId}`}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between gap-2 items-center">
          <button className="bg-[#111827] w-[70%] hover:bg-[#111827] text-white py-1 px-2 rounded-sm transition-colors duration-200 flex items-center gap-2 justify-center">
            Buy Now
            <Image
              alt="arrow right"
              src="icons/arrow-right-02.png"
              width={20}
              height={20}
            />
          </button>
        
          <div className="w-[30%] flex justify-end">
            <Image
              alt="shop icon"
              src="icons/shop.png"
              width={20}
              height={20}
              className="w-6 h-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;