import { HTMLInputTypeAttribute, ReactNode } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  type: HTMLInputTypeAttribute;
  register: UseFormRegisterReturn<string>;
  errors: FieldError | undefined;
  placeholder: string;
  Icon: ReactNode;
}

export const InputWithIcon: React.FC<Props> = ({
  type,
  register,
  errors,
  placeholder,
  Icon,
}) => {
  return (
    <>
      <div className="relative">
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-lg border bg-transparent py-3 pl-6 pr-10  outline-none ${
            errors
              ? "border-red-500 text-red-500 placeholder:text-red-500"
              : "focus:border-primary active:border-primary border-primary-border text-gray-500 dark:text-gray-300"
          }`}
        />
        <span className="absolute right-0 -bottom-5 text-sm text-red-500 ">
          {errors?.message}
        </span>
        <span
          className={`absolute right-4 top-4 ${
            errors?.message ? "text-red-500" : ""
          }`}
        >
          {Icon}
        </span>
      </div>
    </>
  );
};
