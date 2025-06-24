"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { ModalForm } from "./modal-form"
import type { Order } from "@/types"

interface DataTableProps {
  data: Order[]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

const formatDate = (dateString: string) => {
  // Extract date and time parts
  const [datePart, timePart] = dateString.split(" | ")
  return { datePart, timePart }
}

const formatDateShort = (dateString: string) => {
  // Convert "June 22, 2024" to "Jun 22"
  const date = new Date(dateString.split(" | ")[0])
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function RecentOrdersTable({ data }: DataTableProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border">
      <div className="">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="border-">Recent Orders</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Latest orders from your store</p>
            </div>
            <Button size="sm" onClick={() => setIsOpen(true)} className="rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="font-normal text-[#4D4D4D] text-[14px]">
                  <tr className="bg-[#F8F8F8]">
                    <th className="text-left py-3 px-2 sm:px-4 w-[80px] sm:w-[100px]">Order ID</th>
                    <th className="text-left py-3 px-2 sm:px-4 min-w-[140px]">Customer</th>
                    <th className="text-left py-3 px-2 sm:px-4 w-[100px] sm:w-[140px]">Date</th>
                    <th className="text-left py-3 px-2 sm:px-4 w-[60px] sm:w-[80px]">Items</th>
                    <th className="text-left py-3 px-2 sm:px-4 w-[80px] sm:w-[100px]">Price ₦</th>
                    <th className="text-left py-3 px-2 sm:px-4 w-[90px] sm:w-[110px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order) => (
                    <tr key={order.id} className="border-b last:border-b-0">
                      <td className="py-3 px-2 sm:px-4 font-normal text-[#676767] text-[14px]">{order.id}</td>
                      <td className="py-3 px-2 sm:px-4">
                        <div className="flex flex-col">
                          <div className="text-[14px] font-normal truncate max-w-[120px] sm:max-w-none">
                            {order.customer}
                          </div>
                          <div className="text-[#808080] text-[10px] font-normal truncate max-w-[120px] sm:max-w-none">
                            {order.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 sm:px-4 font-normal text-[14px] leading-[100%] text-[#1A1A1A]">
                        {/* Mobile: Show short date */}
                        <div className="sm:hidden">
                          <div className="text-[12px]">{formatDateShort(order.date)}</div>
                          <div className="text-[10px] text-[#808080]">{formatDate(order.date).timePart}</div>
                        </div>
                        {/* Desktop: Show full date */}
                        <div className="hidden sm:block">
                          <div className="text-[12px] sm:text-[14px]">{formatDate(order.date).datePart}</div>
                          <div className="text-[10px] text-[#808080]">{formatDate(order.date).timePart}</div>
                        </div>
                      </td>
                      <td className="py-3 px-2 sm:px-4 text-[#999999] text-[14px] sm:text-[15px] leading-[100%] font-normal">
                        {order.items.length}
                        <span className="hidden sm:inline"> items</span>
                      </td>
                      <td className="py-3 px-2 sm:px-4 font-medium text-[12px] sm:text-[14px]">
                        {order.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 sm:px-4">
                        <Badge className={`${getStatusColor(order.status)} text-[10px] sm:text-[12px] px-2 py-1`}>
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <ModalForm
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Create Order"
          submitLabel="Create Order"
          onSubmit={(data) => console.log("Order:", data)}
          fields={[
            {
              id: "customerName",
              label: "Customer Name",
              placeholder: "Enter your customer name",
              required: true,
            },
            {
              id: "price",
              label: "Price",
              type: "currency",
              placeholder: "Enter price",
              required: true,
            },
            {
              id: "status",
              label: "Status",
              type: "select",
              options: ["Processing", "Pending", "Completed"],
              required: true,
            },
          ]}
        />
      </div>
    </div>
  )
}
