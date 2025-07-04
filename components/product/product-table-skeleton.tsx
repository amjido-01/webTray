"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function InventoryPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
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

          {/* Table Skeleton */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-20 bg-gray-200" />
                <Skeleton className="h-10 w-32 rounded-md bg-gray-200" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 bg-gray-200" />
                  <Skeleton className="h-10 w-64 bg-gray-200" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-32 bg-gray-200" />
                  <Skeleton className="h-10 w-24 bg-gray-200" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="grid grid-cols-7 gap-4 p-4 border-b border-gray-100 bg-gray-50/50">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 bg-gray-200 w-12" />
                ))}
              </div>

              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-7 gap-4 p-4 border-b border-gray-100 items-center hover:bg-gray-50/50"
                >
                  <Skeleton className="h-4 w-6 bg-gray-200" />
                  <div className="space-y-1 bg-gray-200">
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                    <Skeleton className="h-3 w-24 bg-gray-200" />
                  </div>
                  <Skeleton className="h-4 w-20 bg-gray-200" />
                  <Skeleton className="h-4 w-16 bg-gray-200" />
                  <Skeleton className="h-4 w-20 bg-gray-200" />
                  <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
                  <div className="flex gap-2">
                    {Array.from({ length: 2 }).map((_, j) => (
                      <Skeleton key={j} className="h-8 w-8 rounded bg-gray-200" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-100">
              <Skeleton className="h-4 w-32 bg-gray-200" />
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8 bg-gray-200" />
                ))}
                <Skeleton className="h-8 w-20 bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
