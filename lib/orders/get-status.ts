export const getOrderStatus = (status: string): string => {
  if (!status) return "Pending";
  
  switch (status.toLowerCase()) {
    case "pending":
      return "Pending";
    case "shipped":
      return "Shipped";
    case "cancel":
    case "cancelled":
      return "Cancelled";
    case "completed":
      return "Completed";
    case "paid":
      return "Paid";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export const getStatusColor = (status: string) => {
  const normalizedStatus = status.toLowerCase();
  switch (normalizedStatus) {
    case "pending":
      return "bg-[#FBD594] text-[#1A1A1A]";
    case "shipped":
      return "bg-[#F8F8F8] text-[#1A1A1A]";
    case "completed":
      return "bg-[#97AAF5] text-[#FFFFFF]"; // Blue for completed
    case "paid":
      return "bg-[#40EFB5] text-[#1A1A1A]"; // Provided green with black text for paid
    case "cancelled":
    case "cancel":
      return "bg-[#EF4444] text-[#FFFFFF]";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getTypeColor = (isOnline: boolean) => {
  return isOnline 
    ? "bg-[#E8EFFF] text-[#365BEB]" // Light blue for Online
    : "bg-[#F3F4F6] text-[#6B7280]"; // Light gray for Offline
};
