import RegisterForm from "@/components/auth/RegisterForm";
import IconFacebookCircle from "@/components/icon/icon-facebook-circle";
import IconGoogle from "@/components/icon/icon-google";
import IconInstagram from "@/components/icon/icon-instagram";
import IconTwitter from "@/components/icon/icon-twitter";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div>
      <div className="absolute inset-0">
        <img
          src="/assets/images/auth/bg-gradient.png"
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
        <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
          <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px]">
            <div className="absolute end-6 top-6"></div>
            <div className="mx-auto w-full max-w-[440px]">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
                  Sign Up
                </h1>
                <p className="text-base font-bold leading-normal text-white-dark">
                  Enter your email and password to register
                </p>
              </div>
              <RegisterForm />

              <div className="text-center dark:text-white">
                Already have an account ?&nbsp;
                <Link
                  href="/auth/boxed-signin"
                  className="uppercase text-primary underline transition hover:text-black dark:hover:text-white"
                >
                  SIGN IN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
