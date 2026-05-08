"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-currency";

export interface InvoiceData {
  orderId?: string | number;
  customerName: string;
  customerPhone: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  paymentMethod: string;
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewOrder: () => void;
  invoice: InvoiceData | null;
}

export function InvoiceModal({ isOpen, onClose, onNewOrder, invoice }: InvoiceModalProps) {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-[24px]">
        {/* Screen UI */}
        <div className="p-6 md:p-8 flex flex-col gap-6 print:hidden">
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#111827]">Order Saved!</h2>
            <p className="text-sm text-[#808080]">Order has been created successfully.</p>
          </div>

          <div className="bg-[#F8F8F8] rounded-xl p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#808080]">Order ID</span>
              <span className="font-semibold text-[#1A1A1A]">#{invoice.orderId || "Pending"}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#808080]">Customer</span>
              <span className="font-semibold text-[#1A1A1A]">{invoice.customerName}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#808080]">Total</span>
              <span className="font-semibold text-[#1A1A1A]">{formatCurrency(invoice.total)}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <Button 
              onClick={handlePrint} 
              variant="outline"
              className="flex-1 rounded-full border-gray-200 text-[#4D4D4D]"
            >
              Print Invoice
            </Button>
            <Button 
              onClick={onNewOrder} 
              className="flex-1 rounded-full bg-[#365BEB] hover:bg-[#365BEB]/90 text-white"
            >
              New Order
            </Button>
          </div>
        </div>

        {/* Printable UI */}
        <div id="printable-invoice" className="hidden print:block p-8 bg-white text-black w-full font-sans">
          <div className="text-center mb-8 border-b pb-6">
            <h1 className="text-3xl font-bold mb-2">WebTray</h1>
            <p className="text-gray-500">Official Receipt / Invoice</p>
          </div>

          <div className="flex justify-between mb-8">
            <div>
              <p className="text-sm text-gray-500">Billed To:</p>
              <p className="font-bold text-lg">{invoice.customerName}</p>
              <p className="text-gray-600">{invoice.customerPhone}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Invoice Details:</p>
              <p><span className="font-semibold">Order ID:</span> #{invoice.orderId || "Pending"}</p>
              <p><span className="font-semibold">Date:</span> {invoice.date}</p>
              <p><span className="font-semibold">Payment:</span> <span className="capitalize">{invoice.paymentMethod}</span></p>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-gray-800">
                <th className="text-left py-3 font-semibold">Item</th>
                <th className="text-center py-3 font-semibold">Qty</th>
                <th className="text-right py-3 font-semibold">Price</th>
                <th className="text-right py-3 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-3 text-left">{item.name}</td>
                  <td className="py-3 text-center">{item.quantity}</td>
                  <td className="py-3 text-right">{formatCurrency(item.price)}</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-1/2">
              <div className="flex justify-between py-2 border-b">
                <span className="font-semibold">Subtotal</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
              <div className="flex justify-between py-3 text-xl font-bold">
                <span>Total</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p>Generated securely by WebTray</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
