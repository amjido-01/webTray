"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/types";

export const CustomerColumns = (): ColumnDef<Customer>[] => [
  {
    header: "Order",
    cell: ({ row }) => {
      return (
        <div className="font-medium py-3">
          {(row.index + 1).toString().padStart(2, "0")}
        </div>
      );
    },
  },
  {
    header: "S/N",
    cell: ({ row }) => {
      return (
        <div className="font-medium py-5">
          {(row.index + 1).toString().padStart(2, "0")}
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "customer",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <div className="py-3 text-sm text-gray-600">{customer.fullname}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const customer = row.original;

      return <div className="py-3 text-sm text-gray-600">{customer.email}</div>;
    },
  },
  {
    accessorKey: "totalOrders",
    header: "Total Orders",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="py-3 font-medium">
          {Number(customer.totalOrders).toFixed(2)}
        </div>
      );
    },
  },
];
