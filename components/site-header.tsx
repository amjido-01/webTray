"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User, Settings, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import SearchComponent from "@/components/search-component";
import { StoreSwitcher } from "./StoreSwitcher";

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="mt-[34px] mb-[24px] bg-[#FFFFFF] rounded-full border flex h-[69px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 hidden md:flex" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <StoreSwitcher />

        {/* {pathname === "/dashboard" && <SearchComponent />} */}

        {/* Right section */}
        <div className="ml-auto flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <Link href="/notification" aria-label="Notification">
              <Settings className="text-[#808080]" />
            </Link>
            <Link href="/notification" aria-label="Notification">
              <User className="text-[#808080]" />
            </Link>
            <Link href="/notification" aria-label="Notification">
              <Bell className="text-[#808080]" />
            </Link>
          </div>

          {/* Mobile Trigger on Right */}
          <SidebarTrigger className="flex md:hidden" />
        </div>
      </div>
    </header>
  );
}
