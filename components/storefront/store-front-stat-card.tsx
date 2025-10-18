"use client";

import { StatCard } from "@/components/stat-card";
import { PackageCheck, Layers, Users2 } from "lucide-react";
import { formatNumber } from "@/lib/format-number";
import { useStoreFront } from "@/hooks/use-store-front";
import InventoryPageSkeleton from "../inventory-page-skeleton";
export default function StoreFrontStatCard() {
  const { storefrontSummary, isFetchingStorefrontSummary } = useStoreFront();

   if (isFetchingStorefrontSummary) {
      return <InventoryPageSkeleton />;
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
