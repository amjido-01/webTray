import FeatureTab from '@/components/Feature-tab'
import { Footer } from '@/components/footer'
import Header from '@/components/header'
import { PricingSection } from '@/components/pricing-section'
import React from 'react'

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
