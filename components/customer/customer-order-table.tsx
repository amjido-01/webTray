"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { TableSkeleton } from "../table-skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/lib/customer/data-table";
import { useCustomer } from "@/hooks/use-customer";
import { customerOrderColumns } from "@/lib/customer/customer-order-columns";
import type { Order } from "@/types";

export default function CustomerOrdersTable({ customerId }: { customerId: number }) {
  const { useCustomerOrdersQuery } = useCustomer();
  const ordersQuery = useCustomerOrdersQuery(customerId);

  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const orders = useMemo(() => {
    return (ordersQuery.data ?? []) as Order[];
  }, [ordersQuery.data]);

  // Counts for status filter
  const statusCounts = useMemo(() => {
    const counts = { all: orders.length, pending: 0, completed: 0, cancelled: 0 };
    orders.forEach((o) => {
      const s = String(o.status || "").toLowerCase();
      if (s === "pending") counts.pending += 1;
      else if (s === "completed") counts.completed += 1;
      else if (s === "cancelled" || s === "canceled") counts.cancelled += 1;
    });
    return counts;
  }, [orders]);

  // Filtered orders by status
  const filteredOrders = useMemo(() => {
    if (selectedStatus === "all") return orders;
    return orders.filter((o) => {
      const s = String(o.status || "").toLowerCase();
      if (selectedStatus === "cancelled") return s === "cancelled" || s === "canceled";
      return s === selectedStatus;
    });
  }, [orders, selectedStatus]);

  // Loading
  if (ordersQuery.isLoading) {
    return <TableSkeleton />;
  }

  // Error
  if (ordersQuery.isError) {
    return (
      <div className="p-6 bg-white rounded shadow-sm text-center text-red-600">
        <p className="font-medium">Failed to load orders</p>
        <p className="text-sm mt-1">{(ordersQuery.error as Error)?.message || "An error occurred"}</p>
      </div>
    );
  }

  // Empty result
  if (!orders.length) {
    return (
      <div className="p-6 bg-white rounded shadow-sm text-center text-gray-600">
        <p className="font-medium">No orders yet</p>
        <p className="text-sm mt-1">Customer has not placed any orders.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-xl font-medium text-gray-800">
            Orders ({filteredOrders.length}/{orders.length})
          </h1>

          <div className="flex gap-3 items-center w-full md:w-auto">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-56 bg-white border border-gray-200 rounded-full h-10">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ({statusCounts.all})</SelectItem>
                <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
                <SelectItem value="completed">Completed ({statusCounts.completed})</SelectItem>
                <SelectItem value="cancelled">Cancelled ({statusCounts.cancelled})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DataTable columns={customerOrderColumns} data={filteredOrders} />
      </div>
    </div>
  );
}