"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  IconLayoutDashboard, 
  IconPackage, 
  IconShoppingCart, 
  IconDotsVertical 
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/ui/sidebar"

export function MobileBottomNav() {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()
  
  const navItems = [
    { label: "Home", href: "/dashboard", icon: IconLayoutDashboard },
    { label: "Inventory", href: "/dashboard/inventory", icon: IconPackage },
    { label: "Orders", href: "/dashboard/order", icon: IconShoppingCart },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-[80px] items-center justify-around bg-white md:hidden px-4 border-t border-gray-100 pb-2 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
        return (
          <Link 
            key={item.label} 
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1.5 transition-all w-full",
              isActive ? "text-[#365BEB]" : "text-[#808080]"
            )}
          >
            <div className={cn(
              "p-2 rounded-2xl transition-all duration-200",
              isActive ? "bg-[#365BEB]/10" : "bg-transparent"
            )}>
              <item.icon size={24} stroke={isActive ? 2.5 : 2} />
            </div>
            <span className={cn(
              "text-[10px] font-semibold tracking-tight",
              isActive ? "text-[#365BEB]" : "text-[#808080]"
            )}>
              {item.label}
            </span>
          </Link>
        )
      })}
      
      {/* More Trigger */}
      <button 
        onClick={toggleSidebar}
        className="flex flex-col items-center gap-1.5 transition-all w-full text-[#808080]"
      >
        <div className="p-2 rounded-2xl bg-gray-50">
          <IconDotsVertical size={24} stroke={2} />
        </div>
        <span className="text-[10px] font-semibold tracking-tight text-[#808080]">More</span>
      </button>
    </div>
  )
}
