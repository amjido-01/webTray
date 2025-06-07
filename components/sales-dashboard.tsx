import {TrendingDown, Package, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SalesDashboard() {
  return (
    <div className="py-4 w-full">
      <div className="flex flex-wrap gap-2">
        <Card className="flex-1 min-w-[150px] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="">+4 new this week</span>
            </p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[240px] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500">Need Attention</span>
            </p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[240px] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N200,000.00</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="">Inventory Value</span>
            </p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[240px] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Category</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="">Product Categories</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
