import { OrderManagement } from "@/components/order-managemet";
// import OrderProductsTable from "@/components/order-products-table";
import OrderStatCard from "@/components/order/order-stat-card";
// import { DataTable } from "@/components/order/orders-table";
import OrdersTable from "@/components/order/orders-table";
export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <OrderManagement />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
           <OrderStatCard />
           <OrdersTable />
           {/* <DataTable columns={columns} data={}/> */}
          {/* <OrderProductsTable /> */}
        </div>
      </div>
    </div>
  );
}
