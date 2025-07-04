// columns.ts
"use client"
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { SquarePen, Trash2 } from "lucide-react";
import { Order } from "@/types";
import { capitalizeFirstLetter } from "../capitalize";
import { getOrderStatus, getStatusColor } from "./get-status";

export type ColumnHandlers = {
  handleEdit: (order: Order) => void;
  handleDelete: (order: Order) => void;
};

export const createColumns = (handlers: ColumnHandlers): ColumnDef<Order>[] => [
  {
    header: "Order ID",
    cell: ({ row }) => {
      return (
        <div className="font-normal py-5 text-[#676767] text-sm leading-[100%]">
          {(row.index + 1).toString().padStart(2, "0")}
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const order = row.original;
      // Safe access with fallbacks
            
      return (
        <div className="py-5 leading-[100%] ">
          <div className=" font-normal text-sm text-[#1A1A1A]">{capitalizeFirstLetter(order.customerName)}</div>
          <div className="text-[10px] font-normal text-[#808080]">{order.customerEmail}</div>
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
      return <div className="py-5 text-[#1A1A1A] font-normal text-sm leading-[100%] ">{date}</div>;
    },
  },
  {
    accessorKey: "orderItems",
    header: "Items",
    cell: ({ row }) => {
      const order = row.original;
      const totalItems = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
      return (
        <div className="py-5">
          <div className="font-normal text-[16px] text-[#999999] leading-[100%]">{totalItems} items</div>
        </div>
      );
    },
  },
//   <span className="text-[#000000">₦</span>
  {
    accessorKey: "totalAmount",
    header: "Total ₦",
    cell: ({ row }) => {
      const order = row.original;
      return <div className="font-normal text-[16px] leading-[100%]">{Number(order.totalAmount).toFixed(2)}</div>;
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const order = row.original;
      const status = getOrderStatus(order.status);
      return (
        <div className="py-5">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="text-right py-5">
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-blue-600"
              onClick={() => handlers.handleEdit(order)}
            >
              <SquarePen className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-red-600"
              onClick={() => handlers.handleDelete(order)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    },
  },
];