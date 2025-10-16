"use client"

import * as React from "react"
import {
  IconChartBar,
  IconFolder,
  IconUsers,
  IconLayoutDashboard,
  IconPackage
} from "@tabler/icons-react"
import { useAuthStore } from "@/store/useAuthStore"
// import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "Inventory",
      url: "/dashboard/inventory",
      icon: IconPackage,
    },
    {
      title: "Order",
      url: "/dashboard/order",
      icon: IconChartBar,
    },
    {
      title: "Storefront",
      url: "/dashboard/storefront",
      icon: IconFolder,
    },
    {
      title: "Customer",
      url: "/dashboard/customer",
      icon: IconUsers,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: IconUsers,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore()
  return (
    <Sidebar className="" collapsible="offcanvas" {...props}>
      <SidebarHeader className="my-[30px]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
               <Link href="#" className="flex items-center z-[60]">
              <Image src="/webtraylogo.png" width={140} height={40} alt="logo" />
            </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
       {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  )
}
