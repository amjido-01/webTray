import Hero from "@/components/hero-section";
import { Features } from "@/components/features";
import { AllInOne } from "@/components/all-in-one";
import { HowItWorksSection } from "@/components/how-it-works";
import { WhyChoose } from "@/components/why-choose";
import { WhoIsItFor } from "@/components/who-is-it-for";
import { Testimonials } from "@/components/testimonials";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
export default function Home() {
  return (
    <div className="">
      <Header />
      <Hero />
      <Features />
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
