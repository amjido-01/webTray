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
      <div className="max-w-7xl mx-auto md:mt-[70px] px-4 sm:px-6 lg:px-8 pt-16 pb-8l">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[40px] leading-[100%] text-[#1A1A1A] font-bold md:mb-[24px] mb-[16px  ] text-balance">How It Works</h2>
          <p className="text-[#4D4D4D] text-[16px] leading-[24px] font-normal">Get Started in 3 Simple Steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex p-4 rounded-xl ${step.color} mb-6`}>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[14px] md:text-[16px] leading-[100%] mb-2 text-balance text-[#1A1A1A]">{step.title}</h3>
              <p className="text-[#4D4D4D] text-[12px] md:text-[14px] leading-[100%] font-normal text-pretty">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
