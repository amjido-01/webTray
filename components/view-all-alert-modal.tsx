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
  level: "Critical" | "Low Stock" | "Medium Stock" | "Out of Stock"
}

interface StockAlertsModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  stockAlerts: StockAlert[]
}

const getStockLevelColor = (level: string) => {
  switch (level) {
    case "Out of Stock":
      return "bg-red-500 text-white hover:bg-red-600"
    case "Critical":
      return "bg-[#EF4444] rounded-full text-[#FFFFFF] hover:bg-red-100"
    case "Low Stock":
      return "bg-yellow-100 rounded-full text-yellow-800 hover:bg-yellow-200"
    case "Medium Stock":
      return "bg-[#EBEBEB] rounded-full text-[#1A1A1A] hover:bg-gray-100"
    default:
      return "bg-gray-100 rounded-full text-gray-800 hover:bg-gray-100"
  }
}

export function StockAlertsModal({ isOpen, onOpenChange, stockAlerts }: StockAlertsModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter alerts based on search term and selected level (only one at a time)
  const filteredAlerts = stockAlerts.filter((alert) => {
    const matchesSearch = alert.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevels.length === 0 || selectedLevels[0] === alert.level
    return matchesSearch && matchesLevel
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAlerts = filteredAlerts.slice(startIndex, startIndex + itemsPerPage)

  // Reset to page 1 when filters change
  const handleApplyFilters = () => {
    setCurrentPage(1)
  }

  // Remove unused functions and variables
  // Get available levels is removed since we have fixed 3 options

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="p-0 overflow-y-auto sm:max-w-[500px]">
        <SheetHeader className="p-6">
          <SheetTitle className="text-xl font-semibold">Stock Alert</SheetTitle>
          <p className="text-sm text-muted-foreground">
            {filteredAlerts.length} of {stockAlerts.length} items
          </p>
        </SheetHeader>

        <div className="p-4 w-full space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search Products"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 rounded-full"
              />
            </div>

            {/* Category Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full flex items-center gap-2">
                  {selectedLevels.length > 0 ? selectedLevels[0] : "All Levels"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-3" align="end">
                <div className="space-y-3">
                  {["Critical", "Low Stock", "Medium Stock"].map((level) => (
                    <div key={level} className="flex items-center gap-2">
                      <Checkbox
                        className="w-5 h-5 border-[1.5px] border-black"
                        id={level}
                        checked={selectedLevels.includes(level)}
                        onCheckedChange={() => {
                          // Only allow single selection
                          setSelectedLevels(
                            selectedLevels.includes(level) ? [] : [level]
                          )
                        }}
                      />
                      <label
                        htmlFor={level}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedLevels([])
                      setCurrentPage(1)
                    }}
                    className="flex-1 rounded-full text-xs"
                    size="sm"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={handleApplyFilters}
                    className="flex-1 rounded-full text-[#FFFFFF] bg-[#111827] text-xs"
                    size="sm"
                  >
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Active Filter */}
          {selectedLevels.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 cursor-pointer hover:bg-gray-200 flex items-center gap-2"
                onClick={() => {
                  setSelectedLevels([])
                  setCurrentPage(1)
                }}
              >
                {selectedLevels[0]} 
                <span className="text-xs">×</span>
              </Badge>
            </div>
          )}

          {/* Stock Alerts List */}
          <div className="space-y-4">
            {paginatedAlerts.map((alert, index) => (
              <div
                key={`${alert.name}-${index}`}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{alert.name}</h3>
                  <p className="text-sm text-gray-500">{alert.units} units remaining</p>
                </div>
                <Badge className={getStockLevelColor(alert.level)}>{alert.level}</Badge>
              </div>
            ))}

            {paginatedAlerts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">No stock alerts found.</p>
                {(searchTerm || selectedLevels.length > 0) && (
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedLevels([])
                      setCurrentPage(1)
                    }}
                    className="mt-2"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                size="sm"
                className="rounded-full"
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
                      className={`w-8 h-8 rounded-full ${
                        currentPage === pageNum ? "bg-[#111827] text-white" : ""
                      }`}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-500 text-sm">...</span>
                    <span className="font-medium text-sm">{totalPages}</span>
                  </>
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                size="sm"
                className="rounded-full"
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