import React from "react";
import { BarChart3, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-white rounded-lg shadow-sm border border-gray-100">
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-lg">
        {/* Icon composition */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-100 blur-2xl rounded-full opacity-60 scale-150" />
          
          <div className="relative flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            <BarChart3 className="w-10 h-10 text-[#111827]" />
            
            {/* Floating mini icons */}
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#111827] rounded-full flex items-center justify-center shadow-lg border-2 border-white transform rotate-12">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-3 w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center shadow-md border border-gray-200 transform -rotate-12">
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#111827] mb-3 tracking-tight">
          Analytics & Insights
        </h1>
        <div className="inline-block bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-full text-xs mb-4 tracking-wide uppercase">
          Coming Soon
        </div>
        
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 px-4">
          We're building powerful tools to help you track your store's performance, understand your customers, and make data-driven decisions to grow your business.
        </p>

        <Link href="/dashboard">
          <Button className="rounded-full bg-[#111827] hover:bg-slate-800 text-white px-8 h-11 shadow-sm transition-all">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}