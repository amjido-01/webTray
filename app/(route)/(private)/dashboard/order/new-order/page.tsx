"use client"

import { useState } from "react"
import { Search, Plus, Minus, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useOrder } from "@/hooks/use-order"
import { useProduct } from "@/hooks/use-product"
import * as yup from "yup"

interface Product {
  id: string
  name: string
  description: string
  price: number
}

interface CartItem extends Product {
  quantity: number
}

interface FormErrors {
  customerName?: string
  customerPhone?: string
  cartItems?: string
}

// Validation schema
const orderValidationSchema = yup.object({
  customerName: yup
    .string()
    .required("Customer name is required")
    .min(2, "Customer name must be at least 2 characters")
    .max(50, "Customer name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Customer name can only contain letters and spaces"),
  
  customerPhone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(\+234|0)[789][01]\d{8}$/,
      "Please enter a valid Nigerian phone number (e.g., +2348012345678 or 08012345678)"
    ),
  
  cartItems: yup
    .array()
    .min(1, "Please add at least one product to the cart")
    .required("Cart cannot be empty")
})

export default function AddOrderPage() {
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [errors, setErrors] = useState<FormErrors>({})

  // Use the custom hooks
  const { addOrder, isAddingOrder, addOrderError } = useOrder()
  const { products, isFetchingProducts } = useProduct()

  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Coffee Delight",
      description: "A rich blend of coffee and chocolate.",
      price: 2000.0,
    },
    {
      id: "2",
      name: "Coffee Bliss",
      description: "A smooth and creamy coffee experience.",
      price: 1800.0,
    },
    {
      id: "3",
      name: "Coffee Burst",
      description: "An energizing coffee with a hint of citrus.",
      price: 2200.0,
    },
    {
      id: "4",
      name: "Coffee Dream",
      description: "A dreamy mix of coffee and vanilla.",
      price: 1900.0,
    },
    {
      id: "5",
      name: "Coffee Fusion",
      description: "A unique blend of coffee and spices.",
      price: 2100.0,
    },
    {
      id: "6",
      name: "Coffee Harmony",
      description: "A balanced coffee with floral notes.",
      price: 2300.0,
    },
    {
      id: "7",
      name: "Coffee Magic",
      description: "A magical blend of coffee and caramel.",
      price: 2400.0,
    },
  ]

  const availableProducts = products 
    ? products.map(p => ({
        id: p.id.toString(),
        name: p.name,
        description: p.description || "",
        price: typeof p.price === 'string' ? parseFloat(p.price) : p.price
      }))
    : mockProducts;

  const filteredProducts = availableProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Validate individual fields as user types
  const validateField = async (fieldName: keyof FormErrors, value: string | CartItem[]) => {
    try {
      await (yup.reach(orderValidationSchema, fieldName) as yup.Schema).validate(value)
      setErrors(prev => ({ ...prev, [fieldName]: undefined }))
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, [fieldName]: error.message }))
      }
    }
  }

  // Check if customer details are valid before allowing cart operations
  const isCustomerDetailsValid = () => {
    return customerName.trim().length >= 2 && 
           customerPhone.trim().length > 0 && 
           !errors.customerName && 
           !errors.customerPhone
  }

  const addToCart = (product: Product) => {
    // Validate customer details first
    if (!isCustomerDetailsValid()) {
      // Show specific error message
      if (!customerName.trim()) {
        setErrors(prev => ({ ...prev, customerName: "Please enter customer name before adding products" }))
      }
      if (!customerPhone.trim()) {
        setErrors(prev => ({ ...prev, customerPhone: "Please enter customer phone before adding products" }))
      }
      return
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setSearchQuery("")
    setShowSuggestions(false)
    // Clear cart errors when items are added
    if (errors.cartItems) {
      setErrors(prev => ({ ...prev, cartItems: undefined }))
    }
  }

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)),
    )
  }

  const removeFromCart = (id: string) => {
    const newCartItems = cartItems.filter((item) => item.id !== id)
    setCartItems(newCartItems)
    
    // Validate cart after removal
    if (newCartItems.length === 0) {
      setErrors(prev => ({ ...prev, cartItems: "Please add at least one product to the cart" }))
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSaveOrder = async () => {
    try {
      // Validate all fields
      const formData = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        cartItems: cartItems
      }

      await orderValidationSchema.validate(formData, { abortEarly: false })
      
      // Clear any existing errors
      setErrors({})

      // Transform cart items to match API payload
      const orderItems = cartItems.map(item => ({
        productId: parseInt(item.id),
        quantity: item.quantity
      }))

      const orderPayload = {
        customerName: formData.customerName,
        phone: formData.customerPhone,
        orderItems
      }

      console.log("Submitting order:", orderPayload)

      // Call the API
      await addOrder(orderPayload)

      // Reset form on success
      setCustomerName("")
      setCustomerPhone("")
      setCartItems([])
      setSearchQuery("")
      setShowSuggestions(false)
      setErrors({})

      console.log("Order submitted successfully!")
      
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Handle validation errors
        const validationErrors: FormErrors = {}
        
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path as keyof FormErrors] = err.message
          }
        })
        
        setErrors(validationErrors)
      } else {
        console.error("Failed to save order:", error)
      }
    }
  }

  const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomerName(value)
    validateField('customerName', value.trim())
  }

  const handleCustomerPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomerPhone(value)
    validateField('customerPhone', value.trim())
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4">Orders / New Order</div>

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Add new orders</h1>

        {/* Show error if any */}
        {addOrderError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">Error: {addOrderError.message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Details</h2>

            <div className="space-y-6">
              {/* Customer Name */}
              <div>
                <Label htmlFor="customerName" className="text-sm font-medium text-gray-700 mb-2 block">
                  Customer Name
                </Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={handleCustomerNameChange}
                  className={`w-full ${errors.customerName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  disabled={isAddingOrder}
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                )}
              </div>

              {/* Customer Phone */}
              <div>
                <Label htmlFor="customerPhone" className="text-sm font-medium text-gray-700 mb-2 block">
                  Customer Phone Number
                </Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  placeholder="Enter customer phone number (e.g., +2348012345678)"
                  value={customerPhone}
                  onChange={handleCustomerPhoneChange}
                  className={`w-full ${errors.customerPhone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  disabled={isAddingOrder}
                />
                {errors.customerPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
                )}
              </div>

              {/* Add Product */}
              <div>
                <Label htmlFor="productSearch" className="text-sm font-medium text-gray-700 mb-2 block">
                  Add Product
                </Label>
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="productSearch"
                      type="text"
                      placeholder={
                        !isCustomerDetailsValid() 
                          ? "Please enter customer details first"
                          : isFetchingProducts 
                          ? "Loading products..." 
                          : "Search product"
                      }
                      value={searchQuery}
                      onChange={(e) => {
                        if (!isCustomerDetailsValid()) return
                        setSearchQuery(e.target.value)
                        setShowSuggestions(e.target.value.length > 0)
                      }}
                      onFocus={() => {
                        if (!isCustomerDetailsValid()) return
                        setShowSuggestions(searchQuery.length > 0)
                      }}
                      className="pl-10 w-full"
                      disabled={isAddingOrder || isFetchingProducts || !isCustomerDetailsValid()}
                    />
                  </div>

                  {/* Product Suggestions Dropdown */}
                  {showSuggestions && filteredProducts.length > 0 && isCustomerDetailsValid() && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {filteredProducts.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => addToCart(product)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          disabled={isAddingOrder}
                        >
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-600">{product.description}</div>
                          <div className="text-sm text-gray-800 font-medium">₦{product.price.toFixed(2)}</div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* No products found */}
                  {showSuggestions && filteredProducts.length === 0 && searchQuery.length > 0 && isCustomerDetailsValid() && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                      <div className="px-4 py-3 text-sm text-gray-500">No products found</div>
                    </div>
                  )}

                  {/* Customer details required message */}
                  {!isCustomerDetailsValid() && (
                    <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex items-center">
                        <div className="text-amber-600 text-sm">
                          <strong>Complete customer details first:</strong>
                          <ul className="mt-1 ml-4 list-disc text-xs">
                            {!customerName.trim() && <li>Enter customer name</li>}
                            {!customerPhone.trim() && <li>Enter customer phone number</li>}
                            {errors.customerName && <li>Fix customer name error</li>}
                            {errors.customerPhone && <li>Fix phone number error</li>}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Add Custom Product */}
                <button 
                  className={`mt-3 text-sm font-medium flex items-center gap-1 ${
                    isCustomerDetailsValid() 
                      ? 'text-blue-600 hover:text-blue-700' 
                      : 'text-gray-400 cursor-not-allowed'
                  } disabled:opacity-50`}
                  disabled={isAddingOrder || !isCustomerDetailsValid()}
                  onClick={() => {
                    if (!isCustomerDetailsValid()) {
                      // Trigger validation messages
                      if (!customerName.trim()) {
                        setErrors(prev => ({ ...prev, customerName: "Please enter customer name before adding products" }))
                      }
                      if (!customerPhone.trim()) {
                        setErrors(prev => ({ ...prev, customerPhone: "Please enter customer phone before adding products" }))
                      }
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Add custom product
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Cart Summary</h2>

            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-center text-sm font-medium text-gray-700 pb-2">
                <span>Products</span>
                <span>PRICE/NGN</span>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${Math.random()}`} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">₦{item.price.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">QTY</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                            disabled={isAddingOrder}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                            disabled={isAddingOrder}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        disabled={isAddingOrder}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {cartItems.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-500">No products added yet</div>
                  {errors.cartItems && (
                    <p className="text-red-500 text-sm mt-1">{errors.cartItems}</p>
                  )}
                </div>
              )}

              {/* Total */}
              {cartItems.length > 0 && (
                <>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span>₦{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Save Order Button */}
                  <Button
                    onClick={handleSaveOrder}
                    disabled={isAddingOrder}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAddingOrder ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Adding Order...
                      </>
                    ) : (
                      "Save Order"
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}