import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type PasswordInputProps = {
  value: string;
  onChange: (event: { target: { value: string } }) => void;
};

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event);
  };

  return (
    <>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="パスワード"
        value={props.value}
        onChange={handleInputChange}
      />
      <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </button>{" "}
    </>
  );
}
