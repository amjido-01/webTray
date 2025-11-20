import WaitlistHero from "@/app/(route)/(public)/wait-list/_components/wait-list-hero";
import Header from "./_components/wait-list-header";
import { WhoIsItFor } from "@/components/who-is-it-for";
import { Footer } from "@/components/footer";
import WaitlistForm from "./_components/wait-list-form";
export default function WaitlistPage() {
  return (
    <>
      <Header />
      <WaitlistHero />
      <WaitlistForm />
      <WhoIsItFor />
      <Footer />
    </>
  );
}
