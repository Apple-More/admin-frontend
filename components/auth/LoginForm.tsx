"use client";
import Login from "@/app/(auth)/auth/login/page";
import IconLockDots from "@/components/icon/icon-lock-dots";
import IconMail from "@/components/icon/icon-mail";
import { loginService } from "@/services/LoginServices";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "context/AuthContext";

const LoginForm = () => {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      toast.error("Invalid email or password");
    }
    router.push("/");
  };

  return (
    <form className="space-y-5 dark:text-white" onSubmit={handleLogin}>
      <div>
        <label htmlFor="Email">Email</label>
        <div className="relative text-white-dark">
          <input
            id="Email"
            type="email"
            placeholder="Enter Email"
            className="form-input ps-10 placeholder:text-white-dark"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconMail fill={true} />
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <div className="relative text-white-dark">
          <input
            id="Password"
            type="password"
            placeholder="Enter Password"
            className="form-input ps-10 placeholder:text-white-dark"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
