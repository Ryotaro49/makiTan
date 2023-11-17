import { InputHTMLAttributes, useState } from "react";
import { EyeOpenIcon } from "../icons/EyeOpenIcon";
import { EyeCloseIcon } from "../icons/EyeCloseIcon";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative inline-flex items-center rounded border">
      <input
        {...props}
        type={showPassword ? "text" : "password"}
        className="flex-1 bg-transparent px-2 py-1 pr-8"
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2"
      >
        {showPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
      </button>
    </div>
  );
}
