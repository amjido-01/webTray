"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface CreateOrderModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void
 
}

export function CreateOrderModal({ isOpen, onOpenChange, }: CreateOrderModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    price: "",
    status: "Processing",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Order data:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({ customerName: "", price: "", status: "Processing" })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="p-0 overflow-y-auto">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Create new order</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              placeholder="Enter your customer name"
              value={formData.customerName}
              onChange={(e) => handleInputChange("customerName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-100 px-2 py-1 text-sm text-gray-600 rounded">
                NGN
              </div>
              <Input
                id="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="pl-16"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-6">
            <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-full py-3">
              Create Order
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}