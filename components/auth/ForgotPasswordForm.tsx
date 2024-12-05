"use client";
import IconMail from "@/components/icon/icon-mail";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submitForm = (e: any) => {
    e.preventDefault();
    // Validation
    if (!email) {
      setError("Email is required.");
      return;
    }

    // Optional: Add a more robust email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // Clear any previous errors
    router.push("otp-verification");

    router.push("otp-verification");
  };
  return (
    <form className="space-y-5" onSubmit={submitForm}>
      <div>
        <label htmlFor="Email" className="dark:text-white">
          Email
        </label>
        <div className="relative text-white-dark">
          <input
            id="Email"
            type="email"
            placeholder="Enter Email"
            className="form-input ps-10 placeholder:text-white-dark"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconMail fill={true} />
          </span>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
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

export default ForgotPasswordForm;
