// ============================================
// FILE: app/store/[slug]/checkout/page.tsx
// ============================================

'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

interface CheckoutPageProps {
  params: Promise<{ slug: string }>;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const router = useRouter();
  const { slug } = use(params);

  const [step, setStep] = useState<'address' | 'review'>('address');
  
  // Mock cart items - Replace with actual cart from context/state
  const cartItems = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      price: '2000',
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => 
    sum + parseFloat(item.price) * item.quantity, 0
  );
  const deliveryFee = 2000;
  const total = subtotal + deliveryFee;

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    state: '',
    city: '',
    address: '',
    phone: '',
    whatsapp: '',
  });

  const [shippingMethod, setShippingMethod] = useState('normal');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo({ ...shippingInfo, [field]: value });
  };

  const handleContinue = () => {
    setStep('review');
  };

  const handlePlaceOrder = () => {
    console.log('Order placed', { shippingInfo, shippingMethod, paymentMethod, cartItems });
    // Handle order placement
  };

  if (step === 'review') {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded">
                  Home
                </button>
                <button className="text-sm text-gray-600">Products</button>
              </div>
              <h1 className="text-lg font-bold absolute left-1/2 transform -translate-x-1/2">
                CoffeeShop
              </h1>
              <div className="flex items-center gap-3">
                <button className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                    2
                  </span>
                </button>
                <button className="bg-gray-900 text-white px-4 py-1.5 rounded text-sm">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="border-b bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Shopping Cart</span>
              <span>/</span>
              <span className="font-semibold text-gray-900">Secure Checkout</span>
              <span>/</span>
              <span>Order Complete</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => setStep('address')}
            className="flex items-center gap-2 text-gray-700 text-sm px-3 py-1.5 border rounded hover:bg-gray-50"
          >
            ← Back
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-8">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold">SHIPPING ADDRESS</h2>
                  <button className="text-sm px-3 py-1 border rounded hover:bg-gray-50">
                    Edit
                  </button>
                </div>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Email:</span> {shippingInfo.email}</p>
                  <p><span className="font-medium">Name:</span> {shippingInfo.firstName} {shippingInfo.lastName}</p>
                  <p><span className="font-medium">Phone:</span> {shippingInfo.phone}</p>
                  <p><span className="font-medium">Address:</span> {shippingInfo.address}</p>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="border rounded-lg p-4">
                <h2 className="font-bold mb-4">SHIPPING METHOD</h2>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value="normal"
                        checked={shippingMethod === 'normal'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-medium text-sm">Normal Shipping: 3-7 working days</p>
                      </div>
                    </div>
                    <p className="font-bold">₦ 2,000</p>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="border rounded-lg p-4">
                <h2 className="font-bold mb-4">PAYMENT METHOD</h2>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-medium text-sm">Pay with Cards, Bank Transfer or USSD</p>
                        <p className="text-xs text-gray-500">100% Delivery Guarantee</p>
                      </div>
                    </div>
                    <p className="font-bold">₦ 2,000</p>
                  </label>
                  <label className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-medium text-sm">Cash On Delivery</p>
                        <p className="text-xs text-gray-500">100% Delivery Guarantee</p>
                      </div>
                    </div>
                    <p className="font-bold">₦ 2,000</p>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary - Right Column */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-4">
                <h2 className="font-bold mb-4 pb-3 border-b">ORDER SUMMARY</h2>
                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal (4 Items)</span>
                    <span className="font-bold">₦ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold">₦ {deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t font-bold text-base">
                    <span>Total</span>
                    <span>₦ {total.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-gray-900 text-white py-3 rounded font-bold hover:bg-gray-800 transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded">
                Home
              </button>
              <button className="text-sm text-gray-600">Products</button>
            </div>
            <h1 className="text-lg font-bold absolute left-1/2 transform -translate-x-1/2">
              CoffeeShop
            </h1>
            <div className="flex items-center gap-3">
              <button className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                  2
                </span>
              </button>
              <button className="bg-gray-900 text-white px-4 py-1.5 rounded text-sm">
                Contact
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Shopping Cart</span>
            <span>/</span>
            <span className="font-semibold text-gray-900">Secure Checkout</span>
            <span>/</span>
            <span>Order Complete</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 text-sm px-3 py-1.5 border rounded hover:bg-gray-50"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="border rounded-lg p-6">
              <h2 className="font-bold text-lg mb-6">SHIPPING INFORMATION</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1.5">First Name</label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">Last Name</label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1.5">State</label>
                    <select
                      value={shippingInfo.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select state</option>
                      <option value="lagos">Lagos</option>
                      <option value="abuja">Abuja</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5">City</label>
                    <select
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose city</option>
                      <option value="ikeja">Ikeja</option>
                      <option value="lekki">Lekki</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1.5">Street Address</label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your street address"
                  />
                  <p className="text-xs text-blue-600 mt-1">
                    Detailed street address can help our bike find you quickly.
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please provide your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={shippingInfo.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="For backup"
                  />
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-gray-900 text-white py-3 rounded font-bold mt-6 hover:bg-gray-800 transition"
              >
                Continue
              </button>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-600 mb-2">We accept Bank Transfer, Ussd, Debit/Credit Cards</p>
                <div className="flex justify-center gap-3">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    P
                  </div>
                  <div className="w-10 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    M
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-4 sticky top-4">
              <h2 className="font-bold mb-4">ORDER SUMMARY</h2>
              
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal (4 Items)</span>
                  <span className="font-bold">₦ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold">₦ {deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t font-bold text-base">
                  <span>Total</span>
                  <span>₦ {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}