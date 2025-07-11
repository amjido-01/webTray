"use client";

import { toast } from "sonner";
import { PageHeader } from "./page-header";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function OrderManagement() {
    const { user } = useAuthStore();

    const handleNavigate = () => {
        if (!user?.business) {
          toast("Please Register your business to carryout this action")
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
