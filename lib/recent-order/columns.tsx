"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Order } from "@/types";
import { capitalizeFirstLetter } from "../capitalize";
import { getOrderStatus, getStatusColor } from "../orders/get-status";

export const createRecentOrdersColumns = (): ColumnDef<Order>[] => [
  {
    header: "Order",
    cell: ({ row }) => {
      return (
        <div className="font-medium py-3">
          #{(row.index + 1).toString().padStart(2, "0")}
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="py-3">
          <div className="font-medium">{capitalizeFirstLetter(order.customerName)}</div>
          <div className="text-sm text-gray-500">{order.customerEmail}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const order = row.original;
      const date = new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      return <div className="py-3 text-sm text-gray-600">{date}</div>;
    },
  },
  {
    accessorKey: "orderItems",
    header: "Items",
    cell: ({ row }) => {
      const order = row.original;
      const totalItems = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
      return (
        <div className="py-3">
          <div className="text-sm font-medium">{totalItems} items</div>
        </div>
      );
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const order = row.original;
      const status = getOrderStatus(order.status);
      return (
        <div className="py-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Price ₦",
    cell: ({ row }) => {
      const order = row.original;
      return <div className="py-3 font-medium">₦{Number(order.totalAmount).toFixed(2)}</div>;
    },
  },
];