"use client";
import { StatCard } from "@/components/stat-card";
import { PackageCheck, Layers, Users2, ArrowRight, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/format-number";
import { formatCurrency } from "@/lib/format-currency";
import { useStoreFront } from "@/hooks/use-store-front";
import { useOrder } from "@/hooks/use-order";
import { useCategory } from "@/hooks/use-category";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function StoreFrontStatCard() {
  const { storefrontSummary, isFetchingStorefrontSummary } = useStoreFront();
  const { orderSummary, isFetchingOrderSummary } = useOrder();
  const { inventorySummary, isFetchingInventorySummary } = useCategory();
  const router = useRouter();

  const isLoading = isFetchingStorefrontSummary || isFetchingOrderSummary || isFetchingInventorySummary;

  if (isLoading) {
    return (
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Stats Skeleton */}
          <div className="grid mt-6 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="p-6 border rounded-lg bg-card animate-pulse"
              >
                <Skeleton className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <Skeleton className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
                <Skeleton className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleNavigateToCategories = () => {
    router.push("/dashboard/storefront/manage-categories");
  };

  const stats = [
    {
      title: "Total Products",
      icon: <PackageCheck className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(storefrontSummary?.numberOfProducts || 0),
      note: "Total listed items",
    },
    {
      title: "Categories",
      icon: <Layers className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(storefrontSummary?.numberOfCategories || 0),
      note: "Store sections",
      action: (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNavigateToCategories}
          className="text-white hover:bg-[#5774e8] hover:text-white bg-[#365BEB] rounded-full h-7 text-xs gap-1 mt-2"
        >
          View All
          <ArrowRight className="h-3 w-3" />
        </Button>
      ),
    },
    {
      title: "Total Customers",
      icon: <Users2 className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(storefrontSummary?.numberOfCustomers || 0),
      note: "Unique customers",
    },
    {
      title: "Total Sales",
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      value: formatCurrency(orderSummary?.totalSales || 0),
      note: "Revenue generated",
    },
    {
      title: "Total Value",
      icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
      value: formatCurrency(inventorySummary?.totalValueOfProducts || 0),
      note: "Total stock worth",
    },
  ];

  return (
    <div className="grid mt-6 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}