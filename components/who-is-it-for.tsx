import Image from "next/image";

export function WhoIsItFor() {
  const categories = [
    {
      title: "Restaurants & Kitchens",
      image: "/restaurant.jpg",
    },
    {
      title: "Retail Shops",
      image: "/retail.jpg",
    },
    {
      title: "Service Providers",
      image: "/service.jpg",
    },
    {
      title: "Clinics & Wellness Centers",
      image: "/center.jpg",
    },
    {
      title: "Juice Bars & Pop-Up Vendors",
      image: "/vendors.jpg",
    },
    {
      title: "Online Vendors",
      image: "/online.jpg",
    },
  ];

  return (
    <section className="py-16 px-4 md:py-24 bg-gradient-to-b mt-[164px] from-[#F0F3FE] to-[#F4EAFD]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[40px] font-bold mb-4 text-balance text-[#1A1A1A] leading-tight">
            Who is WebTray For
          </h2>
          <p className="mb-16 text-pretty text-[16px] font-normal leading-[24px] text-[#4D4D4D]">
            Built for All Kinds of Businesses
          </p>
        </div>

        <div className="md:w-[90%] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500
                 w-[90%] h-[383px] md:w-[358px] md:h-[383px] mx-auto
                 ${(index === 1 || index === 4) ? "lg:-translate-y-12" : ""}`}
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
              
              <div className="absolute bottom-6 left-4 right-4 bg-black/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex flex-col items-start gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="shrink-0 mb-1">
                  <Image src="/footer-logo.png" alt="logo" width={24} height={24} className="w-6 h-6 object-contain" />
                </div>
                <h3 className="text-white text-[16px] font-bold leading-tight">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
