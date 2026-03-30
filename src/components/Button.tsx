import { ButtonHTMLAttributes } from "react";

const styles = {
  primary: "bg-gray-900 text-white hover:bg-gray-700 active:bg-gray-800 shadow-sm",
  ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof styles }) {
  return (
    <button
      className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
