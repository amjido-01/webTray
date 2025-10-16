import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"


export default function SearchComponent() {
  return (
    <div className="w-[363px] border-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search anything..."
          className="pl-10 pr-4 py-2 w-full rounded-full border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  )
}
