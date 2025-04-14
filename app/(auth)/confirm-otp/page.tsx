"use client";

import { UserService } from "@/service/user/user.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function VerificationPage() {
  const [code, setCode] = useState<string>(["", "", "", ""]);
  // Simulated OTP
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [error, setError] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { confirmOTP, forgotEmail } = UserService;
  const userMail = localStorage.getItem("userEmail");
  const typeCode = code.join("").toString();

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(0, 1);

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false);

    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const res = await confirmOTP({ email: userMail, otp: typeCode });
      if (res?.status === 200) {
        router.push("/update-password");
      }
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 400) {
        setError(message || "Something went wrong.");
      } else {
        setError("An unexpected error occurred.");
      }

      console.error("Sending OTP failed:", error);
    }
  };

  const handleResend = async () => {
    if (timeLeft <= 0 || error) {
      setCode(["", "", "", ""]);

      setTimeLeft(60);

      inputRefs.current[0]?.focus();
      try {
        const res = await forgotEmail({ email: userMail });

        console.log("otpe-send", res);
      } catch (error) {
        if (error.response.status === 400) {
          setError(error.response.data.message);
        }
        console.error("Registration failed:", error);
        // Optionally show error to user
      }
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen mx-auto max-w-[588px] px-4">
      <div className="w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="lg:text-2xl text-xl font-medium text-[#1D1F2C]">
            Confirm OTP
          </h1>
          <p className="lg:text-base text-sm text-[#4A4C56] mt-1 tracking-wider">
            Confirm OTP to log in
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 border border-borderColor">
          <div className="flex justify-center gap-4 mb-5">
            {code.map((value, index) => (
              <input
                key={index}
                ref={(el: any) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                disabled={timeLeft == 0}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`lg:w-12 w-10 h-10 lg:h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-1 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-primaryColor"
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-3">
              OTP doesn’t match. Please try again.
            </p>
          )}

          <div className="text-center text-base mb-5">
            <span className="text-[#777980] text-base">
              Didn't get the OTP?{" "}
            </span>
            {error || timeLeft <= 0 ? (
              <button
                onClick={handleResend}
                className="text-primaryColor underline font-medium cursor-pointer"
              >
                Resend
              </button>
            ) : (
              <button
                onClick={handleResend}
                className={`text-primaryColor text-base underline font-medium ${
                  timeLeft > 0
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                disabled={timeLeft > 0}
              >
                Resend
              </button>
            )}
            <p className="text-[#777980] text-base mt-1">
              {timeLeft > 0 ? `You can resend code in ${timeLeft}s` : ""}
            </p>
          </div>
          {error && (
            <div className="text-base text-primaryColor py-2 text-center">
              {error}
              <Link href="/login " className="underline pl-2 text-black">
                Go to Login
              </Link>
            </div>
          )}
          <button
            onClick={handleVerify}
            disabled={timeLeft == 0}
            className="w-full block  disabled:opacity-50  disabled:cursor-not-allowed cursor-pointer bg-primaryColor text-white lg:py-4 py-2 px-4 text-sm lg:text-base rounded-md  transition-colors"
          >
            Verify
          </button>
        </div>
      </div>
    </section>
  );
}
