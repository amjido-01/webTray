import React from 'react'
import { Skeleton } from './ui/skeleton'

export const TableSkeleton = () => {
  return (
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
          </div>  )
}
