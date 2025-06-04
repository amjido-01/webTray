"use client"

import * as React from "react"
import {
  IconChartBar,
  IconFolder,
  IconUsers,
  IconLayoutDashboard,
  IconPackage
} from "@tabler/icons-react"

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
import logo from "@/public/logo.svg";
import Image from "next/image"

const data = {
  user: {
    name: "Ala Jido",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
  return (
    <Sidebar className="" collapsible="offcanvas" {...props}>
      <SidebarHeader className="my-[30px]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Image src={logo} alt="logo" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
