import FeatureTab from '@/components/Feature-tab'
import { Footer } from '@/components/footer'
import Header from '@/components/header'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Features | Powerful Tools for Your Business",
  description: "Explore the features that make Webtray the best choice for SME commerce.",
};

const page = () => {
  return (
    <div>
         <Header />
      <FeatureTab/>
            <Footer />
    </div>
  )
}

export default page
