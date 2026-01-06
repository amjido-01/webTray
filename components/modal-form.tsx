"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Plus, Check, X, Loader2, Trash2 } from "lucide-react";

interface Field {
  id: string;
  label: string;
  type?: "text" | "select" | "currency" | "textarea" | "number";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  allowCustom?: boolean;
}

interface PendingProduct {
  id: string;
  name: string;
  category: string;
  categoryId: number;
  price: number;
  stock: number;
  description: string;
}

interface ModalFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  submitLabel: string;
  fields: Field[];
  onAddCategory?: (category: string) => Promise<boolean>;
  onSubmit: (data: Record<string, string>) => void;
  shouldClearForm?: boolean;
  isAddingCategory?: boolean;
  onFormCleared?: () => void;
  validationErrors?: Record<string, string>;
  initialData?: Record<string, string>;
  pendingProducts?: PendingProduct[];
  onRemoveProduct?: (id: string) => void;
  onSubmitAll?: () => void;
  isSubmittingAll?: boolean;
}

export function ModalForm({
  isOpen,
  onOpenChange,
  title,
  submitLabel,
  fields,
  onAddCategory,
  onSubmit,
  validationErrors = {},
  shouldClearForm = false,
  isAddingCategory = false,
  onFormCleared,
  initialData = {},
  pendingProducts = [],
  onRemoveProduct,
  onSubmitAll,
  isSubmittingAll = false,
}: ModalFormProps) {
  const initialState = Object.fromEntries(
    fields.map((f) => [f.id, initialData[f.id] || ""])
  );

  const [formData, setFormData] = useState(initialState);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showProductList, setShowProductList] = useState(true);

  // Add useEffect to update form when initialData changes
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (shouldClearForm) {
      setFormData(initialState);
      setShowAddCategory(false);
      setNewCategory("");
      onFormCleared?.();
    }
  }, [shouldClearForm, onFormCleared, initialState]);

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddNewCategory = async () => {
    if (newCategory.trim() && onAddCategory) {
      const success = await onAddCategory(newCategory.trim()); // ✅ wait for response
      if (success) {
        setFormData((prev) => ({ ...prev, category: newCategory.trim() }));
        setNewCategory("");
        setShowAddCategory(false); // ✅ close only when success
      }
    }
  };

  const handleCancelAddCategory = () => {
    setNewCategory("");
    setShowAddCategory(false);
  };

  // Reset form when modal closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormData(initialState);
      setShowAddCategory(false);
      setNewCategory("");
    }
    onOpenChange(open);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="p-0 overflow-y-auto w-[400px] sm:w-[900px]">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>

              {field.type === "select" ? (
                <div>
                  <select
                    id={field.id}
                    value={formData[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className={`w-full border rounded px-4 py-2 ${
                      validationErrors[field.id] ? "border-red-500" : ""
                    }`}
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {field.allowCustom && (
                    <div className="space-y-2 ml-0">
                      {!showAddCategory ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-[12px] mt-[8px] text-blue-600 hover:text-blue-700"
                          onClick={() => setShowAddCategory(true)}
                        >
                          <Plus className="w-4 h-4 m" />
                          Add New Category
                        </Button>
                      ) : (
                        <div className="flex items-center mt-2 gap-2">
                          <Input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Enter new category"
                            className="flex-1"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddNewCategory();
                              }
                              if (e.key === "Escape") {
                                handleCancelAddCategory();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleAddNewCategory}
                            disabled={!newCategory.trim() || isAddingCategory}
                          >
                            {isAddingCategory ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleCancelAddCategory}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : field.type === "currency" ? (
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-100 px-2 py-1 text-sm text-gray-600 rounded">
                    NGN
                  </div>
                  <Input
                    id={field.id}
                    value={formData[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className={`pl-16 ${
                      validationErrors[field.id] ? "border-red-500" : ""
                    }`}
                    onKeyPress={(e) => {
                      // Allow numbers and a single decimal point
                      const isValid = /[0-9.]/.test(e.key);
                      const currentValue = e.currentTarget.value;

                      // Allow only one decimal point
                      if (
                        !isValid ||
                        (e.key === "." && currentValue.includes("."))
                      ) {
                        e.preventDefault();
                      }
                    }}
                    placeholder={field.placeholder}
                    required={field.required}
                    min="0"
                    step="any"
                  />
                </div>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  value={formData[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={`w-full border rounded px-4 py-2 ${
                    validationErrors[field.id] ? "border-red-500" : ""
                  }`}
                  rows={2}
                />
              ) : field.type === "number" ? (
                <Input
                  id={field.id}
                  type="number"
                  value={formData[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={validationErrors[field.id] ? "border-red-500" : ""}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  min="0"
                  step="any"
                />
              ) : (
                <Input
                  id={field.id}
                  type="text"
                  value={formData[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={validationErrors[field.id] ? "border-red-500" : ""}
                />
              )}

              {/* Display validation error */}
              {validationErrors[field.id] && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors[field.id]}
                </div>
              )}
            </div>
          ))}

          <Button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-full py-3"
            disabled={submitLabel.includes("...")}
          >
            {submitLabel}
          </Button>
        </form>
        {pendingProducts.length > 0 && (
          <div className="px-6 pb-6">
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-sm">
                    Products to Submit ({pendingProducts.length})
                  </h3>
                  {showProductList && (
                    <p className="text-xs text-muted-foreground">
                      {pendingProducts.length} product(s) added
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProductList(!showProductList)}
                  className="text-xs"
                >
                  {showProductList ? "Hide" : "Review"}
                </Button>
              </div>

              {showProductList && (
                <div className="mb-4">
                  {/* Table Header */}
                  <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_0.5fr] gap-4 px-3 py-2 bg-muted/30 rounded-t-lg border border-b-0 text-xs font-medium text-muted-foreground">
                    <div>Product</div>
                    <div>Category</div>
                    <div>Price ₦</div>
                    <div>Stock</div>
                    <div>Action</div>
                  </div>

                  {/* Table Body */}
                  <div className="max-h-[300px] overflow-y-auto border rounded-b-lg">
                    {pendingProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className={`grid grid-cols-[2fr_1.5fr_1fr_1fr_0.5fr] gap-4 px-3 py-3 items-center text-sm ${
                          index !== pendingProducts.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="truncate font-medium">
                          {product.name}
                        </div>
                        <div className="truncate text-muted-foreground">
                          {product.category}
                        </div>
                        <div>{product.price.toLocaleString()}</div>
                        <div>{product.stock}</div>
                        <div className="flex justify-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveProduct?.(product.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                type="button"
                onClick={onSubmitAll}
                disabled={isSubmittingAll}
                className="w-full bg-black hover:bg-black/90 text-white rounded-full py-3"
              >
                {isSubmittingAll ? "Submitting..." : "Submit Products"}
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
