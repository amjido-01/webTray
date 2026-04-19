"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CircleAlert, CheckCircle2 } from "lucide-react";

export function SubscriptionClient() {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleCancelPlan = () => {
    setIsCancelModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 max-w-5xl w-full">
      <h1 className="text-md text-gray-500 font-medium tracking-wide">Subscription</h1>

      {/* Plan Banner */}
      <div className="bg-[#3b5bdb] rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row justify-between md:items-center gap-6 shadow-sm">
        <div className="flex flex-col space-y-1">
          <span className="text-blue-100 text-xs font-semibold tracking-wider">GROWTH PLAN</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-white text-[42px] leading-none font-bold">₦5,000</span>
            <span className="text-blue-100 text-sm">/month</span>
          </div>
        </div>
        <button className="bg-[#111827] text-gray-200 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
          Adjust Plan
        </button>
      </div>

      {/* Payment Section */}
      <div className="flex flex-col gap-4 mt-2">
        <h2 className="text-[17px] font-semibold text-gray-800">Payment</h2>
        <div className="flex items-center gap-2 text-gray-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 scale-[1.1] ml-1 mr-1">
            <circle cx="7" cy="12" r="5" />
            <circle cx="17" cy="12" r="5" />
          </svg>
          <span className="font-medium text-[15px] text-gray-700">Mastercard • • • • 1555</span>
        </div>
      </div>

      <hr className="border-gray-200/60" />

      {/* Invoices Section */}
      <div className="flex flex-col gap-5 mt-2">
        <h2 className="text-[17px] font-semibold text-gray-800">Invoices</h2>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left min-w-[600px] border-collapse">
            <thead>
              <tr className="text-gray-400 font-normal text-[15px] border-b-0">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-[15px]">
              <tr>
                <td className="py-3.5">Apr 3, 2026</td>
                <td className="py-3.5">NGN 5,000.00</td>
                <td className="py-3.5">Paid</td>
                <td className="py-3.5 text-right pr-4">
                  <button className="underline underline-offset-[3px] decoration-1 decoration-gray-400 font-medium text-gray-600 hover:text-black transition">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3.5">Apr 3, 2026</td>
                <td className="py-3.5">NGN 5,000.00</td>
                <td className="py-3.5">Paid</td>
                <td className="py-3.5 text-right pr-4">
                  <button className="underline underline-offset-[3px] decoration-1 decoration-gray-400 font-medium text-gray-600 hover:text-black transition">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-gray-200/60" />

      {/* Cancellation Section */}
      <div className="flex flex-row justify-between items-center bg-transparent mt-2">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[17px] font-semibold text-gray-800">Cancellation</h2>
          <p className="text-[15px] text-gray-500">Cancel plan</p>
        </div>
        <button 
          onClick={() => setIsCancelModalOpen(true)}
          className="bg-[#eb4b4b] text-white px-5 py-2.5 text-sm rounded-full font-medium hover:bg-[#d94444] transition-colors"
        >
          Cancel Plan
        </button>
      </div>

      {/* Cancel Confirmation Modal */}
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-8 md:p-10 border-0 shadow-xl rounded-2xl gap-0" showCloseButton={false}>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center mb-5 shrink-0">
              <CircleAlert className="h-[22px] w-[22px] text-red-500" strokeWidth={2} />
            </div>
            
            <DialogHeader className="w-full">
              <DialogTitle className="text-[19px] font-medium text-center text-gray-800 w-full mb-8">
                Are you sure you want to cancel your plan?
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-row gap-4 w-full justify-center px-2">
              <button 
                onClick={() => setIsCancelModalOpen(false)}
                className="w-full flex-1 max-w-[160px] py-[11px] rounded-full border border-gray-300 font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Keep your Plan
              </button>
              <button 
                onClick={handleCancelPlan}
                className="w-full flex-1 max-w-[160px] py-[11px] rounded-full bg-[#111827] text-white font-medium text-sm hover:bg-gray-800 transition-colors"
              >
                Cancel Plan
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-10 py-16 border-0 shadow-xl rounded-2xl gap-0" showCloseButton={false}>
           <div className="flex flex-col items-center justify-center w-full">
              <div className="h-14 w-14 rounded-full bg-[#dcfce7] flex items-center justify-center mb-6 shrink-0">
                <CheckCircle2 className="h-7 w-7 text-[#16a34a]" strokeWidth={2.5} />
              </div>
              
              <DialogHeader className="w-full items-center">
                <DialogTitle className="text-3xl font-[600] text-gray-800 text-center tracking-tight mb-3">
                  Plan Cancelled
                </DialogTitle>
                <DialogDescription className="text-base text-gray-600 font-medium text-center">
                  Your plan has successfully been cancelled
                </DialogDescription>
              </DialogHeader>
           </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
