import React from "react"
import { X, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export type AlertType = "success" | "error" | "warning" | "info"

interface CustomAlertProps {
  type: AlertType
  message: string
  onClose: () => void
}

export const CustomAlert: React.FC<CustomAlertProps> = ({ type, message, onClose }) => {
  const getAlertStyling = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-[#E8F5E8]",
          iconBgColor: "bg-[#C8F5C8]",
          iconColor: "text-[#22C55E]",
          icon: <CheckCircle className="h-4 w-4" />,
          hoverBg: "hover:bg-green-100",
          hoverText: "hover:text-green-800",
        }
      case "error":
        return {
          bgColor: "bg-[#FDE8E8]",
          iconBgColor: "bg-[#FAC8C8]",
          iconColor: "text-[#EF4444]",
          icon: <AlertTriangle className="h-4 w-4" />,
          hoverBg: "hover:bg-red-100",
          hoverText: "hover:text-red-800",
        }
      case "warning":
        return {
          bgColor: "bg-[#FEF3C7]",
          iconBgColor: "bg-[#FDE68A]",
          iconColor: "text-[#D97706]",
          icon: <AlertTriangle className="h-4 w-4" />,
          hoverBg: "hover:bg-yellow-100",
          hoverText: "hover:text-yellow-800",
        }
      case "info":
      default:
        return {
          bgColor: "bg-[#E0F2FE]",
          iconBgColor: "bg-[#BAE6FD]",
          iconColor: "text-[#0284C7]",
          icon: <AlertTriangle className="h-4 w-4" />,
          hoverBg: "hover:bg-blue-100",
          hoverText: "hover:text-blue-800",
        }
    }
  }

  const styling = getAlertStyling()

  return (
    <Alert className={`${styling.bgColor} p-6 relative transition-all duration-300 ease-in-out`}>
      <div className={`${styling.iconBgColor} p-1 rounded-full absolute top-1/3 left-2`}>
        <span className={styling.iconColor}>{styling.icon}</span>
      </div>
      <AlertDescription className="pl-4 text-[#1A1A1A] text-[14px]">{message}</AlertDescription>
      <Button
        variant="ghost"
        size="sm"
        className={`absolute right-2 top-1/16 h-6 w-6 p-0 text-[#141B34] bg-[#FAFAFA] rounded-full ${styling.hoverText} ${styling.hoverBg}`}
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  )
}