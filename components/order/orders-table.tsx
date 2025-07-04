// OrdersTable.tsx
"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { useOrder } from "@/hooks/use-order";
import { DataTable } from "@/lib/orders/data-table";
import { Order } from "@/types";
import { createColumns, ColumnHandlers } from "@/lib/orders/columns";
import { Input } from "../ui/input";
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
import { capitalizeFirstLetter } from "@/lib/capitalize";
import { Button } from "../ui/button";

export default function OrdersTable() {
  const { orders, deleteOrder, ordersError, isDeletingOrder } = useOrder();
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    order: Order | null;
  }>({
    open: false,
    order: null,
  });

  const handleDeleteClick = (order: Order) => {
    setDeleteDialog({ open: true, order });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.order) {
      try {
        await deleteOrder(deleteDialog.order.id);
        setDeleteDialog({ open: false, order: null });
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, order: null });
  };

  const columnHandlers: ColumnHandlers = {
    handleEdit: (order: Order) => {
      console.log("Edit order:", order);
    },
    handleDelete: handleDeleteClick,
  };

  const formattedOrders = orders?.map((order) => {
    return {
      ...order,
      orderId: order.id,
      customerName: order.customer?.fullname || "Unknown Customer",
      customerEmail: order.customer?.email || "No email",
      date: new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      items: order.orderItems || [],
      total: Number(order.totalAmount) || 0,
      storeId: order.storeId,
      customerId: order.customerId,
      updatedAt: order.updatedAt,
      customer: order.customer || null,
      orderItems: order.orderItems || [],
    };
  }).filter(order => {
    const matchesSearch = !searchTerm || 
      order.id.toString().includes(searchTerm) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || 
      order.status.toLowerCase() === selectedStatus.toLowerCase();
    
    // Type filter (you may need to adjust this based on your actual data structure)
    // const matchesType = selectedType === "all" || 
    //   (order.type && order.type.toLowerCase() === selectedType.toLowerCase());
    
    return matchesSearch && matchesStatus 
    // && matchesType;
  }) || [];

  const columns = createColumns(columnHandlers);
  const status = ["Pending", "Processing", "Shipped", "Completed"];
  const type = ["Online", "Offline"];

  if (ordersError) return <div>Error loading orders</div>;
  if (!orders || orders.length === 0) return <div>No orders found</div>;

  return (
    <>
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-medium text-gray-800 mb-6">Orders</h1>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search customer name or order id"
                className="pl-10 bg-white border border-gray-200 rounded-full h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-[80px] bg-white border border-gray-200 rounded-full h-10">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Type</SelectItem>
                  {type?.map((item, index) => (
                    <SelectItem key={index} value={item.toLowerCase()}>
                      {capitalizeFirstLetter(item)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[108px] bg-white border border-gray-200 rounded-full h-10">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {status?.map((item, index) => (
                    <SelectItem key={index} value={item.toLowerCase()}>
                      {capitalizeFirstLetter(item)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DataTable columns={columns} data={formattedOrders} />
        </div>
      </div>
      
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) => !open && handleDeleteCancel()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete order from{" "}
              {deleteDialog.order?.customer?.fullname}? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isDeletingOrder}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeletingOrder}
            >
              {isDeletingOrder ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}