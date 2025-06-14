import { useEffect, useState } from "react"

export const useOtpCountdown = (initialSeconds: number = 60) => {
  const [countdown, setCountdown] = useState(0)
  const [resendDisabled, setResendDisabled] = useState(false)

  const startCountdown = (seconds: number = initialSeconds) => {
    setCountdown(seconds)
    setResendDisabled(true)
    const expiresAt = Date.now() + seconds * 1000
    localStorage.setItem("otpExpiresAt", expiresAt.toString())
  }

  useEffect(() => {
    const otpExpiresAt = localStorage.getItem("otpExpiresAt")
    if (otpExpiresAt) {
      const expiresAtTime = Number.parseInt(otpExpiresAt, 10)
      const now = Date.now()
      if (expiresAtTime > now) {
        const remaining = Math.ceil((expiresAtTime - now) / 1000)
        setCountdown(remaining)
        setResendDisabled(true)
      } else {
        setCountdown(0)
        setResendDisabled(false)
        localStorage.removeItem("otpExpiresAt")
      }
    }
  }, [])

  useEffect(() => {
    if (!resendDisabled || countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setResendDisabled(false)
          localStorage.removeItem("otpExpiresAt")
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown, resendDisabled])

  return {
    countdown,
    resendDisabled,
    startCountdown,
    setCountdown,
    setResendDisabled,
  }
}
