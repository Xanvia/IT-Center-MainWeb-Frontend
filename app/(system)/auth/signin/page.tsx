import React from "react";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "../components/forms/loginForm";

const SignIn: React.FC = () => {
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
            Welcome Back!
          </span>
          <h2 className="mb-8 text-2xl font-bold text-maroon">
            Sign In to IT Center
          </h2>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
