import Image from "next/image"

export function Testimonials() {
  const testimonials = [
    {
      role: "Restaurant Owner - User Tester",
      quote:
        "Before WebTray, I was tracking inventory on paper and handling orders through WhatsApp. Now, everything is in one place, and I actually have time to focus on other things.",
      name: "Chika Obi",
      image: "/ts1.png", // <-- Replace with real image
    },
    {
      role: "Retail Shop Owner - User Tester",
      quote:
        "Adding products and managing stock takes me just a few minutes now. The dashboard is clean and easy — even my staff can use it without extra training",
      name: "Umar Haruna",
      image: "/ts2.png",
    },
    {
      role: "Juice Bar Startup - User Tester",
      quote:
        "I launched my online storefront in a single afternoon. Customers can order directly, and I don't have to explain my menu over and over again.",
      name: "Zainab Yusuf",
      image: "/ts3.png",
    },
    {
      role: "Service Provider (Salon) - User Tester",
      quote:
        "Bookings used to be messy with phone calls and missed messages. WebTray gave me a simple way to manage appointments, and my clients love it.",
      name: "Adeshina Mariam",
      image: "/ts4.png",
    },
    {
      role: "Small Business Manager - User Tester",
      quote:
        "What I like most is the clarity. I can see revenue, orders, and customers on one screen — it makes decision-making so much faster.",
      name: "Tunde Adeyayo",
      image: "/ts5.png",
    },
    {
      role: "Market Vendor Going Digital - User Tester",
      quote:
        "I never thought I could have my own online shop, but WebTray made it easy. My business looks professional now, and I'm reaching more customers.",
      name: "Grace Eze",
      image: "/ts6.png",
    },
  ]

  return (
    <section className="py16 md:py24 mx-auto mt-[112px] md:mt-[164px] px-4 sm:px-6 lg:px-8 pt16 pb8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[40px] font-bold mb-4 text-balance text-[24px] text-[#1A1A1A] leading-[100%]">Testimonials</h2>
          <p className="text-[16px] font-normal leading-[24px] text-[#4D4D4D] text-pretty">What our user testers are saying about us</p>
        </div>

        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-balance text-[#1A1A1A] text-[14px] leading-[100%]">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-[#1A1A1A] leading-[22px] mb-4 text-pretty text-[14px] font-medium">{testimonial.quote}</p>
              <p className="text-sm leading-[100%] text-[#4D4D4D] text-[12px] font-normal">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
