"use client";
import ProductsTable from "@/components/products-table";
import { InventoryManagement } from "@/components/inventory-management";
import { TrendingDown, TrendingUp, Package } from "lucide-react";
import { StatCard } from "@/components/stat-card";
// import { useCategory } from "@/hooks/useCategory";

const stats = [
  {
    title: "Products",
    icon: <Package className="h-4 w-4 text-muted-foreground" />,
    value: 64,
    note: "+4 new this week",
    minWidth: "min-w-[150px]",
  },
  {
    title: "Low Stock Items",
    icon: <TrendingDown className="h-4 w-4 text-red-500" />,
    value: "+2,350",
    note: "Need Attention",
    noteColor: "text-red-500",
  },
  {
    title: "Total Value",
    icon: <TrendingUp className="h-4 w-4 text-green-500" />,
    value: "N200,000",
    note: "Inventory Value",
  },
  {
    title: "Category",
    icon: <Package className="h-4 w-4 text-muted-foreground" />,
    value: 6,
    note: "Product Categories",
  },
];

export default function Page() {
  // const {
  //   categories,
  //   isFetchingCategories,
  //   categoriesError,
  //   // refetchCategories,
  // } = useCategory();

  //  if (isFetchingCategories) return <p>Loading...</p>;
  // if (categoriesError) return <p>Error loading categories</p>;
  //  console.log(categories, "hello")
  return (
    <div className="flex flex-1 flex-col">
      <InventoryManagement />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
          <ProductsTable />
        </div>
      </div>
    </div>
  );
}
