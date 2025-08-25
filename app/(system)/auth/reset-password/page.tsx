"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ResetPasswordForm from "../components/forms/resetPasswordForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ResetPasswordContent: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
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
            <div className="text-center">
              <div className="mb-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <svg
                    className="h-8 w-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                  Invalid Reset Link
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This password reset link is invalid or has expired. Please request a new password reset.
                </p>
              </div>

              <Link
                href="/auth/forgot-password"
                className="inline-block w-full cursor-pointer rounded-lg bg-yellow-500 p-3 text-gray-700 transition hover:bg-opacity-80"
              >
                Request New Reset Link
              </Link>

              <div className="mt-4">
                <Link href="/auth/signin" className="text-yellow-600 hover:text-yellow-700">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Create New Password
          </h2>

          <ResetPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
};

const ResetPassword: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
