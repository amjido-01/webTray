"use client";

import { PageHeader } from "./page-header";
import { useRouter } from "next/navigation";

export function OrderManagement() {
  const router = useRouter()
  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle="Manage and track all customer orders"
        onAddClick={() => router.push("/dashboard/order/new-order")}
        addLabel="New Order"
      />
    </div>
  );
}
