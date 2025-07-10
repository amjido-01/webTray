"use client";


export default function DashboardPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Skeleton */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between animate-pulse">
          {/* Search bar skeleton */}
          <div className="flex items-center space-x-3">
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-64"></div>
          </div>

          {/* Right side icons skeleton */}
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-80"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-5 bg-gray-200 rounded w-24"></div>
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-28"></div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Recent Orders Skeleton */}
         

          {/* Stock Alert Skeleton */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between animate-pulse">
                <div>
                  <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>

            {/* Stock items skeleton */}
            <div className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-28"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
