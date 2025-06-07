"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateOrderModal } from "./add-order-modal";

interface Order {
  id: string;
  customer: string;
  status: "Processing" | "Completed" | "Pending";
  price: number;
}

interface DataTableProps {
  data: Order[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export function RecentOrdersTable({ data }: DataTableProps) {
  const [isAddStoreModalOpen, setIsAddStoreModalOpen] = useState(false);

  return (
    <div className="">
      <div className="">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="border-">Recent Orders</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Latest orders from your store
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setIsAddStoreModalOpen(true)}
              className="rounded-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className=" bg-[#F8F8F8]">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Order
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">
                      Price ₦
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order) => (
                    <tr key={order.id} className="border-b last:border-b-0">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {order.customer}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {order.price.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <CreateOrderModal
          isOpen={isAddStoreModalOpen}
          onOpenChange={setIsAddStoreModalOpen}
        />
      </div>
    </div>
  );
}
