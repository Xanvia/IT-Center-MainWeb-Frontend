import React from "react";
import Link from "next/link";
import Image from "next/image";
import RegisterForm from "../components/forms/registerForm";

const SignUp: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center p-5">
      <div className="hidden w-full xl:block xl:w-1/2">
        <div className="px-28 py-16 text-center">
          <Link className="mb-5 inline-block" href="/">
            <Image
              src={"/logo/ceitlogo.png"}
              alt="Logo"
              width={176}
              height={32}
              className="bg-yellow-500 rounded-medium"
            />
          </Link>
          <p className="2xl:px-20 text-maroon font-xl">
            Welcome to IT Center! We are excited to have you on board. Sign up!
          </p>
          <p className="text-gray-500 md:mt-10 italic">
            Please ensure to register using Google Authentication with your
            official university email address if you are a staff member of the
            University of Peradeniya.
          </p>
          {/* width is depend on paragraph size */}
          <span className="mt-16 inline-block"></span>
        </div>
      </div>

      <div className="w-full border-primary-border dark:border-primary-border-dark xl:w-1/2 xl:border-l-1">
        <div className="w-full p-4 sm:p-12 xl:p-12 ">
          <span className="mb-1.5 block font-medium text-yellow-600">
            Start your IT journey!
          </span>
          <h2 className="mb-5 text-2xl font-bold text-maroon">
            Sign Up to IT CENTER
          </h2>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
