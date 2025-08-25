"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithIcon } from "../feilds/InputwithIcon";
import { LockIcon } from "@/CONSTANT_DATA/icons";
import { resetPasswordSchema, ResetPasswordSchemaType } from "../schema/forgotPasswordSchema";
import Axios from "@/config/axios";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
    },
  });

  const submitData = async (data: ResetPasswordSchemaType) => {
    try {
      const response = await Axios.post("/auth/reset-password", {
        token: data.token,
        newPassword: data.newPassword,
      });
      
      setIsSubmitted(true);
      
      toast({
        title: "Password reset successful!",
        description: "Your password has been updated. You can now sign in with your new password.",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Error resetting password:", error);
      
      if (error.response?.status === 400) {
        const errorMessage = "Invalid or expired reset token. Please request a new password reset.";
        
        toast({
          title: "Reset link expired",
          description: errorMessage,
          variant: "destructive",
        });
        
        setError("root.server", {
          message: errorMessage,
        });
      } else {
        const errorMessage = "An error occurred. Please try again.";
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        
        setError("root.server", {
          message: errorMessage,
        });
      }
    }
  };

  const onSubmitForm: SubmitHandler<ResetPasswordSchemaType> = (data) => {
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
            Password Reset Successful!
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
        </div>

        <Link
          href="/auth/signin"
          className="inline-block w-full cursor-pointer rounded-lg bg-yellow-500 p-3 text-gray-700 transition hover:bg-opacity-80"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
          Reset Your Password
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your new password below.
        </p>
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          New Password
        </label>
        <div className="relative">
          <InputWithIcon
            type="password"
            register={register("newPassword")}
            errors={errors.newPassword}
            placeholder="Enter your new password"
            Icon={<LockIcon />}
          />
        </div>
        {errors.newPassword && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">
            <p>Password must contain:</p>
            <ul className="ml-4 list-disc">
              <li>At least 6 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
            </ul>
          </div>
        )}
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
          value={isSubmitting ? "Resetting..." : "Reset Password"}
          className="w-full cursor-pointer rounded-lg bg-yellow-500 p-3 text-gray-700 transition hover:bg-opacity-80 disabled:bg-slate-500"
        />
      </div>

      <div className="text-center">
        <Link href="/auth/signin" className="text-yellow-600 hover:text-yellow-700">
          Back to Sign In
        </Link>
      </div>
    </form>
  );
}
