'use client';

import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/hooks/use-customer-store';
import Image from 'next/image';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  relatedProducts?: Product[];
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  relatedProducts = [],
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.images.main || '');

  if (!isOpen || !product) return null;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const productImages = [
    product.images.main,
    product.images.thumbnail,
    product.images.main,
    product.images.thumbnail,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Images Section */}
            <div>
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
                <Image
                width={100}
                height={100}
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`border-2 rounded-lg overflow-hidden aspect-square ${
                      selectedImage === img ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <Image width={100} height={100} src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                CATEGORY
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(230)</span>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  ₦{parseFloat(product.price).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">{product.quantity} in stock</p>
              </div>

              <div className="border-t border-b py-4 mb-6">
                <h3 className="font-semibold mb-2 text-lg">Product Details</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description || 'High-quality product crafted with care. Perfect for everyday use and built to last. Features premium materials and exceptional design.'}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 border-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.quantity}
                    className="p-2 border-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition disabled:bg-gray-300 flex items-center justify-center gap-3 mb-6"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>

              {/* Additional Info */}
              <div className="space-y-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-gray-900">Free Shipping:</span>
                  <span>On orders over ₦10,000</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-gray-900">Delivery:</span>
                  <span>2-5 business days</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-gray-900">Returns:</span>
                  <span>30-day return policy</span>
                </p>
              </div>
            </div>
          </div>

          {/* You Might Also Like Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">You might also like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.slice(0, 4).map((item) => (
                  <div key={item.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition">
                    <div className="aspect-square bg-gray-100">
                      <Image width={100} height={100} src={item.images.main} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm mb-1 truncate">{item.name}</h4>
                      <p className="text-lg font-bold mb-2">₦{parseFloat(item.price).toLocaleString()}</p>
                      <button className="w-full bg-gray-900 text-white text-sm py-2 rounded hover:bg-gray-800 transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;

