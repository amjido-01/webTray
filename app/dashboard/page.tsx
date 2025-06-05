"use client"
import { orders } from "@/lib/orders"


import { SectionCards } from "@/components/section-cards"
import { RecentOrdersTable } from "@/components/recent-orders-table"
import { StockAlertTable } from "@/components/stock-alart"







export default function DashboardPage() {

  
  return (
    <div className=" flex flex-col  gap-4 py-4 md:gap-6 md:py-6">
      {/* First div: Four section cards */}
   

      <SectionCards />

      {/* Second div: Recent Orders and Stock Alert */}
      <div className="px-4 lg:px-6">
        <div className="">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
            <div>

          <RecentOrdersTable data={orders} />
            </div>
            <div>

          <StockAlertTable data={orders} />
            </div>
          </div>
          <div>
          
          </div>
        </div>
      </div>
    </div>
  )
}
