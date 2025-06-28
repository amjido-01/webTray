"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2, Check, X } from "lucide-react";
import { Category } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/capitalize";

export type Product = {
  id: number;
  name: string;
  categoryId: number;
  quantity: number;
  price: number;
  description: string;
};

export interface EditForm {
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  categoryId?: number;
}

export interface ColumnHandlers {
  handleEdit: (product: Product) => void;
  handleDelete: (product: Product) => void;
  handleEditSave: (productId: number) => void;
  handleEditCancel: () => void;
  editingProduct: number | null;
  editForm: EditForm;
  setEditForm: (form: EditForm | ((prev: EditForm) => EditForm)) => void;
  isUpdatingProduct: boolean;
}

const getStockStatus = (
  quantity: number
): "Great" | "Medium Stock" | "Low Stock" | "Critical" => {
  if (quantity >= 50) return "Great";
  if (quantity >= 20) return "Medium Stock";
  if (quantity >= 5) return "Low Stock";
  return "Critical";
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Great":
      return "bg-[#CDFBEC] text-[#1A1A1A]";
    case "Medium Stock":
      return "bg-[#F8F8F8] text-[#1A1A1A]";
    case "Low Stock":
      return "bg-[#FDE8E8] text-[#1A1A1A]";
    case "Critical":
      return "bg-[#EF4444] text-white";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const createColumns = (
  handlers: ColumnHandlers,
  categories?: Category[]
): ColumnDef<Product>[] => [
  {
    header: "S/N",
    cell: ({ row }) => {
      return (
        <div className="font-medium py-5">
          {(row.index + 1).toString().padStart(2, "0")}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Products",
    cell: ({ row }) => {
      const product = row.original;
      const isEditing = handlers.editingProduct === product.id;

      return (
        <div className="py-5">
          {isEditing ? (
            <div>
              <Input
                value={handlers.editForm.name || ""}
                onChange={(e) =>
                  handlers.setEditForm({
                    ...handlers.editForm,
                    name: e.target.value,
                  })
                }
                className="h-8 mb-2"
              />
              <Input
                value={handlers.editForm.description || ""}
                onChange={(e) =>
                  handlers.setEditForm({
                    ...handlers.editForm,
                    description: e.target.value,
                  })
                }
                className="h-8"
                placeholder="Description"
              />
            </div>
          ) : (
            <div>
              <div>{capitalizeFirstLetter(product.name)}</div>
              {/* <div className="text-sm text-gray-500">{product.description}</div> */}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    cell: ({ row }) => {
      const product = row.original;
      const isEditing = handlers.editingProduct === product.id;
      const categoryName =
        categories?.find((cat) => cat.id === product.categoryId)?.name ||
        "Unknown";

      return (
        <div className="py-5">
          {isEditing ? (
            <Select
              value={handlers.editForm.categoryId?.toString() || ""}
              onValueChange={(value) =>
                handlers.setEditForm({
                  ...handlers.editForm,
                  categoryId: parseInt(value),
                })
              }
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            capitalizeFirstLetter(categoryName)
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Stock",
    cell: ({ row }) => {
      const product = row.original;
      const isEditing = handlers.editingProduct === product.id;

      return (
        <div className="text-[#999999] py-5">
          {isEditing ? (
            <div className="flex items-center gap-1">
              <Input
                type="number"
                value={handlers.editForm.quantity || ""}
                onChange={(e) =>
                  handlers.setEditForm({
                    ...handlers.editForm,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
                className="h-8 w-20"
              />
              <span className="text-sm">units</span>
            </div>
          ) : (
            `${product.quantity} units`
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price ₦",
    cell: ({ row }) => {
      const product = row.original;
      const isEditing = handlers.editingProduct === product.id;

      return (
        <div className="py-5">
          {isEditing ? (
            <Input
              type="number"
              step="0.01"
              value={handlers.editForm.price || ""}
              onChange={(e) =>
                handlers.setEditForm({
                  ...handlers.editForm,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              className="h-8 w-24"
            />
          ) : (
            Number(product.price).toFixed(2)
          )}
        </div>
      );
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      const status = getStockStatus(product.quantity);

      return (
        <div className="py-5">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      const isEditing = handlers.editingProduct === product.id;

      return (
        <div className="textright py-5">
          <div className="flex justifyend gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-green-600 hover:text-green-700"
                  onClick={() => handlers.handleEditSave(product.id)}
                  disabled={handlers.isUpdatingProduct}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-700"
                  onClick={handlers.handleEditCancel}
                  disabled={handlers.isUpdatingProduct}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-blue-600"
                  onClick={() => handlers.handleEdit(product)}
                >
                  <SquarePen className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-red-600"
                  onClick={() => handlers.handleDelete(product)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      );
    },
  },
];
