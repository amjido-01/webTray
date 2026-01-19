import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StoreFrontSkeleton() {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="mb-[20px]">
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Store Status Card Skeleton */}
      <div className="mt-[20px]">
        <Card className="shadow-none border-none rounded-none">
          <CardHeader className="leading-[24px]">
            {/* Title and Toggle */}
            <div className="flex justify-between items-start">
              <Skeleton className="h-7 w-48" />
              <div className="flex items-center gap-[8px]">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-6 w-11 rounded-full" />
              </div>
            </div>
            
            {/* Description */}
            <Skeleton className="h-4 w-64 mt-2" />
            
            {/* Badge and Domain */}
            <CardContent className="flex p-0 gap-[10px] items-center mt-4">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-5 w-48" />
            </CardContent>
          </CardHeader>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto mt-[24px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Store Information Card Skeleton */}
          <Card className="flex flex-col  border-none shadow-none rounded-none">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-56 mt-2" />
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              {/* Store Name */}
              <div>
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-4 w-full" />
              </div>
              
              {/* Description */}
              <div>
                <Skeleton className="h-5 w-28 mb-1" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>
              
              {/* Domain */}
              <div>
                <Skeleton className="h-5 w-20 mb-1" />
                <Skeleton className="h-4 w-full" />
              </div>
              
              {/* Edit Button */}
              <div className="pt-4">
                <Skeleton className="h-10 w-full rounded-full" />
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Two Cards Stacked */}
          <div className="space-y-6">
            {/* Manage Products Card Skeleton */}
            <Card className="flex flex-col border-none shadow-none rounded-none">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex-1">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-64 mt-1" />
                </div>
                <Skeleton className="h-9 w-36 rounded-full" />
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-center py-8">
                  <Skeleton className="h-12 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
              </CardContent>
            </Card>

            {/* Domain Settings Card Skeleton */}
            <Card className="flex border-none flex-col shadow-none rounded-none">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex-1">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-56 mt-1" />
                </div>
                <Skeleton className="h-9 w-32 rounded-full" />
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-4 w-28" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
