"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/hooks/use-customer-orders";

const DEFAULT_COLOR = { bg: "#F3F4F6", text: "#4D4D4D", border: "#D1D5DB" };

const STATUS_COLORS: Record<string, { bg: string; text: string; }> = {
  processing: { bg: "#FDE8E8", text: "#000000" },
  shipped:    { bg: "#F8F8F8", text: "#000000" },
  delivered:  { bg: "#CDFBEC", text: "#000000" },
  cancelled:  { bg: "#EF4444", text: "#ffffff" },
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const formatCurrency = (amount: number) =>
  amount.toLocaleString("en-NG", { minimumFractionDigits: 2 });

export const createStorefrontOrderColumns = (): ColumnDef<Order>[] => [
  {
    id: "serialNumber",
    header: "S/N",
    cell: ({ row }) => (
      <div className="font-medium text-sm text-gray-500 py-4">
        {String(row.index + 1).padStart(2, "0")}
      </div>
    ),
  },
  {
    accessorKey: "orderNumber",
    header: "Order No",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="py-4">
          <p className="text-sm font-semibold text-[#4D4D4D]">{order.orderNumber}</p>
          <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "itemCount",
    header: "Items",
    cell: ({ row }) => (
      <div className="py-4 text-sm text-[#4D4D4D] font-medium">
        {row.original.itemCount}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const colors = STATUS_COLORS[status] ?? DEFAULT_COLOR;
      return (
        <div className="py-4">
          <span
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
            }}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[14px] font-medium border"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: () => <span className="block text-right">Total ₦</span>,
    cell: ({ row }) => (
      <div className="py-4 text-sm font-semibold text-[#4D4D4D] text-right">
        {formatCurrency(row.original.total)}
      </div>
    ),
  },
];
