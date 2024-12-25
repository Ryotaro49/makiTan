import { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput(props: TextInputProps) {
  return (
    <input {...props} className="border-teal rounded border bg-slate-50" />
  );
}
