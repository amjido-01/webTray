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
    <section className="py-16 px-4 md:py-24 bg-gradient-to-b from-[#F0F3FE] to-[#F4EAFD]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Who is WebTray For
          </h2>
          <p className="text-muted-foreground text-pretty">
            Built for All Kinds of Hustle
          </p>
        </div>

        <div className="md:w-[90%] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow
                 w-[90%] h-[383px] md:w-[358px] md:h-[383px] mx-auto"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                width={353} // These can be anything; they won’t matter since we use className sizes
                height={383}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl text-balance">
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
