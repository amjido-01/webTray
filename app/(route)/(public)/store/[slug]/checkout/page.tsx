// ============================================
// FILE: app/store/[slug]/checkout/page.tsx
// ============================================

'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, X } from 'lucide-react';
import { useCartStore } from '@/store/use-cart-store';
import { toast } from 'sonner';
import * as yup from 'yup';
import Image from 'next/image';

interface CheckoutPageProps {
  params: Promise<{ slug: string }>;
}

// Yup validation schema
const shippingSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters'),
  email: yup
    .string()
    .required('Email address is required')
    .email('Please enter a valid email address'),
  state: yup
    .string()
    .required('Please select a state'),
  city: yup
    .string()
    .required('Please select a city'),
  address: yup
    .string()
    .required('Street address is required')
    .min(10, 'Please provide a detailed address (at least 10 characters)'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9+\s()-]+$/, 'Please enter a valid phone number')
    .min(11, 'Phone number must be at least 11 digits'),
  whatsapp: yup
    .string()
    .matches(/^[0-9+\s()-]*$/, 'Please enter a valid phone number')
    .test('min-length', 'WhatsApp number must be at least 11 digits', function(value) {
      if (!value) return true; // Optional field
      return value.length >= 11;
    }),
});

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const router = useRouter();
  const { slug } = use(params);

  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [step, setStep] = useState<'address' | 'review'>('address');
  
  const subtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.cartQuantity,
    0
  );
  const itemCount = cart.reduce((sum, item) => sum + item.cartQuantity, 0);
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

  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [shippingMethod, setShippingMethod] = useState('normal');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo({ ...shippingInfo, [field]: value });
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleContinue = async () => {
    try {
      // Validate all fields
      await shippingSchema.validate(shippingInfo, { abortEarly: false });
      
      // If validation passes, clear errors and proceed
      setErrors({});
      setStep('review');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        // Convert validation errors to object
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  const handlePlaceOrder = () => {
    console.log('Order placed:', { 
      shippingInfo, 
      shippingMethod, 
      paymentMethod, 
      items: cart,
      subtotal,
      deliveryFee,
      total
    });
    
    // TODO: Send order to your backend API
    
    toast.success('Order placed successfully!');
    clearCart();
    
    // Redirect to success page
    router.push(`/store/${slug}/order-success`);
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
    
    if (cart.length === 1) {
      router.push(`/store/${slug}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to your cart before checking out
          </p>
          <button
            onClick={() => router.push(`/store/${slug}`)}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // REVIEW STEP
  if (step === 'review') {
    return (
      <div className="min-h-screen bg-white">
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

        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => setStep('address')}
            className="flex items-center gap-2 text-gray-700 text-sm px-3 py-1.5 border rounded hover:bg-gray-50"
          >
            ← Back to Shipping Info
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-8">
          <h1 className="text-2xl font-bold mb-6">Review Your Order</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold">SHIPPING ADDRESS</h2>
                  <button 
                    onClick={() => setStep('address')}
                    className="text-sm px-3 py-1 border rounded hover:bg-gray-50"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Name:</span> {shippingInfo.firstName} {shippingInfo.lastName}</p>
                  <p><span className="font-medium">Email:</span> {shippingInfo.email}</p>
                  <p><span className="font-medium">Phone:</span> {shippingInfo.phone}</p>
                  {shippingInfo.whatsapp && (
                    <p><span className="font-medium">WhatsApp:</span> {shippingInfo.whatsapp}</p>
                  )}
                  <p><span className="font-medium">Address:</span> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}</p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h2 className="font-bold mb-4">ORDER ITEMS ({itemCount})</h2>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded border">
                      <Image 
                        src={item.images.thumbnail || item.images.main} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          ₦{parseFloat(item.price).toLocaleString()} × {item.cartQuantity}
                        </p>
                        <p className="text-sm font-bold mt-2">
                          ₦ {(parseFloat(item.price) * item.cartQuantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
                    <p className="font-bold">₦ {deliveryFee.toLocaleString()}</p>
                  </label>
                </div>
              </div>

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
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border rounded-lg p-4 sticky top-4">
                <h2 className="font-bold text-[#4D4D4D] leading-[100%] text-[16px] mb-4 pb-3 border-b">ORDER SUMMARY</h2>
                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} Items)</span>
                    <span className="font-bold">₦ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold">₦ {deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t font-bold text-base">
                    <span>Total</span>
                    <span className="text-blue-600">₦ {total.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-gray-900 text-white py-2 rounded font-bold hover:bg-gray-800 transition"
                >
                  Place Order
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  By placing your order, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ADDRESS STEP
  return (
    <div className="min-h-screen bg-white">
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

      <div className="max-w-6xl mx-auto px-4 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 text-sm px-3 py-1.5 border rounded hover:bg-gray-50"
        >
          ← Back to Store
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        <h1 className="text-[20px] leading-[100%] text-[#4D4D4D] font-bold mb-[32px]">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="border rounded-lg p-6">
              <h2 className="font-bold text-[#4D4D4D] text-[16px] leading-[100%] mb-6">SHIPPING INFORMATION</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1.5 font-medium">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 ${
                        errors.firstName 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'focus:ring-blue-500'
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5 font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 ${
                        errors.lastName 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'focus:ring-blue-500'
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1.5 font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1.5 font-medium">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={shippingInfo.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 ${
                        errors.state 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'focus:ring-blue-500'
                      }`}
                    >
                      <option value="">Select state</option>
                      <option value="lagos">Lagos</option>
                      <option value="abuja">Abuja</option>
                      <option value="kano">Kano</option>
                      <option value="rivers">Rivers</option>
                    </select>
                    {errors.state && (
                      <p className="text-xs text-red-600 mt-1">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5 font-medium">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 ${
                        errors.city 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'focus:ring-blue-500'
                      }`}
                    >
                      <option value="">Choose city</option>
                      <option value="ikeja">Ikeja</option>
                      <option value="lekki">Lekki</option>
                      <option value="victoria-island">Victoria Island</option>
                    </select>
                    {errors.city && (
                      <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1.5 font-medium">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 ${
                      errors.address 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter your street address"
                  />
                  {errors.address && (
                    <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                  )}
                  {!errors.address && (
                    <p className="text-xs text-blue-600 mt-1">
                      Detailed street address can help our delivery find you quickly.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1.5 font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'focus:ring-blue-500'
                    }`}
                    placeholder="Please provide your phone number"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1.5 font-medium">
                    WhatsApp Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={shippingInfo.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 ${
                      errors.whatsapp 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'focus:ring-blue-500'
                    }`}
                    placeholder="For backup contact"
                  />
                  {errors.whatsapp && (
                    <p className="text-xs text-red-600 mt-1">{errors.whatsapp}</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-gray-900 text-white py-3 rounded font-bold mt-6 hover:bg-gray-800 transition"
              >
                Continue to Review
              </button>

            <div>
                          <p className="text-center text-[14px] font-bold text-[#4D4D4D] mt-2">
                            We accept Bank Transfer, USSD, Debit/Credit Cards
                          </p>
                          <div className="flex justify-center items-center gap-3 mt-3">
                            <Image
                              src="/visa.png"
                              alt="Visa"
                              width={30}
                              height={28}
                              className="object-contain"
                            />  
                            <Image
                              src="/master.png"
                              alt="Mastercard"
                              width={30}
                              height={28}
                              className="object-contain"
                            />  
                            <Image
                              src="/paypal.png"
                              alt="PayPal"
                              width={40}
                              height={28}
                              className="object-contain"
                            />  
                          </div>
                        </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-4 sticky top-4">
              <h2 className="font-bold text-[#4D4D4D] leading-[100%] text-[16px] mb-4 pb-3 border-b">ORDER SUMMARY</h2>
              
              <div className="mb-4 max-h-64 overflow-y-auto">
               {cart.map((item) => {
  const imageUrl = item.images?.thumbnail || item.images?.main || '';
  const hasValidImage = imageUrl && imageUrl.trim() !== '';
  
  return (
    <div key={item.id} className="flex gap-2 mb-3 pb-3 border-b last:border-b-0">
      {hasValidImage ? (
        <Image 
          src={imageUrl}
          alt={item.name}
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded"
        />
      ) : (
        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
          <ShoppingCart className="w-6 h-6 text-gray-400" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate">{item.name}</p>
        <p className="text-xs text-gray-600">
          Qty: {item.cartQuantity} × ₦{parseFloat(item.price).toLocaleString()}
        </p>
      </div>
    </div>
  );
})}
              </div>

              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} Items)</span>
                  <span className="font-bold">₦ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold">₦ {deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t font-bold text-base">
                  <span>Total</span>
                  <span className="text-blue-600">₦ {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}