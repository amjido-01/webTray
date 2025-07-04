import ProductsTable from "@/components/product/products-table";
import { InventoryManagement } from "@/components/inventory-management";
import InventoryStatCard from "@/components/inventory/inventory-stat-card";
// import { formatCurrency } from "@/lib/format-currency";
export default function Page() {
 

  return (
    <div className="flex flex-1 flex-col">
      <InventoryManagement />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <InventoryStatCard />
          <ProductsTable />
        </div>
      </div>
    </div>
  );
}
