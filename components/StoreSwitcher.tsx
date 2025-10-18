"use client"

import * as React from "react"
import {
  Check,
  Store,
  ChevronDown,
} from "lucide-react"
// import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuthStore } from "@/store/useAuthStore"
import { useQueryClient } from "@tanstack/react-query"

export function StoreSwitcher() {
  const [open, setOpen] = React.useState(false)
  const { user, stores, activeStore, switchStore } = useAuthStore()
  const queryClient = useQueryClient()

  if (!user || !stores?.length) {
    return null
  }

  const handleStoreSelect = (storeId: number) => {
    switchStore(storeId)
    setOpen(false)

    // Invalidate all store-dependent queries
    queryClient.invalidateQueries({ queryKey: ['products'] })
    queryClient.invalidateQueries({ queryKey: ['categories'] })
    queryClient.invalidateQueries({ queryKey: ['orders'] })
    queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    queryClient.invalidateQueries({ queryKey: ['inventory'] })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="rounded-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className="w-[200px] justify-between"
        >
          <Store className="mr-2 h-4 w-4" />
          {activeStore?.storeName}
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup heading="Stores">
            {stores.map((store) => (
              <CommandItem
                key={store.id}
                onSelect={() => handleStoreSelect(store.id)}
                className="text-sm"
              >
                <Store className="mr-2 h-4 w-4" />
                {store.storeName}
                {activeStore?.id === store.id && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}