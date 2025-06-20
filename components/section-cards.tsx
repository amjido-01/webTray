"use client"
import { TrendingUp, ShoppingCart, Package, Users } from "lucide-react"
import { PageHeader } from "./page-header"
import { StatCard } from "./stat-card"
import { useUser } from "@/hooks/useUser";


export function SectionCards() {
  const { dashboard, isFetchingDashboard, dashboardError } = useUser();

   if (isFetchingDashboard) {
    return (
      <div className="">
        <PageHeader
          title="Overview"
          subtitle="Manage your products and track stock levels"
        />
        <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Loading skeleton cards */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 border rounded-lg bg-card animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

   // Handle error state
  if (dashboardError) {
    return (
      <div className="">
        <PageHeader
          title="Overview"
          subtitle="Manage your products and track stock levels"
        />
        <div className="mt-6 p-4 border border-red-200 rounded-lg bg-red-50">
          <p className="text-red-600">Failed to load dashboard data. Please try again.</p>
        </div>
      </div>
    );
  }

   // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };


   const stats = [
    {
      title: "Total Revenue",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      value: formatCurrency(dashboard?.totalRevenue || 0),
      note: "+32.6% from last month", // You can calculate this if you have previous period data
    },
    {
      title: "Orders",
      value: formatNumber(dashboard?.noOfOrders || 0),
      note: "+8% from last month",
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Products",
      value: formatNumber(dashboard?.noOfProducts || 0),
      note: "+4 new this week",
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Customers",
      value: formatNumber(dashboard?.noOfCustomers || 0),
      note: "+200 new this week",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="">
      <PageHeader 
         title="Overview"
        subtitle="Manage your products and track stock levels"
      />
      <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
         {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  )
}
