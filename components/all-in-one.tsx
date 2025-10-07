import Image from "next/image";

export function AllInOne() {
  return (
    <section className="w-full py16 px-4 md:py24 mt-[164px]">
      <div className="max-w-7xl mx-auto md:mt-[70px] px-4 sm:px-6 lg:px-8 pt16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-center mb-[16px] text-[#1A1A1A] md:text-start text-[24px] font-bold md:text-[40px] lg:text-6xl text-balance">
              All You Need in One Platform.
            </h1>
            <p className="text-lg md:text-xl text-center md:text-start text-[#4D4D4D] font-normal text-[16px] leading-relaxed">
             Switch to a single platform built to simplify operations, reduce stress, and help your business scale.
            </p>
          </div>

          {/* Right Mockup */}
          <div className="relative">
            <Image
              src="/all-in-one.png"
              alt="All in one mockup"
              width={600}
              height={400}
              className="w-full h-auto md:w-[493px] md:h-[263px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
