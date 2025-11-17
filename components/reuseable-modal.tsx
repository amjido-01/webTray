"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface ReusableModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  placeholder?: string
  items: any[]
  renderItem: (item: any) => React.ReactNode
}

export function ReusableModal({
  isOpen,
  onOpenChange,
  title = "Items",
  placeholder = "Search...",
  items,
  renderItem,
}: ReusableModalProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="p-0 sm:max-w-[480px]">
        <SheetHeader className="p-6">
          <SheetTitle className="text-xl font-semibold">{title}</SheetTitle>
          <p className="text-sm font-normal text-muted-foreground">
            Total Products: {filtered.length}
          </p>
        </SheetHeader>

        <div className="p-4 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={placeholder}
              className="pl-10 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* List */}
          <div className="space-y-4">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => (
                <div key={idx} className="border-b pb-3">
                  {renderItem(item)}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">
                No results found.
              </p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
