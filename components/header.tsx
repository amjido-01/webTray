// components/header.tsx
"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [mobileMenuOpen])

  const handleTabClick = (tab: string) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  }
  
  return (
    <>
      <header className="bg-white/75 backdrop-blur-sm fixed top-0 left-0 right-0 w-full z-50 border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18">
            <div 
              className="flex items-center z-[60] cursor-pointer" 
              onClick={() => handleTabClick('home')}
            >
              <Image src="/webtraylogo.png" width={140} height={40} alt="logo" />
            </div>
            
            <nav className="hidden md:flex text-[#4D4D4D] space-x-[20px]">
            
          
              <button
                className={`font-medium text-[16px] hover:text-[#1A1A1A] ${activeTab === 'features' ? 'border-b border-black font-semibold' : ''}`}
                onClick={() => handleTabClick('features')}
              >
                Features
              </button>
              <button 
                className={`font-medium text-[16px] hover:text-[#1A1A1A] ${activeTab === 'pricing' ? 'border-b border-black font-semibold' : ''}`}
                onClick={() => handleTabClick('pricing')}
              >
                Pricing
              </button>
              <button 
                className={`font-medium text-[16px] hover:text-[#1A1A1A] ${activeTab === 'contact' ? 'border-b border-black font-semibold' : ''}`}
                onClick={() => handleTabClick('contact')}
              >
                Contact Us
              </button>
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
             
              <Button 
                size="lg" 
                className="rounded-full bg-[#111827] hover:bg-[#30343e] font-medium text-[16px] text-white px-[16px] py-[14px]"
               
              ><Link href="/">
                 Join Waitlist
              </Link>
              </Button>
            </div>
            {/* <div className="hidden md:flex items-center space-x-4">
              <Button 
                size="lg" 
                variant="link" 
                className="font-medium text-[16px] hover:text-[#1A1A1A]"
               
              ><Link href="/signin">
                Sign In
              </Link>
              </Button>
              <Button 
                size="lg" 
                className="rounded-full bg-[#111827] hover:bg-[#30343e] font-medium text-[16px] text-white px-[16px] py-[14px]"
               
              ><Link href="/signup">
                Get Started for Free
              </Link>
              </Button>
            </div> */}
            
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
            className="fixed  inset-0 bg-black/50 z-[55] md:hidden animate-in fade-in duration-300" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          
          {/* Menu Drawer */}
          <div className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-[56] md:hidden shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex flex-col h-full">
              {/* Menu Header Spacing */}
              <div className="h-16 md:h-18" />
              
              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto  p-2 space-y-1">
                <nav className="flex flex-col  ">
                 
                  <button 
                    className={`font-medium text-[16px] py-2 text-left ${activeTab === 'features' ? 'border-b border-[#1A1A1A] ' : 'text-[#4D4D4D]'} hover:text-[#1A1A1A]`}
                    onClick={() => handleTabClick('features')}
                  >
                    Features
                  </button>
                  <button 
                    className={`font-medium text-[16px] py-2 text-left ${activeTab === 'pricing' ? 'border-b border-[#1A1A1A] ' : 'text-[#4D4D4D]'} hover:text-[#1A1A1A]`}
                    onClick={() => handleTabClick('pricing')}
                  >
                    Pricing
                  </button>
                  <button 
                    className={`font-medium text-[16px] py-2 text-left ${activeTab === 'contact' ? 'border-b border-[#1A1A1A] ' : 'text-[#4D4D4D]'} hover:text-[#1A1A1A]`}
                    onClick={() => handleTabClick('contact')}
                  >
                    Contact
                  </button>
                </nav>
                
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  {/* <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full font-medium text-[16px]"
                    onClick={() => handleTabClick('signin')}
                  >
                    Sign In
                  </Button> */}
                  {/* <Button 
                    size="lg" 
                    className="w-full rounded-full bg-[#111827] hover:bg-[#30343e] font-medium text-[16px] text-white"
                    onClick={() => handleTabClick('signup')}
                  >
                    Get Started for Free
                  </Button> */}
                  <Button 
                    size="lg" 
                    className="w-full rounded-full bg-[#111827] hover:bg-[#30343e] font-medium text-[16px] text-white"
                    onClick={() => handleTabClick('/')}
                  >
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}