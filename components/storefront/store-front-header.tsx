"use client";
import { PageHeader } from "../page-header";
import { CreateStoreSheet, CreateStoreFormData } from "./create-store-sheet";
import { useAuthStore } from "@/store/useAuthStore";
import { useStoreFront, CreateStorePayload } from "@/hooks/use-store-front";
import { toast } from "sonner";
import { useState } from "react";

export default function StoreFrontHeader() {
  const { user, refreshStores } = useAuthStore();
  const { createStore, isCreatingStore } = useStoreFront();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddStoreDrawer = () => {
    if (!user?.business) {
      toast("Please register your business to carry out this action.");
      return;
    }
    setIsOpen(true);
  };

  const handleCreate = async (data: CreateStorePayload) => {
    try {
      await createStore(data);
      setIsOpen(false);
    } catch {
      // Error toast is already shown by the mutation
    }
  };

  return (
    <div>
      <PageHeader
        title="Storefront Products"
        subtitle="Manage which products appear in your online store"
        onAddClick={handleAddStoreDrawer}
        addLabel="New Store"
      />

      <CreateStoreSheet
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isEditMode={false}
        onSubmit={handleCreate}
        isSubmitting={isCreatingStore}
      />
    </div>
  );
}
