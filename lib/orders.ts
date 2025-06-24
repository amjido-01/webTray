import { Order } from "./tyes";

export const orders: Order[] = [
  {
    id: "01",
    customer: "Faruq Hassan",
    email: "faruq.hassan@example.com",
    status: "Processing",
    price: 610000,
    date: "June 22, 2024 | 3:30 PM",
    items: ["Laptop", "Mouse", "Headphones"],
  },
  {
    id: "02",
    customer: "Victory Austin",
    email: "victory.austin@example.com",
    status: "Completed",
    price: 10000,
    date: "June 20, 2024 | 10:15 AM",
    items: ["Notebook", "Pen", "Eraser"],
  },
  {
    id: "03",
    customer: "Mariam Babalola",
    email: "mariam.babalola@example.com",
    status: "Pending",
    price: 34000,
    date: "June 18, 2024 | 1:45 PM",
    items: ["Keyboard", "USB-C Cable"],
  },
];

