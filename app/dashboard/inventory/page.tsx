import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SalesDashboard from "@/components/sales-dashboard"
export default function Page() {
  return (
    <div>
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
      <SalesDashboard />
    </div>
  )
}