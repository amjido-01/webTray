"use client";


import { TrendingDown, TrendingUp, ShoppingCart } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { OrderManagement } from "@/components/order-managemet";
import OrderProductsTable from "@/components/order-products-table";

const stats = [
  {
    title: "Total Orders",
    icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
    value: 64,
    note: "+4 new this week",
    minWidth: "min-w-[150px]",
  },
  {
    title: "Pending Orders",
    icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
    value: 4,
    note: "Need Attention",
  
  },
  {
    title: "Total Value",
    icon: <TrendingUp className="h-4 w-4 text-green-500" />,
    value: "N200,000",
    note: "Total order value",
  },
  {
    title: "Low Stock Items",
    icon: <TrendingDown className="h-4 w-4 text-red-500" />,
    value: 5,
    note: "Need Attention",
     noteColor: "text-red-500",
  },
];

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <OrderManagement />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}
            </div>
          <OrderProductsTable />
        </div>
      </div>
    </div>
  );
}
