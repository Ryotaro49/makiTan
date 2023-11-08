import { InputHTMLAttributes, useState } from "react";

// type PasswordInputProps = {
//   placeholder: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };
// type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>;
type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <input {...props} type={showPassword ? "text" : "password"} />
      <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? "Hide" : "Show"}
      </button>
    </>
  );
}
