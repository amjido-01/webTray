// app/customers/[id]/page.tsx
"use client";

import { use } from "react";
import { useCustomer } from "@/hooks/use-customer";
import { TableSkeleton } from "@/components/table-skeleton";
import { useState } from "react";
import { ChevronLeft, Mail, Phone, Calendar, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface CustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  // this is just like using await in server, but in client use handle all that for you since it a promise
  const { id } = use(params);
  const { customers, isLoading } = useCustomer();
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return <TableSkeleton />;
  }

  const customer = customers?.find((c) => c.id.toString() === id);
  console.log(customer);

  if (!customer) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900">Customer Not Found</h1>
      </div>
    );
  }

  const avgOrder =
    customer?.totalOrders > 0 ? customer?.totalSpent / customer.totalOrders : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-6 mt6 p6">
        <div className="space-y-4">
          {/* Header Content */}
          <div className="flex justify-between items-center">
            <div className="text-[#4D4D4D]">
              <p className="font-normal text-[12px] text-[#111827] mb-2 leading-6">
                Customers / Customer Profile
              </p>

              <div className="flex items-center gap-2 mb-2">
                <Link
                  href="/dashboard/customer"
                  className="text-[#4D4D4D] hover:text-[#111827]"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <h2 className="font-bold text-[20px] leading-6">
                  Customer Profile
                </h2>
              </div>

              <p className="font-normal text-[16px] leading-6">
                View customer details and purchase history
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Card */}
      <div className="bg-white mx-6 mt-6 px-6 py-5 rounded-lg border border-gray-200">
        <div className="flex items-start justify-between mb6">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-lg font-semibold bg-gray-200 text-gray-700">
                AB
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-[18px] font-medium leading-[100%] text-[#343434]">
                {customer?.fullname}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Mail className="w-4 h-4 text-[#808080]" />
                <span className="text-[12px] font-medium leading-[100%] text-[#1A1A1A]">
                  {customer?.email}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="w-4 h-4 text-[#808080]" />
                <span className="text-[12px] font-medium leading-[100%] text-[#1A1A1A]">
                  {customer?.phone}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[#1A1A1A]">
                <Calendar className="w-4 h-4 text-[#808080]" />
                <span className="text-[12px] font-medium leading-[100%] text-[#1A1A1A]">
                  Member since{" "}
                  {new Date(customer?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-[16px] font-bold mb-[8px] text-[#1A1A1A] leading-[100%]">
                {customer?.totalOrders}
              </p>
              <p className="text-sm font-normal leading-[100%] text-[#4D4D4D]">
                Total Orders
              </p>
            </div>
            <div className="text-right">
              <p className="text-[16px] font-bold mb-[8px] text-[#1A1A1A] leading-[100%]">{`₦ ${customer?.totalSpent}`}</p>
              <p className="text-sm font-normal leading-[100%] text-[#4D4D4D]">
                Total Spent
              </p>
            </div>
            <div className="text-right">
              <p className="text-[16px] font-bold text-[#1A1A1A] leading-[100%] mb-[8px]">{`₦ ${avgOrder}`}</p>
              <p className="text-sm font-normal leading-[100%] text-[#4D4D4D]">
                Avg. Order
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white mx-6 mt-6 rounded-lg  border-gray-200">
        <div className="flex justify-between px-2 rounded-lg py-2 items-center border-b bg-[#EBEBEB] border-gray-200">
          {["overview", "orders", "activity", "preferences"].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-normal shadow-none text-[#343434] hover:bg-white text-[16px] capitalize transition-colors ${
                activeTab === tab
                  ? "bg-white"
                  : "bg-[#EBEBEB] border-0 shadow-0"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-6 bg-gray-50">
          {activeTab === "overview" && (
            <div className="grid grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card className=" shadow-none p-2">
                <CardHeader className="p-2">
                  <CardTitle className="text-[16px] font-semibold text-gray-900">
                    Contact Information
                  </CardTitle>
                  <CardDescription>Customer's contact details</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 p-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <p className="text-gray-900 mt-1">{customer?.email}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <p className="text-gray-900 mt-1">{customer?.phone}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Joined Date
                    </label>
                    <p className="text-gray-900 mt-1">
                      Member since{" "}
                      {new Date(customer?.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <p className="text-gray-900 mt-1">
                      123 Lekki Avenue Lagos, Lagos 106104
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Metrics */}
              <Card className=" shadow-none p-2">
                <CardHeader className="p-2">
                  <CardTitle className="text-[16px] font-semibold text-gray-900">
                    Customer's Metrics
                  </CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 p-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Lifetime Value
                    </label>
                    <p className="text-gray-900 mt-1 text-lg">{`₦ ${customer?.totalSpent}`}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Repeat Order Rate
                    </label>
                    <p className="text-gray-900 mt-1 text-lg">70%</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Last Order
                    </label>
                    <p className="text-gray-900 mt-1">
                      {new Date(customer?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="text-center py-8 text-gray-600">
              <p>Orders content goes here</p>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="text-center py-8 text-gray-600">
              <p>Activity content goes here</p>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="text-center py-8 text-gray-600">
              <p>Preferences content goes here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
