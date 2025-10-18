"use client";

import { useState } from "react";
import { Search } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProduct } from "@/hooks/use-product";
// import { DataTable } from "@/lib/products/data-table";
export default function ManageProductTable() {
    const { products, isFetchingProducts, productsError } = useProduct();
    console.log("Products:", products);

      const [editingProduct, setEditingProduct] = useState<number | null>(null);
      const [editForm, setEditForm] = useState<EditForm>({});
      const [selectedCategory, setSelectedCategory] = useState<string>("all");
      const [searchTerm, setSearchTerm] = useState("");
      const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        product: Product | null;
      }>({
        open: false,
        product: null,
      });

      
        const handleEditClick = (product: Product) => {
          setEditingProduct(product.id);
          setEditForm({
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            price: product.price,
            categoryId: product.categoryId,
          });
        };
      
        const handleEditCancel = () => {
          setEditingProduct(null);
          setEditForm({});
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
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
            //   value={selectedProduct} 
            //   onValueChange={setSelectedProduct}
            >
              <SelectTrigger className="w-full sm:w-56 bg-white border border-gray-200 rounded-full h-10">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="all">All Categories</SelectItem>
                {p?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {capitalizeFirstLetter(category.name)}
                  </SelectItem>
                ))} */}
              </SelectContent>
            </Select>
          </div>

          {/* <DataTable columns={columns} data={formattedProducts} /> */}
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