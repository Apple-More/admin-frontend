"use client";
import IconMail from "@/components/icon/icon-mail";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const OTPVerificationForm = () => {
  const router = useRouter();
  const [OTP, setOTP] = useState("");

  const submitForm = (e: any) => {
    e.preventDefault();
    router.push("reset-password");
  };
  return (
    <form className="space-y-5" onSubmit={submitForm}>
      <div>
        <div className="relative text-white-dark">
          <input
            id="Email"
            type="text"
            placeholder="Enter OTP Number Here"
            className="form-input  placeholder:text-white-dark"
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
