"use client";

import { useAuthStore } from "@/store/useAuthStore";
import StoreFrontHeader from "@/components/storefront/store-front-header";
import { Edit, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useStoreFront } from "@/hooks/use-store-front";
import { useActiveStore } from "@/hooks/use-active-store";

export default function Page() {
  // Use the safe hook to get activeStore
  const { activeStore, isLoading: storeLoading } = useActiveStore();
  
  const { storeInfo } = useStoreFront();

  console.log("Storefront page:", { activeStore, storeInfo });

  // Show loading state while store is being fetched
  if (storeLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading store...</p>
        </div>
      </div>
    );
  }

  // Guard: Ensure we have an active store
  if (!activeStore) {
    return (
      <div className="p-6">
        <Card className="shadow-none rounded-none">
          <CardHeader className="text-center">
            <CardTitle className="text-[#4D4D4D] font-bold text-[20px]">
              No Active Store
            </CardTitle>
            <CardDescription>
              Please select or create a store to continue.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Generate store domain safely
  const defaultDomain = `${activeStore.storeName
    ?.replace(/\s+/g, "")
    .toLowerCase()}@webtry.com`;

  const customDomain = storeInfo?.store?.customDomain || defaultDomain;

  return (
    <div>
      <StoreFrontHeader />
      <div className="mt-[20px]">
        {!storeInfo ? (
          <Card className="shadow-none rounded-none">
            <CardHeader className="text-center leading-[24px]">
              <CardTitle className="text-[#4D4D4D] font-bold text-[20px]">
                No Storefronts Yet
              </CardTitle>
              <CardDescription>
                You don't have an active stores yet.
                <button className="text-[#365BEB] ml-1 cursor-pointer font-normal text-[16px]">
                  Create new store
                </button>
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <Card className="shadow-none rounded-none">
            <CardHeader className="leading-[24px]">
              <CardTitle className="text-[#4D4D4D] flex justify-between">
                <p className="font-bold text-[20px]">
                  {storeInfo?.store?.storeName || activeStore.storeName}
                </p>

                <div className="flex items-center gap-[8px]">
                  <p className="text-[16px] leading-[24px] font-normal">
                    Store online
                  </p>
                  <Switch />
                </div>
              </CardTitle>
              <CardDescription>
                Your store is live and accepting orders
              </CardDescription>
              <CardContent className="flex p-0 gap-[10px] items-center">
                <Button size="sm" className="rounded-full">
                  Online
                </Button>
                <Button
                  variant="link"
                  className="text-[#365BEB] hover:no-underline cursor-pointer font-normal text-[16px]"
                >
                  <Globe className="text-black" />
                  {customDomain}
                </Button>
              </CardContent>
            </CardHeader>
          </Card>
        )}
      </div>

      <div className="container mx-auto mt-[24px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Store Information Card */}
          <Card className="flex flex-col shadow-none rounded-none">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Store Information
              </CardTitle>
              <p className="text-sm text-gray-600">
                Basic details about your store
              </p>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Store Name</h3>
                <p className="text-gray-600">
                  {storeInfo?.store?.storeName || activeStore.storeName}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Description</h3>
                <p className="text-gray-600">
                  {/* {storeInfo?.store?.description || */}
                    Premium coffee and fresh pastries delivered to your door
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Domain</h3>
                <p className="text-gray-600">{defaultDomain}</p>
              </div>
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full rounded-full bg-transparent"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Store Info
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Two Cards Stacked */}
          <div className="space-y-6">
            {/* Manage Products Card */}
            <Card className="flex flex-col shadow-none rounded-none">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Manage Products
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Add, edit and organize your store products
                  </p>
                </div>
                <Link href="/dashboard/storefront/manage-product">
                  <Button
                    className="rounded-full border-black"
                    variant="outline"
                    size="sm"
                  >
                    Manage Products
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {storeInfo?.productCount || 0}
                  </div>
                  <p className="text-gray-500">Products listed</p>
                </div>
              </CardContent>
            </Card>

            {/* Domain Settings Card */}
            <Card className="flex flex-col shadow-none rounded-none">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Domain Settings
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Configure your custom domain
                  </p>
                </div>
                <Button className="rounded-full" variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Domain
                </Button>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      {defaultDomain}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Default Domain</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}