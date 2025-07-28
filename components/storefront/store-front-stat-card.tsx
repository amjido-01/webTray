"use client";

import { StatCard } from "@/components/stat-card";
import { PackageCheck, Layers, Users2 } from "lucide-react";
import { formatNumber } from "@/lib/format-number";

export default function StoreFrontStatCard() {
  const stats = [
    {
      title: "Total Products",
      icon: <PackageCheck className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(1280),
      note: "+25 added this month",
    },
    {
      title: "Featured Products",
      icon: <Layers className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(1456),
      note: "+8% from last month",
    },
    {
      title: "Categories",
      icon: <Layers className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(14),
      note: "Grouped by type",
    },
    {
      title: "Total Customers",
      icon: <Users2 className="h-4 w-4 text-muted-foreground" />,
      value: formatNumber(543),
      note: "Active users this quarter",
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
