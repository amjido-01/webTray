"use client";

import { useState } from "react";
import { Search, SquarePen, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProduct } from "@/hooks/useProduct";

interface Product {
  id: number;
  name: string;
  categoryId: number;
  quantity: number;
  price: number;
  description: string;
}

export default function ProductsTable() {
  const {
    products,
    isFetchingProducts,
    productsError,
    updateProduct,
    // updateProductError,
    // updateProductSuccess,
    deleteProduct,
    // deleteProductError,
    // deleteProductSuccess,
    isUpdatingProduct,
    isDeletingProduct,
  } = useProduct();
  console.log(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    product: Product | null;
  }>({
    open: false,
    product: null,
  });

  const totalPages = 10;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product.id);
    setEditForm({
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
    });
  };

  const handleEditCancel = () => {
    setEditingProduct(null);
    setEditForm({});
  };

const handleEditSave = async (productId: number) => {
    try {
      // Prepare the payload with the form data
      const payload = {
        id: productId,
        name: editForm.name,
        price: editForm.price,
        quantity: editForm.quantity,
        description: editForm.description,
        // Remove categoryId if it's not part of the update API
        // categoryId: editForm.categoryId,
      };

      console.log("Updating product with payload:", payload);
      
      await updateProduct(payload);
      
      setEditingProduct(null);
      setEditForm({});
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDeleteClick = (product: Product) => {
    setDeleteDialog({ open: true, product });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.product) {
      try {
        await deleteProduct(deleteDialog.product.id);
        setDeleteDialog({ open: false, product: null });
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, product: null });
  };

  if (isFetchingProducts) return <div>Loading products...</div>;
  if (productsError) return <div>Error loading products</div>;
  if (!products || products.length === 0) return <div>No products found</div>;

  return (
    <>
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-medium text-gray-800 mb-6">Products</h1>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search Products"
                className="pl-10 bg-white border border-gray-200 rounded-full h-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-56 bg-white border border-gray-200 rounded-full h-10">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="snacks">Snacks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[80px] font-medium">S/N</TableHead>
                  <TableHead className="font-medium">Products</TableHead>
                  <TableHead className="font-medium">Category</TableHead>
                  <TableHead className="font-medium">Stock</TableHead>
                  <TableHead className="font-medium">Price ₦</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => {
                  const status = getStockStatus(product.quantity);
                  const isEditing = editingProduct === product.id;

                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium py-5">
                        {index + 1}
                      </TableCell>
                      <TableCell className="py-5">
                        {isEditing ? (
                          <Input
                            value={editForm.name || ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                            className="h-8"
                          />
                        ) : (
                          product.name
                        )}
                      </TableCell>
                      <TableCell className="py-5">
                        {isEditing ? (
                          <Select
                            value={editForm.categoryId || 0}
                            onValueChange={(value) =>
                              setEditForm({ ...editForm, categoryId: value })
                            }
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beverages">
                                Beverages
                              </SelectItem>
                              <SelectItem value="food">Food</SelectItem>
                              <SelectItem value="snacks">Snacks</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          product.categoryId
                        )}
                      </TableCell>
                      <TableCell className="py-5">
                        {isEditing ? (
                          <>
                            <Input
                              value={editForm.name || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  name: e.target.value,
                                })
                              }
                              className="h-8"
                            />
                            <Input
                              value={editForm.description || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  description: e.target.value,
                                })
                              }
                              className="h-8 mt-2"
                              placeholder="Description"
                            />
                          </>
                        ) : (
                          <>
                            <div>{product.name}</div>
                            <div className="text-sm text-gray-500">
                              {product.description}
                            </div>
                          </>
                        )}
                      </TableCell>

                      <TableCell className="text-[#999999]">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              value={editForm.quantity || ""}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  quantity:
                                    Number.parseInt(e.target.value) || 0,
                                })
                              }
                              className="h-8 w-20"
                            />
                            <span className="text-sm">units</span>
                          </div>
                        ) : (
                          `${product.quantity} units`
                        )}
                      </TableCell>
                      <TableCell className="py-5">
                        {isEditing ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={editForm.price || ""}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                price: Number.parseFloat(e.target.value) || 0,
                              })
                            }
                            className="h-8 w-24"
                          />
                        ) : (
                          Number(product.price).toFixed(2)
                        )}
                      </TableCell>
                      <TableCell className="py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right py-5">
                        <div className="flex justify-end gap-2">
                          {isEditing ? (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-green-600 hover:text-green-700"
                                onClick={() => handleEditSave(product.id)}
                                disabled={isUpdatingProduct}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-gray-700"
                                onClick={handleEditCancel}
                                disabled={isUpdatingProduct}
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
                                onClick={() => handleEditClick(product)}
                              >
                                <SquarePen className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-red-600"
                                onClick={() => handleDeleteClick(product)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              className="text-sm rounded-full bg-transparent"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  className={`w-8 h-8 p-0 text-sm rounded-full ${
                    currentPage === page ? "bg-primary text-white" : "bg-white"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              <span className="mx-2 text-sm text-gray-500">of</span>
              <span className="text-sm text-gray-700">{totalPages}</span>
            </div>

            <Button
              variant="default"
              className="text-sm rounded-full bg-[#111827]"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) => !open && handleDeleteCancel()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {deleteDialog.product?.name}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isDeletingProduct}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeletingProduct}
            >
              {isDeletingProduct ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
