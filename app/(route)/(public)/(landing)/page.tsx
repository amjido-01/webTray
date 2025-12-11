"use client"
import Hero from "@/components/hero-section";
import { FeaturesSections } from "@/components/features";
import { AllInOne } from "@/components/all-in-one";
import { HowItWorksSection } from "@/components/how-it-works";
import { WhyChoose } from "@/components/why-choose";
import { WhoIsItFor } from "@/components/who-is-it-for";
import { Testimonials } from "@/components/testimonials";
import { CTASection } from "@/components/cta-section";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="">
      <Header />
      <Hero />
      <FeaturesSections />
      <AllInOne />
      <HowItWorksSection />
      <WhyChoose />
      <WhoIsItFor />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}