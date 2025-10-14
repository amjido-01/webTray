"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [mobileMenuOpen])
  
  return (
    <>
      <header className="bg-white/75 backdrop-blur-sm fixed top-0 left-0 right-0 w-full z-50 border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
            <Link href="/" className="flex items-center z-[60]">
              <Image src="/webtraylogo.png" width={140} height={40} alt="logo" />
            </Link>
            
            <nav className="hidden md:flex text-[#4D4D4D] space-x-8">
              <Link className="font-medium text-[16px] hover:text-[#1A1A1A]" href="#">Feature</Link>
              <Link className="font-medium text-[16px] hover:text-[#1A1A1A]" href="#">Pricing</Link>
              <Link className="font-medium text-[16px] hover:text-[#1A1A1A]" href="#">Contact</Link>
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/signin">
                <Button size="lg" variant="link" className="font-medium text-[16px] hover:text-[#1A1A1A]">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" className="rounded-full bg-[#111827] hover:bg-[#30343e] font-medium text-[16px] text-white px-[16px] py-[14px]">
                  Get Started for Free
                </Button>
              </Link>
            </div>
            
            <button 
              className="md:hidden p-2 text-[#4D4D4D] z-[60]" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay and Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-[55] md:hidden animate-in fade-in duration-300" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          
          {/* Menu Drawer */}
          <div className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-[56] md:hidden shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex flex-col h-full">
              {/* Menu Header Spacing */}
              <div className="h-16 md:h-18" />
              
              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                <nav className="flex flex-col space-y-4">
                  <Link 
                    className="font-medium text-[16px] py-2 text-[#4D4D4D] hover:text-[#1A1A1A]" 
                    href="#" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Feature
                  </Link>
                  <Link 
                    className="font-medium text-[16px] py-2 text-[#4D4D4D] hover:text-[#1A1A1A]" 
                    href="#" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link 
                    className="font-medium text-[16px] py-2 text-[#4D4D4D] hover:text-[#1A1A1A]" 
                    href="#" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
                
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="lg" variant="outline" className="w-full font-medium text-[16px]">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="lg" className="w-full rounded-full bg-[#111827] hover:bg-[#30343e] font-medium text-[16px] text-white">
                      Get Started for Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}