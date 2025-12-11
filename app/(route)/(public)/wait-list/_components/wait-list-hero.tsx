import { Button } from "@/components/ui/button";
import Image from "next/image";
import confeti_right from "@/public/confeti_right.svg";
import confeti_left from "@/public/confeti_left.svg";
import Link from "next/link";
import waitlist from "@/public/waitlist.jpg"

export default function WaitlistHero() {
  return (
    <section className="max-w-7xl mx-auto mt-[80px] md:mt-[100px] px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div className="text-center relative">
        <h1 className="text-5xl font-extrabold md:text-[64px] leading-[100%] text-gray-900">
          Be the First to Experience WebTray!
        </h1>
        <p className="text-[16px] mt-[24px] font-normal leading-6 text-[#4D4D4D] max-w-3xl mx-auto">
          WebTray helps vendors like you sell smarter — from WhatsApp to your
          own online store, all in one place. Join the waitlist today to get
          early access and exclusive perks when we go live in your city!
        </p>
        <div className="flex mt-[40px] flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-[#111827] hover:bg-[#30343e] rounded-full text-white px-[16px] py-[14px]"
          >
            <Link href="/">
              <span className="text-nowrap text-white">Join Waitlist</span>
            </Link>
          </Button>
        </div>

        <Image
          className="absolute w-[300px] h-[300px] -left-5 top-22"
          src={confeti_left}
          alt="confeti"
        />
        <Image
          className="absolute w-[300px] h-[300px] -right-5 top-22"
          src={confeti_right}
          alt="confeti"
        />
      </div>

      <div className="mt-[88px]">
        <Image className=" rounded-[20px] w-[90%] mx-auto" src={waitlist} alt="hero image" />
      </div>
    </section>
  );
}
