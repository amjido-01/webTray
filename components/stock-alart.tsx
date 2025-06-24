"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StockAlertsModal } from "./view-all-alert-modal";

interface StockAlert {
  name: string;
  units: number;
  level: "Critical" | "Low Stock" | "Medium Stock";
}

const stockAlerts: StockAlert[] = [
  { name: "Coffee Bean Premium", units: 5, level: "Low Stock" },
  { name: "Organic Milk", units: 10, level: "Medium Stock" },
  { name: "Chocolate Syrup", units: 3, level: "Critical" },
];

const getStockLevelColor = (level: string) => {
  switch (level) {
    case "Critical":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "Medium Stock":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export function StockAlertTable() {
  const [viewAllModal, setViewAllModal] = useState(false);

  return (
    <div className="border">
      <div>
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Stock Alert</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Items that need restocking
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full border-[1px] bordeer-gray-300"
              onClick={() => setViewAllModal(true)}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockAlerts.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.units} units remaining
                    </p>
                  </div>
                  <Badge className={getStockLevelColor(item.level)}>
                    {item.level}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <StockAlertsModal
          isOpen={viewAllModal}
          onOpenChange={setViewAllModal}
          stockAlerts={stockAlerts}
        />
      </div>
    </div>
  );
}
