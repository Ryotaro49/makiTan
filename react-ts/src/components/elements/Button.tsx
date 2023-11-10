import { ButtonHTMLAttributes } from "react";

type ButtonInputProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonInputProps) {
  return <button {...props} />;
}
