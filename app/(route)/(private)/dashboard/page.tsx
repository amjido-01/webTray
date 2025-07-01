
"use client"
import { SectionCards } from "@/components/section-cards";
import { RecentOrdersTable } from "@/components/recent-orders-table";
import { StockAlertTable } from "@/components/stock-alart";
import { useUser } from "@/hooks/useUser";
import DashboardPageSkeleton from "@/components/dashboard-page-skeleton";


export default function DashboardPage() {

  const { dashboard, isFetchingDashboard, dashboardError } = useUser();

  if (isFetchingDashboard) {
        return <DashboardPageSkeleton />;
  }

  if (dashboardError) {
    return (
      <div className="text-red-500 p-4">
        Error loading dashboard data: {dashboardError.message}
      </div>
    );
  }

  const orders = dashboard?.orders ?? []; 

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
     
      <div className="">
        <div className="flex flex-col gap-10">
          <div>
            <RecentOrdersTable data={orders} />
          </div>
          <div>
            <StockAlertTable />
          </div>
        </div>
      </div>
    </div>
  );
}
