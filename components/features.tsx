import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, ShoppingCart } from "lucide-react";
export function Features() {
  return (
    <div className="w-full bg-[#FBFBFB]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 mt-28 md:mt-40">
        <div className="text-center mb-[40px] md:mb-[48px] max-w-3xl mx-auto">
          <h2 className="text-[24px] text-[#1A1A1A] leading-[100%] md:text-[40px] font-bold mb-4 md:mb-[24px] text-balance">
            Everything You Need to Succeed
          </h2>
          <p className="text-[16px] font-normal leading-[24px] text-[#4D4D4D] text-pretty">
            From inventory management to online sales, WebTray provides all the
            tools your business needs in one powerful platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-6 md:space-y-8">
          {/* Top Row - Inventory & Customer Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
            {/* Inventory Management Card */}
            <Card className="overflow-hidden shadow-none border-0 p-0">
              <CardContent className="p-0  md:mb-[22px] mb-[40px]">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src="/inventory_manage.png"
                    alt="Inventory management"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start p-0">
                <h4 className="text-xl font-medium leading-tight mb-6 text-[#1A1A1A]">
                  Inventory Management
                </h4>
                <p className="text-base text-[#4D4D4D] font-normal leading-6 text-pretty">
                  Track stock levels, manage suppliers, and automate reordering
                  with our intelligent inventory system.
                </p>
              </CardFooter>
            </Card>

            {/* Customer Management Card */}
            <Card className="overflow-hidden border-0 shadow-none p-0">
              <CardContent className="p-0 md:mb-[22px] mb-[40px]">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src="/customer.png"
                    alt="Customer management"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start p-0">
                <h4 className="text-xl font-medium leading-tight mb-6 text-[#1A1A1A]">
                  Customer Management
                </h4>
                <p className="text-base text-[#4D4D4D] font-normal leading-6 text-pretty">
                  Build customer relationships with booking systems, order
                  history, and loyalty programs.
                </p>
              </CardFooter>
            </Card>
          </div>

          {/* Bottom Row - E-commerce & Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
            {/* E-commerce Platform Card */}
            <div className="w-full space-y-6">
              <Card className="w-full md:w-1/2 overflow-hidden shadow-none border-0 p-0">
                <CardHeader className="p-0">
                  <div className="relative w-full md:mb-[50px] mb-[40px] aspect-[16/9] min-h-0">
                    <Image
                      src="/cups.jpg"
                      alt="E-commerce product example"
                      className="object-cover w-full mdw-[523.75px]"
                      width={440}
                      height={195}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0 md:mb-[22px] mb-[40px]">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[#4D4D4D] font-bold leading-tight">
                        Organic Green Tea
                      </span>
                      <span className="text-[#1A1A1A] font-medium whitespace-nowrap">
                        N29.99
                      </span>
                    </div>

                    <Badge className="w-fit bg-[#DADADA] text-[#4D4D4D] text-xs hover:bg-[#DADADA]">
                      Beverages
                    </Badge>

                    <p className="text-sm text-[#4D4D4D] leading-relaxed">
                      Premium organic green leaves
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        size="lg"
                      >
                        Buy Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-11 w-11 shrink-0 bg-transparent"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="px-2">
                <h4 className="text-xl font-medium leading-tight mb-6 text-[#1A1A1A]">
                  E-commerce Platform
                </h4>
                <p className="text-base text-[#4D4D4D] font-normal leading-6 text-pretty">
                  Launch your online store with customizable product pages,
                  secure checkout, and seamless payment processing.
                </p>
              </div>
            </div>

            {/* Analytics & Reports Card */}
            <Card className="overflow-hidden border-0 shadow-none p-0">
              <CardContent className="p-0 md:mb-[22px] mb-[40px]">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src="/analytics.png"
                    alt="Analytics dashboard"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start p-0">
                <h4 className="text-xl font-medium leading-tight mb-6 text-[#1A1A1A]">
                  Analytics & Reports
                </h4>
                <p className="text-base text-[#4D4D4D] font-normal leading-6 text-pretty">
                  Get insights into sales performance, customer behavior, and
                  business growth metrics.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
