"use client"
import Image from "next/image";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ReadyToSection from "./Ready-to-transform";

const features = [
  {
    feature: "Product Catalog",
    starter: "30 products",
    growth: "100 products",
    business: "Unlimited",
  },
  {
    feature: "Custom Domain",
    starter: "-",
    growth: "✓",
    business: "✓ + Email",
  },
  {
    feature: "Payment Gateway",
    starter: "✓",
    growth: "✓",
    business: "✓",
  },
  {
    feature: "Analytics Dashboard",
    starter: "Basic",
    growth: "Advanced",
    business: "Premium",
  },
  {
    feature: "Inventory Management",
    starter: "-",
    growth: "✓",
    business: "✓",
  },
  {
    feature: "Support",
    starter: "Priority",
    growth: "Priority",
    business: "Dedicated Manager",
  },
];

export function PricingSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const router = useRouter();

  const pricingPlans = [
    {
      id: 1,
      name: "Starter Plan",
      price: "N2,500",
      period: "/month",
      icon: "/icons/flash.png",
      idealFor:
        "Small vendors who sell primarily on WhatsApp, Instagram, or Facebook and want a simple online product catalog",
      buttonText: "Start Free Trial",
      buttonColor: "bg-[#111827] hover:bg-gray-800",
      borderColor: "border-gray-200",
      popular: false,
      features: [
        "WebTray subdomain (vendorname.webtray.ng)",
        "Product catalog (up to 30 products)",
        "WhatsApp chat integration for orders",
        "Basic sales dashboard",
        "Support community access",
        "WebTray subdomain (vendorname.webtray.ng)",
      ],
    },
    {
      id: 2,
      name: "Growth Plan",
      price: "N5,000",
      period: "/month",
      icon: "/icons/flash.png",
      idealFor:
        "Vendors ready to brand themselves with a custom website name and improved features.",
      buttonText: "Start Free Trial",
      buttonColor: "bg-blue-700 hover:bg-blue-600",
      borderColor: "border-blue-700 ",
      popular: true,
      features: [
        "Everything in Starter Plan",
        "Custom domain (www.mystore.com.ng)",
        "Product catalog (up to 100 products)",
        "Payment gateway (Paystack/Flutterwave)",
        "Advanced analytics dashboard (sales, traffic, and engagement)",
        "Digital marketing toolkit  (auto-share to WhatsApp status & social media)",
        "Priority customer support",
      ],
    },
    {
      id: 3,
      name: "Business Plan",
      price: "N20,000",
      period: "/month",
      icon: "/icons/flash.png",
      idealFor:
        "Growing SMEs that need advanced features to manage operations, track sales, and integrate delivery or POS.",
      buttonText: "Start Free Trial",
      buttonColor: "bg-[#111827] hover:bg-gray-800",
      borderColor: "border-[blue-700]",
      popular: false,
      features: [
        "Everything in Growth Plan",
        "POS & Inventory management",
        "Delivery and logistics integration",
        "Multi-user access for staff",
        "Menu and order tracking system",
        "Business performance dashboard",
        "Dedicated account manager",
        "Free domain + business email (e.g., sales@shopname.ng)",
      ],
    },
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-2 lg:px-0 ">
      <div className=" mx-auto sm:px-6 lg:px-8">
        {/* Pricing Header */}
        <div className="text-center mb-16  py-6">
          <h1 className="mb-4">WEBTRAY PRICING MODEL</h1>
          <h1 className="text-4xl line-clamp-6 font-bold text-[#1A1A1A] mb-4 py-2 ">
            Empowering African SMEs <br /> to{" "}
            <span className="bg-gradient-to-b from-[#365BEB] to-[#9233EA] bg-clip-text text-transparent">
              Go Digital
            </span>
          </h1>
          <h1 className="px-4">
            Choose the perfect plan for your business. Start small, scale big —
            all affordably priced for Nigerian businesses.
          </h1>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-sm border ${
                plan.borderColor
              } p-8 relative ${plan.popular ? "h-full min-h-[450px]" : ""}`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-700 text-white px-4 py-1 rounded-lg text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-start items-center">
                  <div className="bg-[#EBEBEB] p-2 rounded-full">
                    <Image
                      alt="icon"
                      height={100}
                      width={100}
                      src={plan.icon}
                      className="rounded w-4 h-4"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#4D4D4D] ml-2">
                    {plan.name}
                  </h3>
                </div>

                <div className="text-3xl font-bold text-start text-[#4D4D4D]">
                  {plan.price}{" "}
                  <span className="text-[#4D4D4D] text-sm"> {plan.period}</span>
                </div>

                <div>
                  <div className="space-y-4">
                    <p>Ideal for:</p>
                    <p>{plan.idealFor}</p>

                    <button
                      className={`w-full ${plan.buttonColor} text-white rounded-full font-medium transition-colors flex justify-center items-center px-4 py-2 space-x-2`}
                    >
                      <h1>{plan.buttonText}</h1>
                      <span>
                        <Image
                          alt="icon"
                          height={100}
                          width={100}
                          src="/icons/arrow-right-02.png"
                          className="rounded w-5 h-5"
                        />
                      </span>
                    </button>

                    <div>
                      <h1>Features included:</h1>
                      <ul className="space-y-3 mt-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="mr-3">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 max-w-6xl mx-auto py-3">
          <h2 className="lg:text-3xl text-xl  font-bold text-center text-gray-900 mb-2">
            Detailed Feature Comparison
          </h2>
          <p className="text-center mb-2">Get Started in 3 Simple Steps</p>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl  border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="px-6 py-4 text-left font-semibold text-gray-900">
                    Feature
                  </TableHead>
                  <TableHead className="px-6 py-4 text-center font-semibold text-gray-900">
                    Starter
                  </TableHead>
                  <TableHead className="px-6 py-4 text-center font-semibold text-blue-700 bg-[#F9FAFE]">
                    Growth
                  </TableHead>
                  <TableHead className="px-6 py-4 text-center font-semibold text-gray-900">
                    Business
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((item, index) => (
                  <TableRow
                    key={index}
                    className={`hover:bg-transparent ${
                      index % 2 === 0 ? "bg-gray" : "bg-white"
                    }`}
                  >
                    <TableCell className="px-6 py-4 font-medium text-gray-900">
                      {item.feature}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center">
                      {item.starter}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center bg-[#F9FAFE]">
                      {item.growth}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center">
                      {item.business}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden space-y-4">
            <Accordion
              type="multiple"
              value={openItems}
              onValueChange={setOpenItems}
            >
              {features.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg bg-white"
                >
                  <AccordionTrigger className="px-4 py-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold text-gray-900 text-left">
                        {item.feature}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      {/* Starter Plan Row */}
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">
                          Starter
                        </span>
                        <span className="text-gray-700">{item.starter}</span>
                      </div>

                      {/* Growth Plan Row */}
                      <div className="flex justify-between items-center py-2 border-b border-gray-100 bg-[#F9FAFE] rounded px-2">
                        <span className="font-medium text-blue-700">
                          Growth
                        </span>
                        <span className="text-gray-700">{item.growth}</span>
                      </div>

                      {/* Business Plan Row */}
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-900">
                          Business
                        </span>
                        <span className="text-gray-700">{item.business}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <div className="mt-16 ">
          <h2 className="lg:text-3xl text-xl font-bold text-center text-gray-900 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-center mb-2">
            Everything you need to know about our pricing
          </p>
          <div className="flex justify-center mt-8">
            <Image
              alt="icon"
              height={700}
              width={1000}
              src="/Frame 34005.png"
              className=""
            />
          </div>
        </div>
      </div>
      <ReadyToSection />
    </div>
  );
}
