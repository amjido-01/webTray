"use client";

import { useState } from "react";
import { ModalForm } from "./modal-form";
import { PageHeader } from "./page-header";

export function InventoryManagement() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <PageHeader
        title="Inventory Management"
        subtitle="Manage your products and track stock levels"
        onAddClick={() => setIsOpen(true)}
        addLabel="Add Product"
      />
      <ModalForm
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Add New Product"
        submitLabel="Add Product"
        onSubmit={(data) => console.log("Product:", data)}
        fields={[
          {
            id: "name",
            label: "Product Name",
            required: true,
            placeholder: "Enter product name",
          },
          {
            id: "category",
            label: "Category",
            type: "select",
            options: ["Electronics", "Fashion", "Home"],
            required: true,
          },
          {
            id: "price",
            label: "Price",
            type: "currency",
            placeholder: "Enter price",
            required: true,
          },
          {
            id: "stock",
            label: "Stock",
            placeholder: "How many units?",
            required: true,
          },
        ]}
      />
    </div>
  );
}
