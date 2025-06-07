export interface Order {
  id: string
  customer: string
  status: "Processing" | "Completed" | "Pending"
  price: number
}