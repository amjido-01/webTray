"use client";


import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  ShoppingCart,

  Check,
  SettingsIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";


import { useRegistration } from "@/hooks/useBusinessRegister";
import { useRouter } from "next/navigation";

export default function WebTrayOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const { addRegister, isRegisteringUser } = useRegistration();
  const router = useRouter();

  const [formData, setFormData] = useState({
    // Step 1 data
    businessName: "",
    businessType: "",
    description: "",
    category: {
      main: [] as string[],
    },
    address: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    // Step 2 data
    storeName: "",
    slogan: "",
    customeDomain: "",
    currency: "NGN",
    // Step 3 data
    paymentMethods: {
      paystack: false,
      bankTransfer: false,
      cashOnDelivery: false,
    },
    deliveryOptions: {
      inHouse: false,
      thirdParty: [] as string[],
    },
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        category: {
          main: [...prev.category.main, category],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        category: {
          main: prev.category.main.filter((c) => c !== category),
        },
      }));
    }
  };

  const handlePaymentMethodChange = (
    method: keyof typeof formData.paymentMethods,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: {
        ...prev.paymentMethods,
        [method]: checked,
      },
    }));
  };

  const handleDeliveryOptionChange = (
    option: keyof typeof formData.deliveryOptions,
    value: boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      deliveryOptions: {
        ...prev.deliveryOptions,
        [option]: value,
      },
    }));
  };

  const handleThirdPartyChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        deliveryOptions: {
          ...prev.deliveryOptions,
          thirdParty: [...prev.deliveryOptions.thirdParty, service],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        deliveryOptions: {
          ...prev.deliveryOptions,
          thirdParty: prev.deliveryOptions.thirdParty.filter(
            (s) => s !== service
          ),
        },
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare the payload according to the API requirements
      const payload = {
        businessName: formData.businessName,
        businessType: formData.businessType,
        description: formData.description,
        category: {
          main: formData.category.main.join(", "),
        },
        address: formData.address,
        storeName: formData.storeName,
        slogan: formData.slogan,
        customeDomain: formData.customeDomain,
        currency: formData.currency,
        paymentMethods: {
          paystack: formData.paymentMethods.paystack,
          bankTransfer: formData.paymentMethods.bankTransfer,
        },
        deliveryOptions: {
          inHouse: formData.deliveryOptions.inHouse,
          thirdParty: formData.deliveryOptions.thirdParty,
        },
      };

      await addRegister(payload);
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const getProgressValue = () => {
    switch (currentStep) {
      case 1:
        return 33;
      case 2:
        return 66;
      case 3:
        return 100;
      default:
        return 33;
    }
  };

  const categories = [
    { id: "food", label: "Food & Beverages" },
    { id: "electronics", label: "Electronics" },
    { id: "health", label: "Health & Beauty" },
    { id: "clothing", label: "Clothing & Accessories" },
    { id: "home", label: "Home & Garden" },
    { id: "books", label: "Books & Media" },
  ];

  const thirdPartyServices = [
    { id: "gokada", label: "Gokada" },
    { id: "bolt", label: "Bolt Food" },
    { id: "jumia", label: "Jumia Food" },
    { id: "glovo", label: "Glovo" },
  ];

  const currencies = [
    { id: "NGN", label: "Nigerian Naira (₦)" },
    { id: "USD", label: "US Dollar ($)" },
    { id: "EUR", label: "Euro (€)" },
    { id: "GBP", label: "British Pound (£)" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="flex w-[80%] mx-auto items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="logo" width={100} height={24} />
          </div>
          <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
        </div>

        {/* Progress Section */}
        <div className="mt-8 w-[70%] mx-auto">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-[20px] font-semibold text-[#4D4D4D]">
              Welcome to WebTray
            </h1>
            <span className="text-sm text-gray-500">
              {getProgressValue()}% Complete
            </span>
          </div>
          <Progress value={getProgressValue()} className="" />

          {/* Step Indicators */}
          <div className="flex items-center justify-center my-6 gap-4">
            <div className="flex items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  currentStep > 1
                    ? "bg-blue-600"
                    : currentStep === 1
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }`}
              >
                {currentStep > 1 ? (
                  <Check className="h-6 w-6 text-white" />
                ) : (
                  <Package
                    className={`h-6 w-6 ${
                      currentStep === 1 ? "text-white" : "text-gray-400"
                    }`}
                  />
                )}
              </div>
            </div>
            <div className="h-px w-12 bg-gray-300" />
            <div className="flex items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  currentStep > 2
                    ? "bg-blue-600"
                    : currentStep === 2
                    ? "bg-blue-600"
                    : "border-[0.09rem]"
                }`}
              >
                {currentStep > 2 ? (
                  <Check className="h-6 w-6 text-white" />
                ) : (
                  <ShoppingCart
                    className={`h-6 w-6 ${
                      currentStep === 2 ? "text-white" : "text-[#DADADA]"
                    }`}
                  />
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
                <Image
                  src="/icons/paint-board.png"
                  alt="logo"
                  width={100}
                  height={24}
                  className={`h-6 w-6 ${
                    currentStep === 3 ? "text-white" : "text-[#DADADA]"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <Card className="bg-gray-50 border-[0.08rem] shadow-none border-[#EBEBEB] rounded-md">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Business Information</CardTitle>
                <CardDescription>Tell us about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name*</Label>
                    <Input
                      id="business-name"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          businessName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type*</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          businessType: value,
                        }))
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="manufacturing">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="wholesale">Wholesale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description*</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your business"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address*</Label>
                  <Input
                    id="address"
                    placeholder="Enter your business address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input
                      id="phone"
                      placeholder="+2348001234567"
                      value={formData.contactInfo.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactInfo: {
                            ...prev.contactInfo,
                            phone: e.target.value,
                          },
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address*</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="info@yourbusiness.com"
                      value={formData.contactInfo.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactInfo: {
                            ...prev.contactInfo,
                            email: e.target.value,
                          },
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    Product Categories*
                  </Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      {categories.slice(0, 3).map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={category.id}
                            checked={formData.category.main.includes(
                              category.id
                            )}
                            onCheckedChange={(checked) =>
                              handleCategoryChange(
                                category.id,
                                checked as boolean
                              )
                            }
                          />
                          <Label
                            htmlFor={category.id}
                            className="text-sm font-normal"
                          >
                            {category.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {categories.slice(3).map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={category.id}
                            checked={formData.category.main.includes(
                              category.id
                            )}
                            onCheckedChange={(checked) =>
                              handleCategoryChange(
                                category.id,
                                checked as boolean
                              )
                            }
                          />
                          <Label
                            htmlFor={category.id}
                            className="text-sm font-normal"
                          >
                            {category.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Store Setup */}
          {currentStep === 2 && (
            <Card className="bg-gray-50 border-[0.08rem] shadow-none border-[#EBEBEB] rounded-md">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Store Setup</CardTitle>
                <CardDescription>Configure your online store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name*</Label>
                    <Input
                      id="store-name"
                      placeholder="Enter your store name"
                      value={formData.storeName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          storeName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slogan">Slogan (Optional)</Label>
                    <Input
                      id="slogan"
                      placeholder="Your catchy slogan"
                      value={formData.slogan}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          slogan: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="domain">Custom Domain (Optional)</Label>
                    <Input
                      id="domain"
                      placeholder="yourstore.com"
                      value={formData.customeDomain}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customeDomain: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency*</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, currency: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.id} value={currency.id}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-lg bg-[#D8DFFB] p-4">
                  <div className="flex gap-3">
                    <ShoppingCart className="text-[#365BEB]" />
                    <div>
                      <h4 className="font-medium text-[#202E4B] pb-1 text-[14px]">
                        Store Features
                      </h4>
{/* eslint-disable-next-line react/no-unescaped-entities */}
                      <p className="text-[12px] text-[#202E4B]">
                        Your store will include product management, order
                        tracking, customer accounts, and analytics dashboards to
                        help you grow your business.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Payment & Delivery */}
          {currentStep === 3 && (
            <Card className="bg-gray-50 border-[0.08rem] shadow-none border-[#EBEBEB] rounded-md">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Payment & Delivery</CardTitle>
                <CardDescription>
{/* eslint-disable-next-line react/no-unescaped-entities */}
                  Set up how you'll accept payments and deliver orders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    Payment Methods*
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="paystack"
                        checked={formData.paymentMethods.paystack}
                        onCheckedChange={(checked) =>
                          handlePaymentMethodChange(
                            "paystack",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="paystack" className="text-sm font-normal">
                        Paystack
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bank-transfer"
                        checked={formData.paymentMethods.bankTransfer}
                        onCheckedChange={(checked) =>
                          handlePaymentMethodChange(
                            "bankTransfer",
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor="bank-transfer"
                        className="text-sm font-normal"
                      >
                        Bank Transfer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cash-delivery"
                        checked={formData.paymentMethods.cashOnDelivery}
                        onCheckedChange={(checked) =>
                          handlePaymentMethodChange(
                            "cashOnDelivery",
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor="cash-delivery"
                        className="text-sm font-normal"
                      >
                        Cash on Delivery
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    Delivery Options*
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-house"
                        checked={formData.deliveryOptions.inHouse}
                        onCheckedChange={(checked) =>
                          handleDeliveryOptionChange(
                            "inHouse",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="in-house" className="text-sm font-normal">
                        In-house Delivery
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Third-Party Services
                      </Label>
                      <div className="grid gap-4 md:grid-cols-2">
                        {thirdPartyServices.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={service.id}
                              checked={formData.deliveryOptions.thirdParty.includes(
                                service.id
                              )}
                              onCheckedChange={(checked) =>
                                handleThirdPartyChange(
                                  service.id,
                                  checked as boolean
                                )
                              }
                            />
                            <Label
                              htmlFor={service.id}
                              className="text-sm font-normal"
                            >
                              {service.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-[#D8DFFB] p-4">
                  <div className="flex gap-3">
                    <SettingsIcon className="w-4 h-4 text-[#365BEB]" />
                    <div>
                      <h4 className="font-medium text-[#202E4B] pb-1 text-[14px]">
                        Delivery Setup
                      </h4>
                      <p className="text-[12px] text-[#202E4B]">
                        Configure your delivery options to ensure smooth order
                        fulfillment. You can add more options later in your
                        store settings.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1 || isRegisteringUser}
              className="flex items-center gap-2 border-[0.09rem]"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={isRegisteringUser}
              className="flex items-center gap-2"
            >
              {isRegisteringUser ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </>
              ) : currentStep === 3 ? (
                "Register"
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
