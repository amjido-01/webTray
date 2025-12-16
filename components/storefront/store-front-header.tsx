"use client";
import { PageHeader } from "../page-header";
import { ModalForm } from "../modal-form";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useState } from "react";

export default function StoreFrontHeader() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [shouldClearForm, setShouldClearForm] = useState(false);

  const handleSubmit = () => {
    console.log("submitted");
    setValidationErrors({});
  };
  const handleAddStoreDrawer = () => {
    if (!user?.business) {
      toast("Please Register your business to carryout this action");
      return;
    }
    setIsOpen(true);
  };
  return (
    <div>
      <PageHeader
        title="Storefront Products"
        subtitle="Manage which products appear in your online store"
        onAddClick={handleAddStoreDrawer}
        addLabel="New Store"
      />

      <ModalForm
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Add new store"
        // submitLabel={isAddingProduct ? "Adding..." : "Add Product"}
        submitLabel="Add store"
        onSubmit={handleSubmit}
        validationErrors={validationErrors}
        shouldClearForm={shouldClearForm}
        onFormCleared={() => setShouldClearForm(false)}
        fields={[
          {
            id: "name",
            label: "Store Name",
            required: true,
            placeholder: "Enter store name",
          },
          {
            id: "description",
            label: "Description",
            type: "textarea",
            placeholder: "Enter store description",
            required: false,
          },
          {
            id: "domain",
            label: "Domain",
            placeholder: "Enter domain name",
            required: true,
          },
        ]}
      />
    </div>
  );
}
