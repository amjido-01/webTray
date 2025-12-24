'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, MapPin, Phone, Mail, User, Check } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  
  // Mock cart items - Replace with actual cart from context/state
  const cartItems = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      price: '2000',
      quantity: 2,
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      name: 'Coffee Grinder',
      price: '4500',
      quantity: 1,
      image: 'https://via.placeholder.com/80',
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => 
    sum + parseFloat(item.price) * item.quantity, 0
  );
  const shippingCost = 1000;
  const total = subtotal + shippingCost;

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo({ ...shippingInfo, [field]: value });
  };

  const handleSubmitOrder = () => {
    // Handle order submission
    console.log('Order submitted', { shippingInfo, shippingMethod, paymentMethod, cartItems });
    // router.push(`/store/${params.slug}/order-confirmation`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()} 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold">Checkout</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h2 className="text-2xl font-bold">Shipping Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    <User className="w-4 h-4 inline mr-1" />
                    First Name
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="+234 800 000 0000"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">City</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Lagos"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">State</label>
                  <input
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Lagos State"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h2 className="text-2xl font-bold">Shipping Method</h2>
              </div>

              <div className="space-y-3">
                <label 
                  className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition ${
                    shippingMethod === 'standard' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="shipping" 
                    value="standard"
                    checked={shippingMethod === 'standard'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-5 h-5 text-blue-600" 
                  />
                  <Truck className="w-6 h-6 text-gray-600" />
                  <div className="flex-1">
                    <p className="font-bold text-lg">Standard Delivery</p>
                    <p className="text-sm text-gray-600">2-5 business days</p>
                  </div>
                  <p className="text-xl font-bold">₦1,000</p>
                </label>
                
                <label 
                  className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition ${
                    shippingMethod === 'express' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="shipping" 
                    value="express"
                    checked={shippingMethod === 'express'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-5 h-5 text-blue-600" 
                  />
                  <Truck className="w-6 h-6 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-bold text-lg">Express Delivery</p>
                    <p className="text-sm text-gray-600">1-2 business days</p>
                  </div>
                  <p className="text-xl font-bold">₦2,500</p>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h2 className="text-2xl font-bold">Payment Method</h2>
              </div>

              <div className="space-y-3 mb-6">
                <label 
                  className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition ${
                    paymentMethod === 'card' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <CreditCard className="w-6 h-6" />
                  <span className="font-bold text-lg flex-1">Card Payment</span>
                  <div className="flex gap-2">
                    <Image width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                      alt="Visa" className="h-6" />
                    <Image width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                      alt="Mastercard" className="h-6" />
                  </div>
                </label>
                
                <label 
                  className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition ${
                    paymentMethod === 'transfer' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')}
                    className="w-5 h-5 text-blue-600"
                  />
                  <CreditCard className="w-6 h-6" />
                  <span className="font-bold text-lg">Bank Transfer</span>
                </label>
              </div>

              <button 
                onClick={handleSubmitOrder}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg">
                Continue to Payment
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border sticky top-24">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image 
                      width={100} height={100}
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">Quantity: {item.quantity}</p>
                      <p className="text-base font-bold">
                        ₦{parseFloat(item.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">₦{shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span className="text-blue-600">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmitOrder}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Place Order
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}