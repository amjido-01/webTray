"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter()
  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="">
            <Image className="object-cover " src="/webtraylogo.png" width={140} height={40} alt="log image" />
          </div>

          <nav className="hidden text-[#4D4D4D] md:flex space-x-8">
            <Link className="font-medium text-[16px] hover:text-[#1A1A1A]" href="#">
              Feature
            </Link>
            <Link className="font-medium text-[16px] hover:text-[#1A1A1A]" href="#">
              Pricing
            </Link>
            <Link className="font-medium text-[16px] hover:text-[#1A1A1A]" href="#">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button  onClick={() => router.push("/signin")} size="lg" variant="link" className=" cursor-pointer font-medium text-[16px] hover:text-[#1A1A1A]">Sign In</Button>
            <Button  onClick={() => router.push("/signup")} size="lg" className=" hover:bg-[#30343e] cursor-pointer rounded-full bg-[#111827] font-medium text-[16px] text-[#FFFFFF] px-[16px] py-[14px]">Get Started for Free</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
