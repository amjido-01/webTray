// components/ui/OTPInput.tsx
import React from "react"

interface OTPInputProps {
  code: string[]
  onChange: (code: string[]) => void
  hasError?: boolean
}

export const OTPInput: React.FC<OTPInputProps> = ({ code, onChange, hasError = false }) => {
  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      onChange(newCode)

      if (value && index < code.length - 1) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      onChange(digits)

      // Focus the last input after paste
      const lastInput = document.getElementById(`code-5`)
      lastInput?.focus()
    }
  }

  return (
    <div className="flex justify-center gap-3">
      {code.map((digit, index) => (
        <div key={index} className="relative">
          <input
            id={`code-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={`w-[56px] h-[56px] rounded-[4px] text-center text-lg font-medium 
              border-[1px] ${hasError ? "border-red-500" : "border-[#C8C8C8]"} 
              focus:border-[#365BEB] focus:outline-none focus:ring-0 bg-[#FAFAFA]`}
            placeholder="*"
          />
        </div>
      ))}
    </div>
  )
}