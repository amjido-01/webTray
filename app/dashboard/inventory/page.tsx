import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductsTable from "@/components/products-table";
import SalesDashboard from "@/components/sales-dashboard"
export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between items-center">
        <div className="text-[#4D4D4D]">
          <h2 className=" font-bold text-[20px] mb-2 leading-6">Inventory Management</h2>
          <p className=" font-normal text-[16px] leading-6">Manage your products and track stock levels</p>
        </div>
        <Button className="rounded-full">
          <Plus />
          Add Product
          </Button>
      </div>
        <div className="@container/main flex flex-1 flex-col gap-2">
           <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SalesDashboard />
              <ProductsTable />
             </div>
        </div>
    </div>
  )
}
