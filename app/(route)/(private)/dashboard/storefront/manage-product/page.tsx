import StoreFrontStatCard from "@/components/storefront/store-front-stat-card";
import ManageProductTable from "@/components/storefront/manage-product-table";
import { ManageStoreFrontHeader } from "@/components/storefront/manage-product-header";
// import OrdersTable from "@/components/order/orders-table";
export default function Page() {
  return (
      <div className="@container/main flex flex-1 flex-col gap-2">
        <ManageStoreFrontHeader />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
           <StoreFrontStatCard />
          <ManageProductTable />    
           {/* <OrdersTable /> */}
        </div>
      </div>
  );
}
