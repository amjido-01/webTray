// hooks/useResendTimer.ts
import { useState, useEffect } from "react"

interface UseResendTimerProps {
  initialSeconds?: number
  storageKey?: string
}

export const useResendTimer = ({ 
  initialSeconds = 300, 
  storageKey = "otpExpiresAt" 
}: UseResendTimerProps = {}) => {
  const [countdown, setCountdown] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)

  // Initialize countdown from localStorage
  const initializeTimer = () => {
    const expiresAt = localStorage.getItem(storageKey)
    
    if (expiresAt) {
      const expiresAtTime = Number.parseInt(expiresAt, 10)
      const now = Date.now()

      if (expiresAtTime > now) {
        const remainingSeconds = Math.ceil((expiresAtTime - now) / 1000)
        setCountdown(remainingSeconds)
        setIsDisabled(true)
        return true // Timer was restored
      } else {
        localStorage.removeItem(storageKey)
      }
    }
    return false // No active timer
  }

  // Start a new countdown
  const startTimer = (seconds = initialSeconds) => {
    setCountdown(seconds)
    setIsDisabled(true)

    const expiresAt = Date.now() + seconds * 1000
    localStorage.setItem(storageKey, expiresAt.toString())
  }

  // Reset timer
  const resetTimer = () => {
    setCountdown(0)
    setIsDisabled(false)
    localStorage.removeItem(storageKey)
  }

  // Countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          const newValue = prev - 1
          if (newValue <= 0) {
            setIsDisabled(false)
            localStorage.removeItem(storageKey)
            return 0
          }
          return newValue
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isDisabled, countdown, storageKey])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return {
    countdown,
    isDisabled,
    formattedTime: formatTime(countdown),
    startTimer,
    resetTimer,
    initializeTimer,
  }
}