"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

interface StockAlert {
  name: string
  units: number
  level: "Critical" | "Low Stock" | "Medium Stock"
}

interface StockAlertsModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  stockAlerts: StockAlert[]
}

const getStockLevelColor = (level: string) => {
  switch (level) {
    case "Critical":
      return "bg-[#EF4444] rounded-full text-[#FFFFFF] hover:bg-red-100"
    case "Low Stock":
      return "bg-red-100 rounded-full text-[#1A1A1A] hover:bg-red-100"
    case "Medium Stock":
      return "bg-[#EBEBEB] rounded-full text-[#1A1A1A] hover:bg-gray-100"
    default:
      return "bg-gray-100 rounded-full text-gray-800 hover:bg-gray-100"
  }
}

export function StockAlertsModal({ isOpen, onOpenChange, stockAlerts }: StockAlertsModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const filteredAlerts = stockAlerts.filter((alert) => {
    const matchesSearch = alert.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(alert.level)
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAlerts = filteredAlerts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="p-0 overflow-y-auto">
        <SheetHeader className="p-6 ">
          <SheetTitle>Stock Alert</SheetTitle>
        </SheetHeader>

        <div className="p-4 w-full space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative w-[65%] flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
              <Input
                placeholder="Search Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>

            {/* Category Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full flex items-center gap-2">
                  All categories <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-3 space-y-2">
                <div className="space-y-2">
                  {["Critical", "Low Stock", "Medium Stock"].map((category) => (
                    <div key={category} className="flex  items-center space-y-3 gap-2">
                      <Checkbox
                      className="w-5 h-5 space-y-3 border-[1.5px] border-black"
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => {
                          setSelectedCategories((prev) =>
                            prev.includes(category)
                              ? prev.filter((c) => c !== category)
                              : [...prev, category]
                          )
                        }}
                      />
                      <label htmlFor={category} className="text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setCurrentPage(1)}
                  className="w-1/2 rounded-full mt-2 text-[#FFFFFF] bg-[#111827]"
                >
                  Apply
                </Button>
              </PopoverContent>
            </Popover>
          </div>

          {/* Stock Alerts List */}
          <div className="space-y-4">
            {paginatedAlerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{alert.name}</h3>
                  <p className="text-sm text-gray-500">{alert.units} units remaining</p>
                </div>
                <Badge className={getStockLevelColor(alert.level)}>{alert.level}</Badge>
              </div>
            ))}

            {paginatedAlerts.length === 0 && (
              <p className="text-center text-gray-500 text-sm pt-6">No stock alerts found.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-500">of</span>
                    <span className="font-medium">{totalPages}</span>
                  </>
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
