import { ButtonHTMLAttributes } from "react";

type ButtonInputProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonInputProps) {
  return (
    <button
      {...props}
      className="text-1g rounded bg-teal-700 px-3 py-1 text-white"
    />
  );
}
