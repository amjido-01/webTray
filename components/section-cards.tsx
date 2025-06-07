import { TrendingUp, ShoppingCart, Package, Users } from "lucide-react"
import { PageHeader } from "./page-header"
import { StatCard } from "./stat-card"
const stats = [
  {
    title: "Total Revenue",
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    value: "₦200,000.00",
    note: "+32.6% from last month",
  },
  {
    title: "Orders",
    value: "467",
    note: "+8% from last month",
    icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Products",
    value: "64",
    note: "+4 new this week",
    icon: <Package className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Customers",
    value: "3,768",
    note: "+200 new this week",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
]

export function SectionCards() {
  return (
    <div className="">
      <PageHeader 
         title="Overview"
        subtitle="Manage your products and track stock levels"
      />
      <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
         {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  )
}
