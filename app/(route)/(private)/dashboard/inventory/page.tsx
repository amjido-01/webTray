"use client";
import ProductsTable from "@/components/products-table";
import { InventoryManagement } from "@/components/inventory-management";
import { TrendingDown, TrendingUp, Package } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { useCategory } from "@/hooks/useCategory";
import { PageHeader } from "@/components/page-header";
import { formatNumber } from "@/lib/format-number";
// import { formatCurrency } from "@/lib/format-currency";
export default function Page() {
  const {
    inventorySummary,
    isFetchingInventorySummary,
    inventorySummaryError
    // refetchCategories,
  } = useCategory();
console.log(inventorySummary, "jjj")
 

  if (isFetchingInventorySummary) {
    return (
      <div className="">
        <PageHeader
          title="Inventory Management"
          subtitle="Manage your products and track stock levels"
        />

        <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-6 border rounded-lg bg-card animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (inventorySummaryError) {
    return (
      <div className="">
        <PageHeader
          title="Overview"
          subtitle="Manage your products and track stock levels"
        />
        <div className="mt-6 p-4 border border-red-200 rounded-lg bg-red-50">
          <p className="text-red-600">
            Failed to load dashboard data. Please try again.
          </p>
        </div>
      </div>
    );
  }

 

  const stats = [
    {
      title: "Products",
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      value:  formatNumber(inventorySummary?.noOfProducts || 0),
      note: "+4 new this week",
      minWidth: "min-w-[150px]",
    },
    {
      title: "Low Stock Items",
      icon: <TrendingDown className="h-4 w-4 text-red-500" />,
      value: formatNumber(inventorySummary?.noOfLowStocksItems || 0),
      note: "Need Attention",
      noteColor: "text-red-500",
    },
    {
      title: "Total Value",
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      value: formatNumber(inventorySummary?.totalValueOfProducts || 0),
      note: "Inventory Value",
    },
    {
      title: "Category",
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(inventorySummary?.noOfCategories || 0),
      note: "Product Categories",
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <InventoryManagement />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
          <ProductsTable />
        </div>
      </div>
    </div>
  );
}
