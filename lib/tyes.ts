export interface Order {
  id: string;
  customer: string;
  status: "Processing" | "Completed" | "Pending"; // add other status values if needed
  price: number;
  date: string;
  items: string[];
  email: string;
}
