import { InputHTMLAttributes, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>;

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative inline-flex items-center rounded border">
      <input {...props} type={showPassword ? "text" : "password"} />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 hover:bg-teal-50"
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </button>{" "}
    </div>
  );
}
