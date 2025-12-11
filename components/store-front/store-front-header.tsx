"use client";

import { usePathname } from "next/navigation";

import Image from "next/image";

export function StoreFrontHeader() {
  const pathname = usePathname();
  return (
    <header className="">
      <div className="flex w-full justify-between items-center  ">
    <div className="flex items-center justify-center gap-2">
        <h1>Home</h1>
        <h1>Products</h1>
    </div>
      <div>
        <h1 className="text-[#1A1A1A] font-semibold">CoffeeShop</h1>
      </div>
    <div className="flex items-center justify-center gap-2">
        <Image src="/icons/shop.png" width={30} height={30} alt="icon"/>
        <h1 className="bg-[#111827] text-white py-2 px-6 rounded-sm">Contact</h1>
    </div>
 
      </div>
      
    </header>
  );
}
