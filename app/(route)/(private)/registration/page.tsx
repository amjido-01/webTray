"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Package, ShoppingCart, Settings, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function WebTrayOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 data
    businessName: "",
    businessType: "",
    businessDescription: "",
    productCategories: [] as string[],
    // Step 2 data
    storeName: "",
    customDomain: "",
    paymentMethods: [] as string[],
    shippingOptions: [] as string[],
  })

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        productCategories: [...prev.productCategories, category],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        productCategories: prev.productCategories.filter((c) => c !== category),
      }))
    }
  }

  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, method],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        paymentMethods: prev.paymentMethods.filter((m) => m !== method),
      }))
    }
  }

  const handleShippingOptionChange = (option: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        shippingOptions: [...prev.shippingOptions, option],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        shippingOptions: prev.shippingOptions.filter((o) => o !== option),
      }))
    }
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getProgressValue = () => {
    switch (currentStep) {
      case 1:
        return 20
      case 2:
        return 60
      case 3:
        return 100
      default:
        return 20
    }
  }

  const categories = [
    { id: "food-beverages", label: "Food & Beverages" },
    { id: "electronics", label: "Electronics" },
    { id: "health-beauty", label: "Health & Beauty" },
    { id: "clothing-accessories", label: "Clothing & Accessories" },
    { id: "home-garden", label: "Home & Garden" },
    { id: "books-media", label: "Books & Media" },
  ]

  const paymentMethods = [
    { id: "cash-delivery", label: "Cash on Delivery" },
    { id: "paypal", label: "PayPal" },
    { id: "digital-wallets", label: "Digital Wallets" },
    { id: "credit-debit", label: "Credit/Debit Cards" },
    { id: "bank-transfer", label: "Bank Transfer" },
    { id: "cryptocurrency", label: "Cryptocurrency" },
  ]

  const shippingOptions = [
    { id: "in-store-pickup", label: "In-store Pickup" },
    { id: "local-delivery", label: "Local Delivery" },
    { id: "national-shipping", label: "National Shipping" },
    { id: "express-delivery", label: "Express Delivery" },
    { id: "international", label: "International Shipping" },
    { id: "free-shipping", label: "Free Shipping Options" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className=" flex w-[80%] mx-auto items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="logo" width={100} height={24} />
           
          </div>
          <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
        </div>

        {/* Progress Section */}
        <div className=" mt-8 w-[70%] mx-auto">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-[20px] font-semibold text-[#4D4D4D]">Welcome to WebTray</h1>
            <span className="text-sm text-gray-500">{getProgressValue()}% Complete</span>
          </div>
          <Progress value={getProgressValue()} className="" />

          {/* Step Indicators */}
          <div className="flex items-center justify-center my-6 gap-4">
            <div className="flex items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  currentStep > 1 ? "bg-blue-600" : currentStep === 1 ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                {currentStep > 1 ? (
                  <Check className="h-6 w-6 text-white" />
                ) : (
                  <Package className={`h-6 w-6 ${currentStep === 1 ? "text-white" : "text-gray-400"}`} />
                )}
              </div>
            </div>
            <div className="h-px w-12 bg-gray-300" />
            <div className="flex items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  currentStep > 2 ? "bg-blue-600" : currentStep === 2 ? "bg-blue-600" : "border-[0.09rem]"
                }`}
              >
                {currentStep > 2 ? (
                  <Check className="h-6 w-6 text-white" />
                ) : (
                  <ShoppingCart className={`h-6 w-6 ${currentStep === 2 ? "text-white" : "text-[#DADADA]"}`} />
                )}
              </div>
            </div>
            <div className="h-px w-12 bg-gray-300" />
            <div className="flex items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  currentStep === 3 ? "bg-blue-600" : "border-[0.09rem]"
                }`}
              >
                <Image src='/icons/paint-board.png' alt="logo" width={100} height={24} className={`h-6 w-6 ${currentStep === 3 ? "text-white" : "text-[#DADADA]"}`} />
              </div>
            </div>
          </div>
        

        {/* Step 1: Inventory Management */}
        {currentStep === 1 && (
          <Card className="bg-gray-50 border-[0.08rem] shadow-none border-[#EBEBEB] rounded-md">
            <CardHeader className="text-center ">
              <CardTitle className="text-xl">Inventory Management</CardTitle>
              <CardDescription>Set up your product catalog and inventory tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Business Name and Type */}
              <div className="grid gap-4 md:grid-cols-2 w-full">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                    
                  >
                    <SelectTrigger  className="w-full">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent >
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Business Description */}
              <div className="space-y-2">
                <Label htmlFor="business-description">Business Description</Label>
                <Textarea
                  id="business-description"
                  placeholder="Tell us about your business"
                  className="min-h-[100px]"
                  value={formData.businessDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, businessDescription: e.target.value }))}
                />
              </div>

              {/* Product Categories */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Initial Product Category</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    {categories.slice(0, 3).map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={formData.productCategories.includes(category.id)}
                          onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                        />
                        <Label htmlFor={category.id} className="text-sm font-normal">
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {categories.slice(3).map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={formData.productCategories.includes(category.id)}
                          onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                        />
                        <Label htmlFor={category.id} className="text-sm font-normal">
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inventory Features Info */}
              <div className="rounded-lg bg-[#D8DFFB] p-4">
                <div className="flex gap-3">
                <div>
                 <Image src='/iconS/blue-cube.png' height={20} width={20} alt="cube"/>
               </div>
                  <div>
                    <h4 className="font-medium text-[#202E4B] pb-1 text-[14px]">Inventory Features</h4>
                    <p className="text-[12px] text-[#202E4B]">
                      Track stock levels, set low-stock alerts, manage suppliers, and automate reordering. Your
                      inventory will sync across all sales channels.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: E-commerce Setup */}
        {currentStep === 2 && (
          <Card className="bg-gray-50 border-[0.08rem] shadow-none border-[#EBEBEB] rounded-md">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">E-commerce Setup</CardTitle>
              <CardDescription>Configure your online store and payment options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Store Name and Domain */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input
                    id="store-name"
                    placeholder="Enter your store name"
                    value={formData.storeName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, storeName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="custom-domain">Custom Domain (Optional)</Label>
                  <Input
                    id="custom-domain"
                    placeholder="yourstore.com"
                    value={formData.customDomain}
                    onChange={(e) => setFormData((prev) => ({ ...prev, customDomain: e.target.value }))}
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Payment Methods</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    {paymentMethods.slice(0, 3).map((method) => (
                      <div key={method.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={method.id}
                          checked={formData.paymentMethods.includes(method.id)}
                          onCheckedChange={(checked) => handlePaymentMethodChange(method.id, checked as boolean)}
                        />
                        <Label htmlFor={method.id} className="text-sm font-normal">
                          {method.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {paymentMethods.slice(3).map((method) => (
                      <div key={method.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={method.id}
                          checked={formData.paymentMethods.includes(method.id)}
                          onCheckedChange={(checked) => handlePaymentMethodChange(method.id, checked as boolean)}
                        />
                        <Label htmlFor={method.id} className="text-sm font-normal">
                          {method.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipping Options */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Shipping Options</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    {shippingOptions.slice(0, 3).map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.shippingOptions.includes(option.id)}
                          onCheckedChange={(checked) => handleShippingOptionChange(option.id, checked as boolean)}
                        />
                        <Label htmlFor={option.id} className="text-sm font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {shippingOptions.slice(3).map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.shippingOptions.includes(option.id)}
                          onCheckedChange={(checked) => handleShippingOptionChange(option.id, checked as boolean)}
                        />
                        <Label htmlFor={option.id} className="text-sm font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* E-commerce Features Info */}
              <div className="rounded-lg bg-[#D8DFFB] p-4">
                <div className="flex gap-3">
               <div>
               <ShoppingCart className="text-[#365BEB] " />
               </div>
                  <div className="">
                    <h4 className="font-medium text-[#202E4B] pb-1 text-[14px]">E-commerce Features</h4>
                    <p className="text-[12px] text-[#202E4B]">
                      Create a beautiful storefront, manage orders, track customer behavior, and integrate with your
                      custom domain for a professional online presence.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Placeholder */}
        {currentStep === 3 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Final Setup</CardTitle>
              <CardDescription>Complete your WebTray configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12">
                <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Step 3 content coming soon...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2 border-[0.09rem] ">
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button onClick={nextStep} disabled={currentStep === 3} className="flex items-center gap-2">
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        </div>
      </div>
    </div>
  )
}
