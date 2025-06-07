"use client"

import { useState } from "react"
import { Search, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Product {
  id: string
  name: string
  category: string
  stock: number
  price: number
  status: "Great" | "Medium Stock" | "Low Stock" | "Critical"
}

export default function ProductsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 80

  const products: Product[] = [
    { id: "01", name: "Coffee Beam Premium", category: "Beverages", stock: 200, price: 8500.0, status: "Great" },
    { id: "02", name: "Organic Milk", category: "Beverages", stock: 10, price: 4500.0, status: "Medium Stock" },
    { id: "03", name: "Chocolate Croissant", category: "Beverages", stock: 5, price: 13500.0, status: "Low Stock" },
    { id: "04", name: "Fresh Salad Mix", category: "Beverages", stock: 2, price: 10500.0, status: "Critical" },
    { id: "05", name: "Artisan Bread", category: "Beverages", stock: 8, price: 10200.0, status: "Medium Stock" },
    { id: "06", name: "Chocolate Syrup", category: "Beverages", stock: 1, price: 9800.0, status: "Critical" },
    { id: "07", name: "Green Tea", category: "Beverages", stock: 3, price: 10750.0, status: "Critical" },
    { id: "08", name: "Nestle Coffee", category: "Beverages", stock: 10, price: 10300.0, status: "Medium Stock" },
    { id: "09", name: "Brewed Bliss Coffee", category: "Beverages", stock: 20, price: 10600.0, status: "Medium Stock" },
    { id: "10", name: "Hotdog", category: "Beverages", stock: 5, price: 10900.0, status: "Low Stock" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Great":
        return "bg-[#CDFBEC] text-[#1A1A1A]"
      case "Medium Stock":
        return "bg-[#F8F8F8] text-[#1A1A1A]"
      case "Low Stock":
        return "bg-[#FDE8E8] text-[#1A1A1A]"
      case "Critical":
        return "bg-[#EF4444] text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h1 className="text-xl font-medium text-gray-800 mb-6">Products</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search Products" className="pl-10 bg-white border border-gray-200 rounded-full h-10" />
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
                <TableHead className="font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="">
                  <TableCell  className="font-medium py-5">{product.id}</TableCell>
                  <TableCell className="py-5">{product.name}</TableCell>
                  <TableCell className="py-5">{product.category}</TableCell>
                  <TableCell className="text-[#999999]">{product.stock} units</TableCell>
                  <TableCell className="py-5">{product.price.toFixed(2)}</TableCell>
                  <TableCell className="py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-5">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            className="text-sm rounded-full"
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
                className={`w-8 h-8 p-0 text-sm rounded-full ${currentPage === page ? "bg-primary text-white" : "bg-white"}`}
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
  )
}
