import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="rounded bg-teal-700 px-4 py-1 text-lg text-white"
    ></button>
  );
}
