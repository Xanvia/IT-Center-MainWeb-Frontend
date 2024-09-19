import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface textInputProps {
  register: UseFormRegisterReturn<string>;
  errors: FieldError | undefined;
  label: string;
  isSmall?: boolean;
}

export const TextInput: React.FC<textInputProps> = ({
  register,
  errors,
  label,
  isSmall,
}) => {
  return (
    <div>
      <label
        className={`pl-2 block font-medium text-black dark:text-white ${
          isSmall ? "mb-1.5" : "mb-2"
        }`}
      >
        {label}
      </label>
      <input
        {...register}
        type="text"
        placeholder={`Enter your ${label}`}
        className={`w-full text-sm rounded border-[1.5px] bg-transparent px-3 outline-none transition ${
          errors?.message
            ? "border-red-500 text-red-500 placeholder:text-red-500"
            : "focus:border-yellow-500 active:border-yellow-500 border-primary-border text-gray-500 dark:text-gray-300"
        } ${isSmall ? "py-1.5" : "py-2"} `}
      />

      <div className="h-0 text-xs text-right text-red-500 ">
        {errors?.message}
      </div>
    </div>
  );
};
