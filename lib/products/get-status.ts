export const getStockStatus = (
  quantity: number
): "Great" | "Medium Stock" | "Low Stock" | "Critical" => {
  if (quantity >= 50) return "Great";
  if (quantity >= 20) return "Medium Stock";
  if (quantity >= 5) return "Low Stock";
  return "Critical";
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Great":
      return "bg-[#CDFBEC] text-[#1A1A1A]";
    case "Medium Stock":
      return "bg-[#F8F8F8] text-[#1A1A1A]";
    case "Low Stock":
      return "bg-[#FDE8E8] text-[#1A1A1A]";
    case "Critical":
      return "bg-[#EF4444] text-white";
    default:
      return "bg-gray-100 text-gray-800";
  }
};