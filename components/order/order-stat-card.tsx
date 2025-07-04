"use client"
import { StatCard } from "@/components/stat-card";
import { useOrder } from "@/hooks/use-order";
import { TrendingDown, TrendingUp, ShoppingCart } from "lucide-react";
import { formatNumber } from "@/lib/format-number";
import InventoryPageSkeleton from "../inventory-page-skeleton";
export default function OrderStatCard() {
  const { orderSummary, isFetchingOrderSummary } = useOrder();

  if (isFetchingOrderSummary) {
    return <InventoryPageSkeleton />;
  }

  const stats = [
    {
      title: "Total Orders",
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(orderSummary?.totalNumberOfOrders || 0),
      note: "+4 new this week",
      minWidth: "min-w-[150px]",
    },
    {
      title: "Pending Orders",
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(orderSummary?.totalNumberOfPendingOrders || 0),
      note: "Need Attention",
    },
    {
      title: "Total Value",
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      value: formatNumber(orderSummary?.totalSales || 0),
      note: "Total order value",
    },
    {
      title: "Low Stock Items",
      icon: <TrendingDown className="h-4 w-4 text-red-500" />,
      value: formatNumber(orderSummary?.totalNumberOfLowStockItems || 0),
      note: "Need Attention",
      noteColor: "text-red-500",
    },
  ];
  return (
    <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}
