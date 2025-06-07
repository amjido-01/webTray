import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, ShoppingCart, Package, Users } from "lucide-react"

const metrics = [
  {
    title: "Total Revenue",
    value: "₦200,000.00",
    change: "+32.6% from last month",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Orders",
    value: "467",
    change: "+8% from last month",
    icon: ShoppingCart,
    trend: "up",
  },
  {
    title: "Products",
    value: "64",
    change: "+4 new this week",
    icon: Package,
    trend: "up",
  },
  {
    title: "Customers",
    value: "3,768",
    change: "+200 new this week",
    icon: Users,
    trend: "up",
  },
]

export function SectionCards() {
  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        <p className="text-gray-600 mt-1">{"Here's what's happening with your business today."}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card className="border-0 shadow-none" key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-[16px] font-Lato font-weight-[500] text-[#1A1A1A]">{metric.value}</div>
                <p className="text-[10px] text-[#808080] mt-1 font-weight-[400]">{metric.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
