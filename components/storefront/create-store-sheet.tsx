"use client";

import { useEffect, useState, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ShoppingCart,
  SettingsIcon,
  Package,
  CreditCard,
  Truck,
  Globe,
  Loader2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface CreateStoreFormData {
  storeName: string;
  description: string;
  slogan: string;
  customDomain: string;
  paymentMethods: { cash: boolean; card: boolean };
  deliveryOptions: { pickup: boolean; delivery: boolean };
  status: "active" | "inactive";
  currency: string;
}

interface CreateStoreSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode?: boolean;
  initialData?: Partial<CreateStoreFormData>;
  onSubmit: (data: CreateStoreFormData) => Promise<void>;
  isSubmitting?: boolean;
}

const defaultFormData: CreateStoreFormData = {
  storeName: "",
  description: "",
  slogan: "",
  customDomain: "",
  paymentMethods: { cash: false, card: false },
  deliveryOptions: { pickup: false, delivery: false },
  status: "active",
  currency: "NGN",
};

export function CreateStoreSheet({
  isOpen,
  onOpenChange,
  isEditMode = false,
  initialData,
  onSubmit,
  isSubmitting = false,
}: CreateStoreSheetProps) {
  const [formData, setFormData] = useState<CreateStoreFormData>(defaultFormData);
  const [uiOptions, setUiOptions] = useState({
    paystack: false,
    bankTransfer: false,
    cashOnDelivery: false,
    inHouse: false,
    thirdParty: [] as string[],
  });

  const initializedForRef = useRef<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Create a unique key for this initialization session
      const currentKey = isEditMode ? `edit-${initialData?.storeName}` : "new";
      
      // Only initialize if we haven't already for this session
      if (initializedForRef.current !== currentKey) {
        if (isEditMode && initialData) {
          setFormData({
            ...defaultFormData,
            ...initialData,
            paymentMethods: {
              cash: false,
              card: false,
              ...initialData.paymentMethods,
            },
            deliveryOptions: {
              pickup: false,
              delivery: false,
              ...initialData.deliveryOptions,
            },
          });

          setUiOptions({
            paystack: initialData.paymentMethods?.card || false,
            bankTransfer: initialData.paymentMethods?.cash || false,
            cashOnDelivery: false,
            inHouse: initialData.deliveryOptions?.pickup || false,
            thirdParty: initialData.deliveryOptions?.delivery ? ["external"] : [],
          });
        } else {
          setFormData(defaultFormData);
          setUiOptions({
            paystack: false,
            bankTransfer: false,
            cashOnDelivery: false,
            inHouse: false,
            thirdParty: [],
          });
        }
        initializedForRef.current = currentKey;
      }
    } else {
      initializedForRef.current = null;
    }
  }, [isOpen, initialData, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateStoreFormData = {
      ...formData,
      paymentMethods: {
        card: uiOptions.paystack,
        cash: uiOptions.bankTransfer || uiOptions.cashOnDelivery,
      },
      deliveryOptions: {
        pickup: uiOptions.inHouse,
        delivery: uiOptions.thirdParty.length > 0,
      },
    };
    await onSubmit(payload);
  };

  const thirdPartyServices = [
    { id: "gokada", label: "Gokada" },
    { id: "bolt", label: "Bolt Food" },
    { id: "jumia", label: "Jumia Food" },
    { id: "glovo", label: "Glovo" },
  ];

  const handleThirdPartyChange = (serviceId: string, checked: boolean) => {
    setUiOptions((prev) => ({
      ...prev,
      thirdParty: checked
        ? [...prev.thirdParty, serviceId]
        : prev.thirdParty.filter((id) => id !== serviceId),
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="sm:max-w-[540px] p-0 flex flex-col h-full h-[100dvh] bg-white outline-none"
      >
        <SheetHeader className="p-6 border-b shrink-0">
          <SheetTitle className="text-xl font-bold">
            {isEditMode ? "Edit Store Info" : "Create New Store"}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "Update your store configuration and preferences."
              : "Configure your new online store by mirroring your onboarding setup."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full min-h-0 overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
            <div className="space-y-8 p-6">
              {/* Step 2 mirrored: Store Setup */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900">Store Setup</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name*</Label>
                    <Input
                      id="storeName"
                      placeholder="My Store Name"
                      required
                      value={formData.storeName}
                      onChange={(e) =>
                        setFormData({ ...formData, storeName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slogan">Slogan (Optional)</Label>
                    <Input
                      id="slogan"
                      placeholder="Fresh and fast"
                      value={formData.slogan}
                      onChange={(e) =>
                        setFormData({ ...formData, slogan: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customDomain">Custom Domain (Optional)</Label>
                    <div className="flex items-center gap-2 border rounded-md px-3 bg-gray-50/50">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="customDomain"
                        className="border-0 bg-transparent px-0 focus-visible:ring-0"
                        placeholder="yourstore.com"
                        value={formData.customDomain}
                        onChange={(e) =>
                          setFormData({ ...formData, customDomain: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency*</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(val) =>
                        setFormData({ ...formData, currency: val })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (About the store)*</Label>
                  <Textarea
                    id="description"
                    placeholder="Briefly describe what your store sells..."
                    required
                    className="min-h-[80px]"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="rounded-lg bg-[#D8DFFB] p-4">
                  <div className="flex gap-3">
                    <ShoppingCart className="w-5 h-5 text-[#365BEB]" />
                    <div>
                      <h4 className="font-medium text-[#202E4B] pb-1 text-[14px]">
                        Store Features
                      </h4>
                      <p className="text-[12px] text-[#202E4B]">
                        Your store will include product management, order
                        tracking, customer accounts, and analytics dashboards to
                        help you grow your business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Step 3 mirrored: Payment & Delivery */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900">Payment & Delivery</h3>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Payment Methods*</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id="paystack"
                        checked={uiOptions.paystack}
                        onCheckedChange={(c) => setUiOptions({...uiOptions, paystack: !!c})}
                      />
                      <div className="flex flex-col">
                        <Label htmlFor="paystack" className="font-medium cursor-pointer">Paystack</Label>
                        <span className="text-xs text-muted-foreground">Accept card payments online via Paystack</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id="bankTransfer"
                        checked={uiOptions.bankTransfer}
                        onCheckedChange={(c) => setUiOptions({...uiOptions, bankTransfer: !!c})}
                      />
                      <div className="flex flex-col">
                        <Label htmlFor="bankTransfer" className="font-medium cursor-pointer">Bank Transfer</Label>
                        <span className="text-xs text-muted-foreground">Customers can pay direct to your account</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Delivery Options*</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-blue-50/50 border-blue-100">
                      <Checkbox
                        id="inHouse"
                        checked={uiOptions.inHouse}
                        onCheckedChange={(c) => setUiOptions({...uiOptions, inHouse: !!c})}
                      />
                      <Label htmlFor="inHouse" className="font-medium cursor-pointer flex items-center gap-2">
                        <Truck className="w-4 h-4 text-blue-600" />
                        In-house Delivery
                      </Label>
                    </div>

                    <div className="space-y-3 pt-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Third-Party Services
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {thirdPartyServices.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center space-x-3 p-2 border rounded-md hover:bg-gray-50"
                          >
                            <Checkbox
                              id={service.id}
                              checked={uiOptions.thirdParty.includes(service.id)}
                              onCheckedChange={(c) =>
                                handleThirdPartyChange(service.id, !!c)
                              }
                            />
                            <Label htmlFor={service.id} className="text-sm cursor-pointer">{service.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-[#D8DFFB] p-4 pb-8">
                  <div className="flex gap-3">
                    <SettingsIcon className="w-5 h-5 text-[#365BEB]" />
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
              </div>
            </div>
          </div>

          <div className="p-6 border-t bg-gray-50 shrink-0 flex gap-4 mt-auto">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-full py-6"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-full py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isEditMode ? (
                "Update Store"
              ) : (
                "Create Store"
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
