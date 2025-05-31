import { Button } from "@/components/ui/button"
import Header from "@/components/header";
import hero_img from "@/public/hero_img.png";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Business, <span className="text-purple-600">Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            WebTray is the all-in-one SaaS platform for restaurants and retail shops. Manage inventory, create your
            online store, and grow your business with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8">
              Sign Up for Free
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Contact for Enquiries
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
       <div>
        <Image src={hero_img} alt="hero image" />
       </div>
      </section>
    </div>
  )
}
