import { useState } from "react"
import { AlertType } from "@/components/CustomAlert"

export const useAlertManager = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<AlertType>("info")
  const [alertMessage, setAlertMessage] = useState("")

  const showAlertMessage = (type: AlertType, message: string, duration = 5000) => {
    setAlertType(type)
    setAlertMessage(message)
    setShowAlert(true)

    if (duration > 0) {
      setTimeout(() => {
        setShowAlert(false)
      }, duration)
    }
  }

  const hideAlert = () => {
    setShowAlert(false)
  }

  return {
    showAlert,
    alertType,
    alertMessage,
    showAlertMessage,
    hideAlert,
  }
}