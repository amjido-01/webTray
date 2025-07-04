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
import { productValidationSchema } from "@/schemas/product.schema";
import { PageHeaderSkeleton } from "./header-skeleton";

export function InventoryManagement() {
     const {
      isFetchingInventorySummary,
    } = useCategory();
  
  const { user } = useAuthStore();
  const { addProduct, isAddingProduct, isFetchingProducts } = useProduct();
  const { categories, addCategory } = useCategory();
  const [isOpen, setIsOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [shouldClearForm, setShouldClearForm] = useState(false);
  const userStoreId = user?.business?.store[0]?.id;
    const isLoading = isFetchingInventorySummary || isFetchingProducts
  
  const handleAddCategory = async (newCategoryName: string) => {
    if (!newCategoryName) return;
    const alreadyExists = categories?.some(
      (category) =>
        category.name.toLowerCase() === newCategoryName.toLowerCase()
    );
    if (alreadyExists) {
      toast.success("Category already exist");
      return;
    }
    try {
      await addCategory({ name: newCategoryName, description: "" });
      toast.success("Category successfully added");
    } catch (error) {
      console.error(error);
    }
  };

  const categoryNames =
    categories?.map((category) => capitalizeFirstLetter(category.name)) || [];

  const handleSubmit = async (data: Record<string, string>) => {
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
      if (typeof userStoreId !== "number") {
        throw new Error("Store ID is not available");
      }
      const productPayload = {
        storeId: userStoreId,
        categoryId: selectedCategory.id,
        name: data.name,
        description: data.description || "",
        price: parseFloat(data.price),
        quantity: parseInt(data.stock),
        images: {
          main: "https://via.placeholder.com/400x300/e2e8f0/64748b?text=Product+Image", // Default image
          thumbnail:
            "https://via.placeholder.com/150x150/e2e8f0/64748b?text=Thumb", // Default thumbnail
        },
      };

      await addProduct(productPayload);
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
        toast("Please Register your business to carryout this action")
        return
      } 
      setIsOpen(true)
    }

     if (isLoading) {
          return  <PageHeaderSkeleton />;
       }
  return (
    <div>
      <PageHeader
        title="Inventory Management"
        subtitle="Manage your products and track stock levels"
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
