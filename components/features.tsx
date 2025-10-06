import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
export function Features() {
  return (
    <div className="max-w-7xl mx-auto md:mt-[70px] px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      {/* Header */}
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
      <div className="">
        {/* Inventory Management */}

        <div className="grid mb-[26px] md:grid-cols-2 gap-6">
          <div>
            <Card className="w-[353px] h-[388px] md:w-[572px] md:h-[462px] shadow-none border-0">
              <CardContent className="relative md:mb-[22px] mb-[40px]">
                <Image
                  src="/inventory_manage.png"
                  alt="Inventory management"
                  className="object-cover w-full md:w-[523.75px] md:h-[296px] border-blue-300"
                  width={440}
                  height={195}
                />
                
              </CardContent>
              <CardFooter className=" flex-none">
                <div>
                  <h4 className=" text-[20px] text-start font-medium leading-[100%] tracking-[0%] mb-[24px] text-gray-900">
                    Inventory Management
                  </h4>
                  <p className="text-[16px] text-start font-normal leading-6 text-[#4D4D4D] mb-[24px]">
                    Track stock levels, manage suppliers, and automate reordering with our intelligent inventory system.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div>
            <Card className="w-[353px] h-[388px] md:w-[572px] md:h-[462px] shadow-none border-0">
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
                    Build customer relationships with booking systems, order history, and loyalty programs.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Card className="w-[353px] h-[388px] md:w-[572px] md:h-[462px] shadow-none border-0">
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
                    Create a beautiful online store with custom domains, shopping cart, and secure checkout.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="w-[353px] h-[388px] md:w-[572px] md:h-[462px] shadow-none border-0">
              <CardContent className="relative md:mb-[31px] mb-[40px]">
                <Image
                  src="/analytics.png"
                  alt="Inventory management"
                  className="object-cover w-full md:w-[523.75px] md:h-[296px] border-blue-300"
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
                   Get insights into sales performance, customer behavior, and business growth metrics.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
