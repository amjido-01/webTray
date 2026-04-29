import FeatureTab from '@/components/Feature-tab'
import { Footer } from '@/components/footer'
import Header from '@/components/header'
import { PricingSection } from '@/components/pricing-section'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Pricing | Simple, Transparent Plans",
  description: "Choose the perfect plan for your business growth.",
};

const page = () => {
  return (
    <div>
         <Header />
  <PricingSection/>
            <Footer />
    </div>
  )
}

export default page
