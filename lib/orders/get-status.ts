export const getOrderStatus = (
  status: "pending" | "shipped" | "cancel" | "completed"
): "Pending" | "Shipped" | "Cancelled" | "Completed" => {
  switch (status) {
    case "pending":
      return "Pending";
    case "shipped":
      return "Shipped";
    case "cancel":
      return "Cancelled";
    case "completed":
      return "Completed";
    default:
      return "Pending";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-[#FDE8E8] text-[#1A1A1A]";
    case "Shipped":
      return "bg-[#F8F8F8] text-[#1A1A1A]";
    case "Completed":
      return "bg-[#97AAF5] text-[#FFFFFF]";
    case "Cancelled":
      return "bg-[#EF4444] text-[#FFFFFF]";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
