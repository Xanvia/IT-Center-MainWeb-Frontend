import React from "react";
import Link from "next/link";
import Image from "next/image";
import RegisterForm from "../components/forms/registerForm";

const SignUp: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center">
      <div className="hidden w-full xl:block xl:w-1/2">
        <div className="px-28 py-16 text-center">
          <Link className="mb-5 inline-block" href="/">
            <Image
              src={"/logo/ceitlogo.png"}
              alt="Logo"
              width={176}
              height={32}
            />
          </Link>
          <p className="2xl:px-20">
            Create an IT Center Account First. If you are a University Student/
            Staff member, sign up with your University Email.{" "}
          </p>

          <span className="mt-16 inline-block"></span>
        </div>
      </div>

      <div className="w-full border-primary-border my-10 dark:border-primary-border-dark xl:w-1/2 xl:border-l-1">
        <div className="w-full p-3 py-5 sm:px-12 xl:px-16 ">
          <span className="mb-1.5 block font-medium text-yellow-500">
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
