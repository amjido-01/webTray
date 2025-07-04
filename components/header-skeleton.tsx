import { Skeleton } from "./ui/skeleton";

export function PageHeaderSkeleton() {
  return (
      <div className="flex justify-between items-center animate-pulse">
            <div className="text-[#4D4D4D]">
              <Skeleton className="h-6 bg-gray-200 rounded-md w-48 mb-2" />
              <Skeleton className="h-4 bg-gray-200 rounded-md w-64" />
            </div>
            <Skeleton className="h-10 bg-gray-200 rounded-full w-24" />
          </div>
  )
}
