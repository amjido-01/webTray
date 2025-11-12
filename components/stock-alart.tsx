"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StockAlertsModal } from "./view-all-alert-modal";
import { useCategory } from "@/hooks/use-category";
import { useProduct } from "@/hooks/use-product";
import { useState } from "react";

const getStockLevel = (quantity: number) => {
  if (quantity === 0) return "Out of Stock";
  if (quantity <= 3) return "Critical";
  if (quantity <= 10) return "Low Stock";
  return "In Stock";
};

const getStockBadgeColor = (quantity: number) => {
  if (quantity === 0) return "bg-red-500 text-white";
  if (quantity <= 3) return "bg-[#EF4444] text-[#FFFFFF]";
  if (quantity <= 10) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
};

export function StockAlertTable() {
  const {} = useCategory();
  const { products } = useProduct();
  const [viewAllModal, setViewAllModal] = useState(false);

  const lowProducts = products?.filter((item) => item.quantity < 10);

  // Transform lowProducts into the format expected by StockAlertsModal
  const stockAlerts = lowProducts?.map((product) => ({
    name: product.name,
    units: product.quantity,
    level: getStockLevel(product.quantity) as "Critical" | "Low Stock" | "Medium Stock",
  })) || [];

  if (!lowProducts || lowProducts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Stock Alert</CardTitle>
            <p className="text-sm text-muted-foreground">
              Items that need restocking
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewAllModal(true)}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowProducts?.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} units remaining
                </p>
              </div>
              <Badge
                variant="secondary"
                className={`${getStockBadgeColor(
                  item.quantity
                )} px-[12px] py-[4px] rounded-full`}
              >
                {getStockLevel(item.quantity)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      
      {/* Pass the required props */}
      <StockAlertsModal 
        isOpen={viewAllModal} 
        onOpenChange={setViewAllModal}
        stockAlerts={stockAlerts}
      />
    </Card>
  );
}