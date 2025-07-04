"use client"
import { StatCard } from "@/components/stat-card";
import { useCategory } from "@/hooks/use-category";
import { useProduct } from "@/hooks/use-product";
import { TrendingDown, TrendingUp, Package } from "lucide-react";
import { formatNumber } from "@/lib/format-number";
import InventoryPageSkeleton from "../inventory-page-skeleton";
import { PageHeader } from "../page-header";
export default function InventoryStatCard() {
   const {
    inventorySummary,
    isFetchingInventorySummary,
    inventorySummaryError,
  } = useCategory();
  const { isFetchingProducts } = useProduct();

  const isLoading = isFetchingInventorySummary || isFetchingProducts

 if (isLoading) {
      return <InventoryPageSkeleton />;
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
       value: formatNumber(inventorySummary?.noOfProducts || 0),
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
    <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}
