"use client";
import IconMail from "@/components/icon/icon-mail";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    passwordMismatch: false,
    invalidPassword: false,
  });
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const submitForm = (e: any) => {
    e.preventDefault();
    const isPasswordValid = passwordRegex.test(newPassword);
    setErrors((prevErrors) => ({
      ...prevErrors,
      passwordMismatch: newPassword !== confirmPassword,
      invalidPassword: !isPasswordValid,
    }));

    if (isPasswordValid && newPassword === confirmPassword) {
      router.push("/");
    }
  };
  return (
    <form className="space-y-5" onSubmit={submitForm}>
      <div>
        <label htmlFor="Email" className="dark:text-white">
          New Password
        </label>
        <div className="relative text-white-dark">
          <input
            id="newPassword"
            type="text"
            placeholder="Enter New Password"
            className="form-input  placeholder:text-white-dark"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <label htmlFor="Email" className="mt-6 dark:text-white">
          Confirm New Password
        </label>
        <div className="relative text-white-dark">
          <input
            id="confirmPassword"
            type="text"
            placeholder="Confirm New Password"
            className="form-input  placeholder:text-white-dark"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errors.invalidPassword && (
          <p className="mt-2 text-red-500">
            Password must be at include least 8 characters long, include one
            uppercase letter, one number, and one special character.
          </p>
        )}
        {errors.passwordMismatch && (
          <p className="mt-2 text-red-500">
            Password and Confirm Password do not match.
          </p>
        )}
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

export default ResetPasswordForm;
