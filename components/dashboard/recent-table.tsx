"use client";
import { useState } from "react";
import { useOrder } from "@/hooks/use-order";
import { DataTable } from "@/lib/orders/data-table";
import { createRecentOrdersColumns } from "@/lib/recent-order/columns";
import { TableSkeleton } from "../table-skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/capitalize";
import { useCategory } from "@/hooks/use-category";

export default function RecentOrdersTable() {
  const { categories } = useCategory();
  const { orders, ordersError, isFetchingOrders } = useOrder();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const formattedOrders = orders?.map((order) => {
    return {
      ...order,
      orderId: order.id,
      customerName: order.customer?.fullname || "Unknown Customer",
      customerEmail: order.customer?.email || "No email",
      date: new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      items: order.orderItems || [],
      total: Number(order.totalAmount) || 0,
      storeId: order.storeId,
      customerId: order.customerId,
      updatedAt: order.updatedAt,
      customer: order.customer || null,
      orderItems: order.orderItems || [],
    };
  })
  // we need some adjustment from the api data.
//   .filter(order => {
//     // Category filter - you may need to adjust this based on your actual data structure
//     // This assumes orders have a categoryId or you can derive category from orderItems
//     const matchesCategory = selectedCategory === "all" || 
//       order.orderItems?.some(item => item.product?.categoryId?.toString() === selectedCategory);
    
//     return matchesCategory;
//   })
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by newest first
  .slice(0, 5) || []; // Get only the recent 5 orders

  const columns = createRecentOrdersColumns();

  if (isFetchingOrders) return <TableSkeleton />
  if (ordersError) return <div>Error loading orders</div>;

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium text-gray-800">Recent Orders</h1>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-56 bg-white border border-gray-200 rounded-full h-10">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {capitalizeFirstLetter(category.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <DataTable columns={columns} data={formattedOrders} />
      </div>
    </div>
  );
}