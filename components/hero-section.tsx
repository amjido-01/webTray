"use client"
import { Button } from "@/components/ui/button"
import Header from "@/components/header";
import hero from "@/public/hero.png";
import Image from "next/image";
import confeti_right from "@/public/confeti_right.svg"
import confeti_left from "@/public/confeti_left.svg"
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="max-w-7xl mx-auto mt[40px] md:mt-[80px] px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="text-center relative">
          <h1 className="text-4xl md:text-5xl font-extrabold md:text-[80px] leading-[100%] text-gray-900">
            Your Business, <span className="bg-gradient-to-br from-[#365BEB] to-[#9233EA] bg-clip-text text-transparent">Simplified</span>
          </h1>
          <p className="text-[16px] mt-[24px] font-normal leading-[24px] text-[#4D4D4D] max-w-3xl mx-auto">
            WebTray is the all-in-one SaaS platform for restaurants and retail shops. Manage inventory, create your
            online store, and grow your business with ease.
          </p>
          <div className="flex mt-[40px] items-center sm:flex-row gap-4 justify-center">
            <Button size="lg"  onClick={() => router.push("/signup")} className="bg-[#111827] hover:bg-[#30343e] cursor-pointer text-[16px] font-normal rounded-full text-white px-[16px] py-[14px]">
              Sign Up for Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/contact')} className="rounded-full text-[16px] font-normal text-[#111827] px-[16px] py-[14px] cursor-pointer">
              Contact for Enquiries
            </Button>
          </div>
        <Image className="absolute w-[300px] h-[300px] -left-5 top-22" src={confeti_left} alt="confeti" />

        <Image className="absolute w-[300px] h-[300px] -right-5 top-22" src={confeti_right} alt="confeti" />

        </div>

       <div className="mt-[64px] md:mt-[88px]">
        <Image src={hero} alt="hero image" className="md:w-[80%] md:h-auto object-cover mx-auto"/>
       </div>
      </section>
    </div>
  )
}
