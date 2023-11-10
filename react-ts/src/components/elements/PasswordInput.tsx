import { InputHTMLAttributes, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>;

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="パスワード"
        value={props.value}
        onChange={props.onChange}
      />
      <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </button>{" "}
    </>
  );
}
