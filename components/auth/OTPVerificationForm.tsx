"use client";
import IconMail from "@/components/icon/icon-mail";
import { otpVerification } from "@/services/PasswordChangeServices";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const OTPVerificationForm = () => {
  const router = useRouter();
  const [OTP, setOTP] = useState("");

  const handleOTPVerification = async (e: any) => {
    e.preventDefault();
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await otpVerification(Number(OTP), userEmail);
      if (response.status === 1) {
        toast.success("OTP Verified Successfully");
        router.push("reset-password");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="space-y-5" onSubmit={handleOTPVerification}>
      <div>
        <div className="relative text-white-dark">
          <input
            id="Email"
            type="text"
            placeholder="Enter OTP Number Here"
            className="form-input  placeholder:text-white-dark"
            required
            value={OTP}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setOTP(e.target.value); // Allows only numeric input
              }
            }}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
      >
        Submit
      </button>
    </form>
  );
};

export default OTPVerificationForm;
