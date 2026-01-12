// ============================================
// FILE: app/store/[slug]/order-success/page.tsx
// ============================================

'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Package, Mail, Phone } from 'lucide-react';

interface OrderSuccessPageProps {
  params: Promise<{ slug: string }>;
}

export default function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const router = useRouter();
  const { slug } = use(params);

  // Generate a random order number (in production, this would come from your backend)
  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Main Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          {/* Order Number */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 mb-8 inline-block">
            <p className="text-sm text-gray-600 mb-1">Order Number</p>
            <p className="text-2xl font-bold text-gray-900">{orderNumber}</p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Email Confirmation</h3>
              </div>
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your email address
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Processing</h3>
              </div>
              <p className="text-sm text-gray-600">
                We're preparing your order for shipment
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Stay Updated</h3>
              </div>
              <p className="text-sm text-gray-600">
                We'll keep you informed via SMS and email
              </p>
            </div>
          </div>

          {/* Expected Delivery */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-5 mb-8">
            <p className="text-sm font-medium mb-1">Expected Delivery</p>
            <p className="text-2xl font-bold">3-7 Working Days</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push(`/store/${slug}`)}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push(`/store/${slug}/orders`)}
              className="bg-white border-2 border-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              View Order History
            </button>
          </div>

          {/* Support Text */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help with your order?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Keep your order number safe for tracking and customer support
          </p>
        </div>
      </div>
    </div>
  );
}