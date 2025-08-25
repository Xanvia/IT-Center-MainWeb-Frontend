"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ForgotPasswordForm from "../components/forms/forgotPasswordForm";
import { useRouter } from "next/navigation";

const ForgotPassword: React.FC = () => {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push("/auth/signin");
  };

  return (
    <div className="flex flex-wrap items-center">
      <div className="hidden w-full xl:block xl:w-1/2">
        <div className="px-28 py-16 text-center flex flex-col items-center">
          <Link className="mb-5 inline-block" href="/">
            <Image
              src={"/logo/ceitlogo.png"}
              alt="Logo"
              width={176}
              height={32}
              className="bg-yellow-500 rounded-medium"
            />
          </Link>

          <p className="w-96 font-semibold text-maroon font-xl">
            IT Center <br />{" "}
            <span className="font-normal font-vietnam">
              University of Peradeniya
            </span>
          </p>
        </div>
      </div>

      <div className="w-full border-primary-border dark:border-primary-border-dark xl:w-1/2 xl:border-l-1">
        <div className="w-full p-4 sm:p-12 xl:p-16">
          <span className="mb-1.5 block font-medium text-yellow-600">
            Password Recovery
          </span>
          <h2 className="mb-8 text-2xl font-bold text-maroon">
            Reset Your Password
          </h2>

          <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
