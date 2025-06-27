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
import { Plus, Check, X } from "lucide-react";

interface Field {
  id: string;
  label: string;
  type?: "text" | "select" | "currency" | "textarea";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  allowCustom?: boolean;
}

interface ModalFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  submitLabel: string;
  fields: Field[];
  onAddCategory?: (category: string) => void;
  onSubmit: (data: Record<string, string>) => void;
  shouldClearForm?: boolean;
  onFormCleared?: () => void;
  validationErrors?: Record<string, string>;
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
  onFormCleared,
}: ModalFormProps) {
  const initialState = Object.fromEntries(fields.map((f) => [f.id, ""]));
  const [formData, setFormData] = useState(initialState);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  
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

  const handleAddNewCategory = () => {
    if (newCategory.trim() && onAddCategory) {
      onAddCategory(newCategory.trim());
      setFormData((prev) => ({ ...prev, category: newCategory.trim() }));
      setNewCategory("");
      setShowAddCategory(false);
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
      <SheetContent className="p-0 overflow-y-auto">
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
                      validationErrors[field.id] ? 'border-red-500' : ''
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
                            disabled={!newCategory.trim()}
                          >
                            <Check className="w-4 h-4" />
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
                      validationErrors[field.id] ? 'border-red-500' : ''
                    }`}
                    placeholder={field.placeholder}
                    required={field.required}
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
                    validationErrors[field.id] ? 'border-red-500' : ''
                  }`}
                  rows={2}
                />
              ) : (
                <Input
                  id={field.id}
                  type="text"
                  value={formData[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={validationErrors[field.id] ? 'border-red-500' : ''}
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
      </SheetContent>
    </Sheet>
  );
}