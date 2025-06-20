"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { capitalizeFirstLetter } from "@/lib/capitalize";

export default function WelcomePage() {
  const { user } = useAuthStore()
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Trigger confetti when component mounts
    const canvas = confettiCanvasRef.current;
    if (canvas) {
      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      });

      // Fire confetti
      myConfetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0 },
        colors: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99"],
        ticks: 200,
        disableForReducedMotion: true,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100%", height: "100%" }}
      />

      <header className="p-6">
        <Image src="/logo.svg" alt="logo" width={100} height={24} />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden z-0">
          <div className="w-full h-full bg-blue-dots-pattern opacity-20"></div>
        </div>

        <div className="relative z-10 mb-8">
          <Image
            src="/welcome.svg"
            alt="welcome png"
            width={247}
            height={213}
          />
        </div>

        <h1 className="text-xl font-bold leading-[24px] text-[#4D4D4D] mb-[8px]">
          Welcome to WebTray, {capitalizeFirstLetter(user?.fullname)}!
        </h1>

        <p className="text-[#676767] leading-[22px] text-[14px] font-normal max-w-md mb-[50px]">
          Youre all set up. From here, you can add products, track orders,
          manage bookings, and create your e-commerce storefront — all in one
          place.
        </p>

        <Button
          className="bg-[#111827] hover:bg-[#2a2f46] text-white rounded-full px-8 py-6 font-medium text-[16px] leading-[100%]"
          asChild
        >
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>

        <div className="mt-12 text-gray-600">
          Click here to{" "}
          <Link href="/register-business" className="text-blue-600 hover:underline">
            Complete Business Registration
          </Link>
        </div>
      </main>
    </div>
  );
}
