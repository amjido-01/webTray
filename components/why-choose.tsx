import { TrendingUp, ShoppingCart, Package, Users } from "lucide-react";
import Image from "next/image";
export function WhyChoose() {
  const features = [
    {
      icon: TrendingUp,
      title: "Revenue",
      description: "Track Your Earnings Instantly",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: ShoppingCart,
      title: "Orders",
      description: "Stay Ahead of Every Order",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Package,
      title: "Products",
      description: "Manage Products with Ease",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      title: "Customers",
      description:
        "Access customer details, order history, and insights to build stronger relationships.",
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-[112px] md:mt-[164px] px-4 sm:px-6 lg:px-8 pt16 pb8">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-center text-[#1A1A1A] text-[24px] font-bold text-balance leading-[100%] md:text-[40px] mb-[24px]">
            Why Choose WebTray
          </h2>
          <p className="max-w-3xl mx-auto text-[16px] font-normal leading-[24px] text-[#4D4D4D] text-pretty">
            Stay on top of everything that matters — track performance, manage
            activity, and make decisions in real time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 md:w-[80%] mx-auto gap-8 lg:gap-0 items-center">
          {/* Mobile Mockup */}
          <div>
            <Image
              src="/iphone.webp"
              alt="Mobile mockup"
              width={400}
              height={800}
              className="mx-auto w-[153px] h-[313px] md:w-[274px] md:h-[560px]"
            />
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 ">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-3 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
