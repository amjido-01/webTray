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
    <div className="max-w-7xl mx-auto md:mt-[164px] pt16 pb8">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From inventory management to online sales, WebTray provides all the
            tools your business needs in one powerful platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="w-full">
          {/* Inventory Management */}

          <div className="grid mb-[24px] md:grid-cols-2 gap-6">
            <div className="">
              <Card className="border-none p0 h-[388px] md:w-[572px] md:h-[462px] shadow-none borde">
                <CardContent className="p-0 md:mb-[22px] mb-[40px]">
                  <Image
                    src="/inventory_manage.png"
                    alt="Inventory management"
                    className="object-cover w-full md:w-[523.75px] md:h-[296px]"
                    width={440}
                    height={195}
                  />
                </CardContent>
                <CardFooter className="p-0 flex-none">
                  <div>
                    <h4 className=" text-[20px] text-start font-medium leading-[100%] tracking-[0%] mb-[24px] text-gray-900">
                      Inventory Management
                    </h4>
                    <p className="text-[16px] text-start font-normal leading-6 text-[#4D4D4D] mb-[24px]">
                      Track stock levels, manage suppliers, and automate
                      reordering with our intelligent inventory system.
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className="">
              <Card className="h-[388px] md:w-[572px] md:h-[462px] shadow-none border-0">
                <CardContent className="relative md:mb-[31px] mb-[40px]">
                  <Image
                    src="/customer.png"
                    alt="Inventory management"
                    className="object-cover w-full md:w-[523.75px] md:h-[296px] border-blue-300"
                    width={440}
                    height={195}
                  />
                </CardContent>
                <CardFooter className=" flex-none">
                  <div>
                    <h4 className=" text-[20px] text-start font-medium leading-[100%] tracking-[0%] mb-[24px] text-gray-900">
                      Customer Management
                    </h4>
                    <p className="text-[16px] text-start font-normal leading-6 text-[#4D4D4D] mb-[24px]">
                      Build customer relationships with booking systems, order
                      history, and loyalty programs.
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="">
              <div className="pt-0 md:w-1/2">
                <Card className="border-0 p-0 rounded-none shadow-none
                ">
                  <CardHeader className="p-0  border-0">
                    <div className="">
                      <Image
                        src="/cups.jpg"
                        alt="Inventory management"
                        className="object-cover w-full h-auto rounded-t-2xl"
                        width={440}
                        height={100}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p4 px-3 sm:p6">
                    <div className="space-y-2">
                      <div className=" flex items-start justify-between gap-2">
                        <span className="text-[#4D4D4D] leading-[18.1px] font-bold">
                          Organic Green Tea
                        </span>
                        <span className="text-[#1A1A1A] leading-[100%] font-medium">
                          {"N29.99"}
                        </span>
                      </div>

                      <Badge className="w-fit bg-[#DADADA] text-[#4D4D4D] text-xs">
                        Beverages
                      </Badge>

                      <p className="text-sm text-[#4D4D4D] leading-relaxed">
                        Premium organic green leaves
                      </p>

                      <div className="flex items-center  gap-3 pt-2">
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
                
              </div>
              <div className="mt-[24px]">
                  <h4 className=" text-[20px] text-start font-medium leading-[100%] tracking-[0%] mb-[24px] text-gray-900">
                    Analytics & Reports
                  </h4>
                  <p className="text-[16px] text-start font-normal leading-6 text-[#4D4D4D] mb-[24px]">
                    Get insights into sales performance, customer behavior, and
                    business growth metrics.
                  </p>
                </div>
              {/* <Card className="w-[353px] h-[388px] md:w-[572px] md:h-[462px] shadow-none border-0">
                <CardContent className="relative md:mb-[22px] mb-[40px]">
                  <Image
                    src="/e-commerce.png"
                    alt="Inventory management"
                    className="object-cover w-full md:w-[230px] md:h-[273px] border-blue-300"
                    width={440}
                    height={195}
                  />
                </CardContent>
                <CardFooter className=" flex-none">
                  <div>
                    <h4 className=" text-[20px] text-start font-medium leading-[100%] tracking-[0%] mb-[24px] text-gray-900">
                      E-commerce Platform
                    </h4>
                    <p className="text-[16px] text-start font-normal leading-6 text-[#4D4D4D] mb-[24px]">
                      Create a beautiful online store with custom domains,
                      shopping cart, and secure checkout.
                    </p>
                  </div>
                </CardFooter>
              </Card> */}
            </div>

            <div>
              <Card className="h-[388px] md:w-[572px] md:h-[462px] shadow-none border-0">
                <CardContent className="relative md:mb-[31px] mb-[40px]">
                  <Image
                    src="/analytics.png"
                    alt="Inventory management"
                    className="object-cover w-full md:w-[523.75px] md:h-[296px]"
                    width={440}
                    height={195}
                  />
                </CardContent>
                <CardFooter className=" flex-none">
                  <div>
                    <h4 className=" text-[20px] text-start font-medium leading-[100%] tracking-[0%] mb-[24px] text-gray-900">
                      Analytics & Reports
                    </h4>
                    <p className="text-[16px] text-start font-normal leading-6 text-[#4D4D4D] mb-[24px]">
                      Get insights into sales performance, customer behavior,
                      and business growth metrics.
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
