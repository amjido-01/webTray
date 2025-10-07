"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

   useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  return (
    <header className="bg-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 border2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="">
            <Image className="object-cover " src="/webtraylogo.png" width={140} height={40} alt="log image" />
          </div>

          <nav className="hidden md:flex text-[#4D4D4D] space-x-8">
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

          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => router.push("/signin")}
              size="lg"
              variant="link"
              className="cursor-pointer font-medium text-[16px] hover:text-[#1A1A1A]"
            >
              Sign In
            </Button>
            <Button
              onClick={() => router.push("/signup")}
              size="lg"
              className="hover:bg-[#30343e] cursor-pointer rounded-full bg-[#111827] font-medium text-[16px] text-[#FFFFFF] px-[16px] py-[14px]"
            >
              Get Started for Free
            </Button>
          </div>

          {!mobileMenuOpen && (
            <button
              className="md:hidden p-2 text-[#4D4D4D] hover:text-[#1A1A1A]"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 w-[80%] left-0 right-0 bottom-0 bg-white z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            className="p-2 text-[#4D4D4D] hover:text-[#1A1A1A]"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-6 space-y-4 h-full overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            <Link
              className="font-medium text-[16px] text-[#4D4D4D] hover:text-[#1A1A1A] py-2"
              href="#"
              onClick={() => setMobileMenuOpen(false)}
            >
              Feature
            </Link>
            <Link
              className="font-medium text-[16px] text-[#4D4D4D] hover:text-[#1A1A1A] py-2"
              href="#"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              className="font-medium text-[16px] text-[#4D4D4D] hover:text-[#1A1A1A] py-2"
              href="#"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
            <Button
              onClick={() => {
                router.push("/signin")
                setMobileMenuOpen(false)
              }}
              size="lg"
              variant="outline"
              className="w-full cursor-pointer font-medium text-[16px]"
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                router.push("/signup")
                setMobileMenuOpen(false)
              }}
              size="lg"
              className="w-full hover:bg-[#30343e] cursor-pointer rounded-full bg-[#111827] font-medium text-[16px] text-[#FFFFFF]"
            >
              Get Started for Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
