// app/page.tsx
"use client"
import { useState } from "react"
import Hero from "@/components/hero-section";
import {  FeaturesSections } from "@/components/features";
import { AllInOne } from "@/components/all-in-one";
import { HowItWorksSection } from "@/components/how-it-works";
import { WhyChoose } from "@/components/why-choose";
import { WhoIsItFor } from "@/components/who-is-it-for";
import { Testimonials } from "@/components/testimonials";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { PricingSection } from "@/components/pricing-section";
import FeatureTab from "@/components/Feature-tab";
import ContactUs from "@/components/Contact-Us";

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero />
            <FeaturesSections />
            <AllInOne />
            <HowItWorksSection />
            <WhyChoose />
            <WhoIsItFor />
            <Testimonials />
            <CTASection />
          </>
        );
      case 'features':
        return (
          <div className="">
          
        <FeatureTab/>
            </div>
        
        );
      case 'pricing':
        return <PricingSection />;
      case 'contact':
        return (
          <div className="pt-24 pb-16">
           <ContactUs/>
          </div>
        );
      case 'signin':
        return (
          <div className="pt-24 pb-16">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
                Sign In
              </h1>
          
            </div>
          </div>
        );
      case 'signup':
        return (
          <div className="pt-24 pb-16">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
                Sign Up
              </h1>
         
            </div>
          </div>
        );
      default:
        return (
          <>
            <Hero />
            <FeaturesSections />
            <AllInOne />
            <HowItWorksSection />
            <WhyChoose />
            <WhoIsItFor />
            <Testimonials />
            <CTASection />
          </>
        );
    }
  };

  return (
    <div className="">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
      <Footer />
    </div>
  );
}