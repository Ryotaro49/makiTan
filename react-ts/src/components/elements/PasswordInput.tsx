type PasswordInputProps = {
  value: string;
};

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="パスワード"
      />
      <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? "Hide" : "Show"}
      </button>{" "}
    </>
  );
}
