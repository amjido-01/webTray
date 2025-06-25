import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"
import { Button } from "./ui/button"

interface StatCardProps {
  title: string
  icon: ReactNode
  value: string | number
  note: string
  noteColor?: string
}

export function StatCard({
  title,
  icon,
  value,
  note,
  noteColor = "text-muted-foreground",
}: StatCardProps) {
  return (
    <Card className={`border-0 shadow-none`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex justify-between items-center">
          <p className={`text-xs mt-1 ${noteColor}`}>
          <span>{note}</span>
        </p>
         {title === "Category" && (<Button size="sm" className="text-white hover:bg-[#5f70b4] bg-[#365BEB] rounded-full">Add New</Button>)}
        </div>
      </CardContent>
    </Card>
  )
}
