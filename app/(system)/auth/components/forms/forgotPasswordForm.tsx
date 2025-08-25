"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithIcon } from "../feilds/InputwithIcon";
import { EmailIcon } from "@/CONSTANT_DATA/icons";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "../schema/forgotPasswordSchema";
import Axios from "@/config/axios";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const submitData = async (data: ForgotPasswordSchemaType) => {
    try {
      await Axios.post("/auth/forgot-password", {
        email: data.email,
      });
      
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      
      toast({
        title: "Email sent!",
        description: "Check your email for password reset instructions.",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Error requesting password reset:", error);
      
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
      
      setError("root.server", {
        message: "An error occurred. Please try again.",
      });
    }
  };

  const onSubmitForm: SubmitHandler<ForgotPasswordSchemaType> = (data) => {
    submitData(data);
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
            Email Sent!
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            If an account with <strong>{submittedEmail}</strong> exists, a password reset link has been sent.
          </p>
        </div>
        
        <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Check your email inbox and follow the instructions to reset your password. 
            The link will expire in 1 hour.
          </p>
        </div>

        <button
          onClick={onBackToLogin}
          className="w-full cursor-pointer rounded-lg bg-yellow-500 p-3 text-gray-700 transition hover:bg-opacity-80"
        >
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
          Forgot Password?
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Email
        </label>
        <div className="relative">
          <InputWithIcon
            type="email"
            register={register("email")}
            errors={errors.email}
            placeholder="Enter your email"
            Icon={<EmailIcon />}
          />
        </div>
      </div>

      {errors.root?.server && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
          {errors.root.server.message}
        </div>
      )}

      <div className="mb-5">
        <input
          disabled={isSubmitting}
          type="submit"
          value={isSubmitting ? "Sending..." : "Send Reset Link"}
          className="w-full cursor-pointer rounded-lg bg-yellow-500 p-3 text-gray-700 transition hover:bg-opacity-80 disabled:bg-slate-500"
        />
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-yellow-600 hover:text-yellow-700"
        >
          Back to Sign In
        </button>
      </div>
    </form>
  );
}
