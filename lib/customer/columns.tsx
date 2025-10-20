"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/types";
import { getCustomerStatus, getCustomerStatusColor } from "./get-status";

export const CustomerColumns = (): ColumnDef<Customer>[] => [
  {
    header: "S/N",
    cell: ({ row }) => {
      return (
        <div className="font-medium py-3 text-[#999999]">
          {(row.index + 1).toString().padStart(2, "0")}
        </div>
      );
    },
  },
  {
    accessorKey: "fullname",
    header: "Customer Name",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="py-3 text-sm">{customer.fullname}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const customer = row.original;
      return <div className="py-3 text-sm ">{customer.email}</div>;
    },
  },
  {
    accessorKey: "totalOrders",
    header: "Total Order",
    cell: ({ row }) => {
      const customer = row.original;
      return <div className="py-3 font-medium text-[#999999]">{customer.totalOrders}</div>;
    },
  },
  {
    accessorKey: "totalSpent",
    header: "Total Spent(₦)",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="py-3 font-medium">
          {Number(customer.totalSpent).toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const customer = row.original;
      const status = getCustomerStatus(customer.status ?? "inactive");
      return (
        <div className="py-5">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getCustomerStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
];
