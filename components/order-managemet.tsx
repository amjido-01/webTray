"use client";

import { toast } from "sonner";
import { PageHeader } from "./page-header";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useActiveStore } from "@/hooks/use-active-store";
import { useProduct } from "@/hooks/use-product";

export function OrderManagement() {
    const { user } = useAuthStore();
    const { activeStore } = useActiveStore();
    const { products } = useProduct();

    const handleNavigate = () => {
        if (!user?.business) {
          toast("Please Register your business to carryout this action")
          return
        } else if (!products || products.length === 0) {
          toast("Please add products to your store to carryout this action")
          return
        } else if (!activeStore) {
          toast("Please select a store to carryout this action")
          return
        }
        router.push("/dashboard/order/new-order")
      }
  const router = useRouter()
  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle="Manage and track all customer orders"
        onAddClick={handleNavigate}
        addLabel="New Order"
      />
    </div>
  );
}
