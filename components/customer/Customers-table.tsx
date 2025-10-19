"use client";
import { useState, useMemo } from "react";
import { TableSkeleton } from "../table-skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/capitalize";
import { useCustomer } from "@/hooks/use-customer";
import { CustomerColumns } from "@/lib/customer/columns";
import { DataTable } from "@/lib/customer/data-table";

export default function CustomerTable() {
  const { Customers, customersError, isFetchingCustomers } = useCustomer();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // ✅ Use useMemo and add proper guards
  const formattedCustomers = useMemo(() => {
    // Guard: Return empty array if data not loaded yet
    if (!Customers || !Array.isArray(Customers)) {
      return [];
    }

    return Customers.map((customer) => ({
      ...customer,
      customerId: customer.id,
      customerName: customer.fullname || "Unknown Customer",
    }))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 10); // Get only the recent 5 customers
  }, [Customers]);

  const columns = CustomerColumns();

  // ✅ Show loading state BEFORE accessing data
  if (isFetchingCustomers) return <TableSkeleton />;
  
  // ✅ Show error state
  if (customersError) {
    return (
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="text-center text-red-500 py-10">
          <p className="font-medium">Error loading customers</p>
          <p className="text-sm text-gray-500 mt-2">{customersError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium text-gray-800">Customers</h1>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-56 bg-white border border-gray-200 rounded-full h-10">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Customers?.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {capitalizeFirstLetter(c.fullname)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DataTable columns={columns} data={formattedCustomers} />
      </div>
    </div>
  );
}