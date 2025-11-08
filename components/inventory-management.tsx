"use client";
import { useState } from "react";
import { ModalForm } from "./modal-form";
import { PageHeader } from "./page-header";
import { useCategory } from "@/hooks/use-category";
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/lib/capitalize";
import { useProduct } from "@/hooks/use-product";
import * as yup from "yup";
import { useAuthStore } from "@/store/useAuthStore";
import { useActiveStore } from "@/hooks/use-active-store";
import { productValidationSchema } from "@/schemas/product.schema";
import { PageHeaderSkeleton } from "./header-skeleton";

export function InventoryManagement() {
  const { isFetchingInventorySummary } = useCategory();
  const { user } = useAuthStore();
  
  // Use the safe hook to get activeStore
  const { activeStore, isLoading: storeLoading } = useActiveStore();

  
  const { addProduct, isAddingProduct, isFetchingProducts } = useProduct();
  const { categories, addCategory, isAddingCategory } = useCategory();
  
  const [isOpen, setIsOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [shouldClearForm, setShouldClearForm] = useState(false);

  // Now activeStore is guaranteed to exist after loading
  const userStoreId = activeStore?.id;
  console.log(userStoreId)
  const isLoading = 
    isFetchingInventorySummary || 
    isFetchingProducts || 
    storeLoading; // Include store loading state

  const handleAddCategory = async (
    newCategoryName: string
  ): Promise<boolean> => {
    if (!newCategoryName) return false;
    
    // Guard: Ensure we have a store ID
    if (!userStoreId) {
      toast.error("No active store selected");
      return false;
    }

    const alreadyExists = categories?.some(
      (category) =>
        category.name.toLowerCase() === newCategoryName.toLowerCase()
    );

    if (alreadyExists) {
      toast.success("Category already exists");
      return false;
    }

    try {
      await addCategory({
        name: newCategoryName,
        description: "",
        storeId: userStoreId,
      });

      toast.success("Category successfully added");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
      return false;
    }
  };

  const categoryNames =
    categories?.map((category) => capitalizeFirstLetter(category.name)) || [];

  const handleSubmit = async (data: Record<string, string>) => {
    // Guard: Ensure we have a store ID
    if (!userStoreId) {
      toast.error("No active store selected");
      return;
    }

    try {
      setValidationErrors({});

      await productValidationSchema.validate(data, { abortEarly: false });

      const selectedCategoryName = data.category.toLowerCase();
      const selectedCategory = categories?.find(
        (cat) => cat.name.toLowerCase() === selectedCategoryName
      );

      if (!selectedCategory) {
        toast.error("Invalid category selected");
        return;
      }

      const productPayload = {
        storeId: userStoreId,
        categoryId: selectedCategory.id,
        name: data.name,
        description: data.description || "",
        price: parseFloat(data.price),
        quantity: parseInt(data.stock),
        images: {
          main: "https://via.placeholder.com/400x300/e2e8f0/64748b?text=Product+Image",
          thumbnail:
            "https://via.placeholder.com/150x150/e2e8f0/64748b?text=Thumb",
        },
      };

      await addProduct(productPayload);
      toast.success("Product added successfully");
      setShouldClearForm(true);
      setIsOpen(false);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
        setValidationErrors(errors);

        const firstError = error.inner[0]?.message;
        if (firstError) {
          toast.error(firstError);
        }
      } else {
        console.error("Error adding product:", error);
        toast.error("Failed to add product. Please try again.");
      }
    }
  };

  const handleAddProductDrawer = () => {
    if (!user?.business) {
      toast.error("Please register your business to carry out this action");
      return;
    }
    
    if (!activeStore) {
      toast.error("Please select a store first");
      return;
    }
    
    setIsOpen(true);
  };

  // Show loading while fetching store data
  if (isLoading) {
    return <PageHeaderSkeleton />;
  }

  // Show message if no active store (shouldn't happen after loading)
  if (!activeStore) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
          <p className="text-sm text-orange-800">
            No active store selected. Please create or select a store.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Inventory Management"
        subtitle={`Manage products for ${activeStore.storeName}`}
        onAddClick={handleAddProductDrawer}
        addLabel="Add Product"
      />
      <ModalForm
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Add New Product"
        submitLabel={isAddingProduct ? "Adding..." : "Add Product"}
        onAddCategory={handleAddCategory}
        onSubmit={handleSubmit}
        validationErrors={validationErrors}
        shouldClearForm={shouldClearForm}
        onFormCleared={() => setShouldClearForm(false)}
        isAddingCategory={isAddingCategory}
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
            options: categoryNames,
            allowCustom: true,
            required: true,
          },
          {
            id: "price",
            label: "Price",
            type: "currency",
            placeholder: "Enter price (e.g., 2500)",
            required: true,
          },
          {
            id: "stock",
            label: "Stock",
            placeholder: "How many units? (e.g., 15)",
            required: true,
          },
          {
            id: "description",
            label: "Description",
            type: "textarea",
            placeholder: "Enter a brief description (optional)",
            required: false,
          },
        ]}
      />
    </div>
  );
}