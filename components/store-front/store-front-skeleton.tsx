import React from 'react';

const StoreFrontSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header Skeleton */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
              <nav className="hidden md:flex gap-6">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="h-9 w-20 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        {/* Hero Slider Skeleton */}
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 px-4">
              <div className="h-8 w-32 bg-gray-300 rounded-full mx-auto"></div>
              <div className="h-16 md:h-24 w-64 md:w-96 bg-gray-300 rounded-lg mx-auto"></div>
              <div className="h-10 w-48 bg-gray-300 rounded-lg mx-auto"></div>
              <div className="h-6 w-72 bg-gray-300 rounded mx-auto"></div>
              <div className="h-12 w-40 bg-gray-300 rounded-lg mx-auto"></div>
            </div>
          </div>
          
          {/* Navigation Arrows Skeleton */}
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full"></div>
          <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full"></div>
          
          {/* Dots Skeleton */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-8 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Products Title Skeleton */}
        <div className="h-8 w-32 bg-gray-200 rounded"></div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-[20%]">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="h-5 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 flex-1 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
              <div className="h-9 w-full bg-gray-200 rounded-md mt-4"></div>
            </div>
          </div>

          {/* Products Section Skeleton */}
          <div className="w-full lg:w-[80%]">
            {/* Filter Info Skeleton */}
            <div className="mb-4">
              <div className="h-5 w-64 bg-gray-200 rounded"></div>
            </div>

            {/* Loading Message Skeleton */}
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              <div className="h-4 w-72 bg-gray-200 rounded"></div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  {/* Image Skeleton */}
                  <div className="h-48 bg-gray-200"></div>
                  
                  {/* Content Skeleton */}
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-6 w-24 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-9 bg-gray-200 rounded-md"></div>
                      <div className="w-9 h-9 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreFrontSkeleton;