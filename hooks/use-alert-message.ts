import { useState } from "react"

type AlertType = "success" | "error" | "warning" | "info" | null

export const useAlertMessage = (defaultType: AlertType = "info") => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<AlertType>(defaultType)
  const [alertMessage, setAlertMessage] = useState("")

  const showAlertMessage = (type: AlertType, message: string) => {
    setAlertType(type)
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 5000)
  }

  return {
    showAlert,
    alertType,
    alertMessage,
    showAlertMessage,
    setShowAlert,
  }
}
