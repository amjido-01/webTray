"use client";

import StoreFrontHeader from "@/components/storefront/store-front-header";
import { Edit, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
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
import { DomainSettingsSheet } from "@/components/storefront/domain-settings-sheet";
import { ModalForm } from "@/components/modal-form";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { StoreFrontSkeleton } from "@/components/storefront/store-front-skeleton";

export default function Page() {
  // Use the safe hook to get activeStore
  const { activeStore, isLoading: storeLoading } = useActiveStore();
  const [isOpen, setIsOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [shouldClearForm, setShouldClearForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialFormData, setInitialFormData] = useState<
    Record<string, string>
  >({});

  const [pendingOnlineStatus, setPendingOnlineStatus] = useState<
    boolean | null
  >(null);

  const { storeInfo, isFetchingStoreInfo, changeStoreStatus, isUpdatingStoreStatus } =
    useStoreFront();

  console.log(storeInfo);

 if (storeLoading || isFetchingStoreInfo) {
    return <StoreFrontSkeleton />;
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
  console.log("Active Store:", storeInfo);

  const storeId = storeInfo?.store?.id ?? activeStore.id;
  const isStoreOnline = storeInfo?.store?.online ?? false;

  const displayOnlineStatus =
    isUpdatingStoreStatus && pendingOnlineStatus !== null
      ? pendingOnlineStatus
      : isStoreOnline;

  const handleToggleStoreOnline = async (checked: boolean) => {
    if (!storeId || isUpdatingStoreStatus) return;

    // ✅ Set pending status immediately
    setPendingOnlineStatus(checked);

    try {
      await changeStoreStatus({ storeId, onlineStatus: checked });
      // ✅ Clear pending status on success
      setPendingOnlineStatus(null);
    } catch (err) {
      console.error("Failed to change store status:", err);
      // ✅ Clear pending status on error (will revert to actual status)
      setPendingOnlineStatus(null);
    }
  };

  // Generate store domain safely
  const defaultDomain = `${activeStore.storeName
    ?.replace(/\s+/g, "")
    .toLowerCase()}@webtry.com`;

  const customDomain = storeInfo?.store?.customDomain || defaultDomain;

  const handleUpdate = async () => {};

  const handleEditStoreClick = () => {
    setIsEditMode(true);
    // Populate initial data from store info
    setInitialFormData({
      name: storeInfo?.store?.storeName || activeStore.storeName || "",
      description:
        storeInfo?.store?.slogan ||
        "Premium coffee and fresh pastries delivered to your door",
      domain: defaultDomain,
    });
    setIsOpen(true);
  };

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
                  {isUpdatingStoreStatus ? (
                    <div className="flex items-center gap-2">
                      <p className="text-[16px] leading-[24px] font-normal">
                        Updating...
                      </p>
                      <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                    </div>
                  ) : (
                    <p className="text-[16px] leading-[24px] font-normal">
                      {isStoreOnline ? "Store online" : "Store offline"}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={isStoreOnline}
                      onCheckedChange={handleToggleStoreOnline}
                      disabled={isUpdatingStoreStatus}
                      aria-label="Toggle store online"
                    />
                  </div>
                </div>
              </CardTitle>
              <CardDescription>
                Your store is live and accepting orders
              </CardDescription>
              <CardContent className="flex p-0 gap-[10px] items-center">
                <Badge variant="default" className="rounded-full">
                  {isStoreOnline ? "Online" : "Offline"}
                </Badge>
                <Button
                  variant="link"
                  className={`text-[#365BEB] hover:no-underline cursor-pointer font-normal text-[16px] ${!isStoreOnline && "line-through text-gray-400 decoration-2 decoration-red-500"}`}
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
                  onClick={handleEditStoreClick}
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

                <DomainSettingsSheet />
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

      <ModalForm
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setIsEditMode(false);
            setInitialFormData({});
          }
        }}
        title={isEditMode ? "Edit Store Info" : "Add new store"}
        submitLabel={isEditMode ? "Update Store" : "Add store"}
        onSubmit={handleUpdate}
        validationErrors={validationErrors}
        shouldClearForm={shouldClearForm}
        onFormCleared={() => setShouldClearForm(false)}
        initialData={initialFormData} // Add this prop
        fields={[
          {
            id: "name",
            label: "Store Name",
            required: true,
            placeholder: "Enter store name",
          },
          {
            id: "description",
            label: "Description",
            type: "textarea",
            placeholder: "Enter store description",
            required: false,
          },
          {
            id: "domain",
            label: "Domain",
            placeholder: "Enter domain name",
            required: true,
          },
        ]}
      />
    </div>
  );
}
