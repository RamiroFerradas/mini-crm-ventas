import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition",
        variant === "primary" &&
          "bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40",
        variant === "secondary" &&
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
        variant === "ghost" &&
          "text-zinc-300 hover:bg-zinc-800",
        className
      )}
      {...props}
    />
  );
}

Button.displayName = "Button";