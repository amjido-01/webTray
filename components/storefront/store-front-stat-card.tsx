"use client";

import { StatCard } from "@/components/stat-card";
import { PackageCheck, Layers, Users2 } from "lucide-react";
import { formatNumber } from "@/lib/format-number";
import { useStoreFront } from "@/hooks/use-store-front";
import { Skeleton } from "../ui/skeleton";
// import InventoryPageSkeleton from "../inventory-page-skeleton";
export default function StoreFrontStatCard() {
  const { storefrontSummary, isFetchingStorefrontSummary } = useStoreFront();

  if (isFetchingStorefrontSummary) {
    return (
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Stats Skeleton */}
          <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
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

  console.log("Storefront Summary:", storefrontSummary);
  const stats = [
    {
      title: "Total Products",
      icon: <PackageCheck className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(storefrontSummary?.numberOfProducts || 0),
      note: "+25 added this month",
    },
    {
      title: "Categories",
      icon: <Layers className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(storefrontSummary?.numberOfCategories || 0),
      note: "+8% from last month",
    },
    {
      title: "Total Customers",
      icon: <Users2 className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(storefrontSummary?.numberOfCustomers || 0),
      note: "Active users this quarter",
    },
  ];

  return (
    <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}
