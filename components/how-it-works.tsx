import { Plus, Store, TrendingUp } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Plus,
      title: "Sign Up & Add Your Products",
      description: "Inventory management starts here.",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: Store,
      title: "Customize Your Storefront",
      description: "Add your logo, brand colors, and domain.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Start Selling & Managing Orders",
      description: "Go live and run everything from your dashboard.",
      color: "bg-amber-100 text-amber-600",
    },
  ]

  return (
    <section className="">
      <div className="max-w-7xl mx-auto mt-[87px] md:mt-[164px] px-4 sm:px-6 lg:px-8 pt16 border2 pb8l">
        <div className="text-center mb-[40px] md:mb-12">
          <h2 className="text-[24px] leading-[100%] md:text-[40px] font-bold text-balance , text-center mb-[16px] text-[#1A1A1A] lgtext-start lg:text-6xl md:text-5xl md:mb-[24px]">How It Works</h2>
          <p className="text-[16px] font-normal leading-[24px] text-[#4D4D4D] text-pretty">Get Started in 3 Simple Steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-3 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex p-4 rounded-xl ${step.color} mb-6`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className=" font-semibold md:font-bold text-[14px] md:text-[16px] leading-[100%] mb-2 text-balance text-[#1A1A1A]">{step.title}</h3>
              <p className="text-[#4D4D4D] text-[12px] md:text-[14px] leading-[100%] font-normal text-pretty">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
