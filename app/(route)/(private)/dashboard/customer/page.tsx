import { SectionCards } from "@/components/customer-start-card";
import CustomerTable from "@/components/customer/Customers-table";

export default function DashboardPage() {

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
     
      <div className="">
        <div className="flex flex-col gap-10">
          <div>
            <CustomerTable />
          </div>
         
        </div>
      </div>
    </div>
  );
}
