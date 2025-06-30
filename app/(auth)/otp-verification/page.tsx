"use client";

import type React from "react";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { CustomAlert } from "@/components/CustomAlert";
import { OTPInput } from "@/components/OTPInput";
import { useResendTimer } from "@/hooks/useResendTimer";
import { useAlertManager } from "@/hooks/useAlertManager";

function OTPContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const { verifyOtp, resendOtp } = useAuthStore();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    isDisabled: resendDisabled,
    formattedTime,
    startTimer,
    resetTimer,
    initializeTimer,
  } = useResendTimer();

  const { showAlert, alertType, alertMessage, showAlertMessage, hideAlert } =
    useAlertManager();

  useEffect(() => {
    if (isInitialized) return;

    const fromRegistration = localStorage.getItem("fromRegistration");
    const hasActiveTimer = initializeTimer();

    if (fromRegistration === "true") {
      if (!hasActiveTimer) startTimer();
      showAlertMessage("success", "OTP has been sent to your email");
      localStorage.removeItem("fromRegistration");
    }

    setIsInitialized(true);
  }, [isInitialized, initializeTimer, startTimer, showAlertMessage]);

  const handleVerify = async () => {
    if (!email) return;
    const otp = code.join("");
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      setShowError(true);
      return;
    }

    setLoading(true);
    setShowError(false);

    try {
      await verifyOtp({ email, otp });
      localStorage.removeItem("otpExpiresAt");
      localStorage.removeItem("fromRegistration");
      router.push("/welcome");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      setError(errorMessage);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email || resendDisabled || resendLoading) return;
    setResendLoading(true);

    try {
      await resendOtp(email);
      startTimer(300);
      showAlertMessage("success", "OTP has been resent to your email");
    } catch (error) {
      console.error("Error resending OTP:", error);
      resetTimer();
      showAlertMessage("error", "Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const isFormValid = code.every((digit) => digit !== "");

  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" width={140} height={40} alt="logo" />
      </div>

      <div className="flex-col flex items-center justify-start px-8">
        <div className="w-full max-w-md space-y-6">
          {error && showError && (
            <CustomAlert
              type="error"
              message={error}
              onClose={() => setShowError(false)}
            />
          )}

          {showAlert && (
            <CustomAlert
              type={alertType}
              message={alertMessage}
              onClose={hideAlert}
            />
          )}

          <div className="text-center space-y-3">
            <h1 className="text-[20px] font-semibold text-[#4D4D4D]">
              Just One More Step to Go
            </h1>
            <p className="text-gray-600 text-[14px]">
              Weve sent a code to your email. Enter it below to confirm your
              account.
            </p>
          </div>

          <OTPInput code={code} onChange={setCode} hasError={showError} />

          <div className="flex items-center justify-center">
            <Button
              className="px-10 bg-[#111827] hover:bg-slate-900 text-white rounded-full text-[16px]"
              size="lg"
              disabled={loading || !isFormValid}
              onClick={handleVerify}
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              {"Didn't receive code? "}
              {resendLoading ? (
                <span className="text-gray-400 font-medium">Sending...</span>
              ) : resendDisabled ? (
                <span className="text-gray-400">
                  Resend in{" "}
                  <span className="font-semibold">{formattedTime}</span>
                </span>
              ) : (
                <Button
                  variant="link"
                  onClick={handleResendOtp}
                  className="px-0 font-medium text-blue-600 hover:text-blue-800"
                >
                  Resend
                </Button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OTPVerification() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPContent />
    </Suspense>
  );
}
