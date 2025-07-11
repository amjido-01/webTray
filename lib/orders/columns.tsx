// columns.ts
"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Order } from "@/types";
import { capitalizeFirstLetter } from "../capitalize";
import { getOrderStatus, getStatusColor } from "./get-status";



export const createColumns = (): ColumnDef<Order>[] => [
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
];