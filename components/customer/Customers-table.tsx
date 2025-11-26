"use client";
import { useState } from "react";
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

//SOMETHINGS NEED TO BE ADJUSTED WHEN THE BACKEND SENDS STATUS.
// Summary of Changes:
// What Current Code When Backend Adds StatusHookstatus: "active" (hardcoded)status: customer.status || "active"Typestatus: "active" | "inactive"No change needed (or make optional with ?)ColumnsAlready handles itNo change needed ✅Status HelperOnly handles active/inactiveAdd more status values if needed

export default function CustomerTable() {
  const { 
    customers, 
    isLoading,
    isSuccess,
    isError,
    error,
  } = useCustomer();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // PRIORITY 1: Show loading state
  if (isLoading) {
    console.log("🔄 Loading customers...");
    return <TableSkeleton />;
  }

  // PRIORITY 2: Show error state
  if (isError) {
    console.log("❌ Error loading customers:", error);
    return (
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="text-center text-red-500 py-10">
          <p className="font-medium">Error loading customers</p>
          <p className="text-sm text-gray-500 mt-2">
            {error?.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  // PRIORITY 3: Check if we have valid data
  if (!isSuccess || !customers || !Array.isArray(customers)) {
    console.log("⏳ Waiting for valid data...", { isSuccess, customers });
    return <TableSkeleton />;
  }

  // PRIORITY 4: Handle empty state
  if (customers.length === 0) {
    console.log("📭 No customers found");
    return (
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="text-center text-gray-500 py-10">
          <p className="font-medium">No customers yet</p>
          <p className="text-sm mt-2">Your customers will appear here</p>
        </div>
      </div>
    );
  }



  // Sort and limit data
  const displayCustomers = [...customers]
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

  const columns = CustomerColumns();

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium text-gray-800">
            Customers ({customers.length})
          </h1>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-56 bg-white border border-gray-200 rounded-full h-10">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {customers.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {capitalizeFirstLetter(c.fullname)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <DataTable columns={columns} data={displayCustomers} />
      </div>
    </div>
  );
}