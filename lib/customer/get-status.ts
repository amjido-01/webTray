export const getCustomerStatus = (
  status: "active" | "inactive"
): "Active" | "Inactive" => {
  switch (status) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    default:
      return "Inactive";
  }
};

type CustomerStatusLabel = "Active" | "Inactive";
type StatusColorClass = string; // or define a stricter type if needed

export const getCustomerStatusColor = (
  status: CustomerStatusLabel
): StatusColorClass => {
  switch (status) {
    case "Active":
      return "bg-[#CDFBEC] text-[#1A1A1A]";
    case "Inactive":
      return "bg-[#FDE8E8] text-[#1A1A1A]";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
