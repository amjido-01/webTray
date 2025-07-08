"use client";
import { TrendingUp, UserIcon } from "lucide-react";
import { PageHeader } from "./page-header";
import { StatCard } from "./stat-card";

import { formatCurrency } from "@/lib/format-currency";
import Image from "next/image";
import { useCustomer } from "@/hooks/use-customer";
export function SectionCards() {
  const { CustomerSummary, customerSummaryError, isFetchingCustomerSummary } =
    useCustomer();


  if (isFetchingCustomerSummary) {
    return (
      <div className="">
        <PageHeader
          title="Customer Management"
          subtitle="Track customer activity and manage relationships with ease."
        />

        <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Loading skeleton cards */}
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

  if (customerSummaryError) {
    return (
      <div className="">
        <PageHeader
          title="Customer Management"
          subtitle="Track customer activity and manage relationships with ease."
        />
        <div className="mt-6 p-4 border border-red-200 rounded-lg bg-red-50">
          <p className="text-red-600">
            Failed to load customers data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const stats = [
    {
      title: "Total Customers",
      icon: (
        <Image
          src="/icons/user-multiple.png"
          alt="logo"
          width={20}
          height={20}
        />
      ),
      value: formatCurrency(CustomerSummary?.totalCustomer || 0),
      note: "+32.6% from last month", // You can calculate this if you have previous period data
    },
    {
      title: "New Customers",
      value: formatNumber(CustomerSummary?.newCustomer || 0),
      note: "+8% from last month",
      icon: <TrendingUp className="h-4 w-4 text-green-600" />,
    },
    {
      title: "Retention Rate",
      value: CustomerSummary?.retentionRate || 0,
      note: "+4 new this week",
      icon: <Image src="/icons/Group.png" alt="logo" width={20} height={20} />,
    },
    {
      title: "Top Spender",
      value: formatNumber(CustomerSummary?.topSpenders.totalSpent || 0),
      note: `${CustomerSummary?.topSpenders.name}`,
      icon: <UserIcon className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="">
      <PageHeader
        title="Customer Management"
        subtitle="Track customer activity and manage relationships with ease."
      />

      <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  );
}
