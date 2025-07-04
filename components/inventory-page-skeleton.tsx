"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { PageHeaderSkeleton } from "./header-skeleton";

export default function InventoryPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <PageHeaderSkeleton />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Stats Skeleton */}
          <div className="grid mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-6 border rounded-lg bg-card animate-pulse">
                <Skeleton className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <Skeleton className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
                <Skeleton className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
