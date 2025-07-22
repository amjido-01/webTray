"use client";

// import { useUser } from "@/hooks/use-user"
import { useAuthStore } from "@/store/useAuthStore";
import StoreFrontHeader from "@/components/storefront/store-front-header";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Page() {
  const { user } = useAuthStore();
  const userStores = user?.business?.store
 
  return (
    <div>
      <StoreFrontHeader />
      <div className="mt-[20px]">
        {userStores && <Card className=" shadow-none rounded-none">
        <CardHeader className="text-center leading-[24px]">
          <CardTitle className="text-[#4D4D4D] font-bold text-[20px]">No Storefronts Yet</CardTitle>
          <CardDescription>You don’t have an active stores yet.
            <button className="text-[#365BEB] ml-1 cursor-pointer font-normal tedxt-[16px]">Create new store</button>
          </CardDescription>
        </CardHeader>
      </Card>}
      </div>
    </div>
  );
}
