
// "use client"
import { SectionCards } from "@/components/section-cards";
import { StockAlertTable } from "@/components/stock-alart";
import RecentOrdersTable from "@/components/dashboard/recent-table";


export default function DashboardPage() {

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
     
      <div className="">
        <div className="flex flex-col md:flex-row gap-10 md:gap-2">
          <div className="md:w-1/2">
            <RecentOrdersTable />
          </div>
          <div className="md:w-1/2">
            <StockAlertTable />
          </div>
        </div>
      </div>
    </div>
  );
}
