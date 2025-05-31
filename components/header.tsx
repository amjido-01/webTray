import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-gray-900">WebTray</span>
          </div>

          {/* Navigation */}
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

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="link" className=" cursor-pointer font-medium text-[16px] hover:text-[#1A1A1A]">Sign In</Button>
            <Button className=" hover:bg-[#30343e] cursor-pointer rounded-full bg-[#111827] font-medium text-[16px] text-[#FFFFFF] px-[16px] py-[14px]">Get Started for Free</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
