import { useCallback, useState } from "react";
import { PasswordInput } from "./components/elements/PasswordInput";
import { Button } from "./components/elements/Button";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (username === "" || password === "") {
        setMessage("ユーザー名とパスワードを入力してください。");
        return;
      }
      if (username !== password) {
        setMessage("ユーザー名とパスワードが一致しません。");
        return;
      }
      setMessage("");
      alert(`${username} さん、ようこそ！`);
    },
    [username, password, setMessage],
  );
  return (
    <div className="flex h-full place-items-center justify-center">
      <form onSubmit={handleSubmit} className="rounded-lg border p-8 shadow-lg">
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            name="username"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded border px-2 py-1"
          />
          <PasswordInput
            placeholder="パスワード"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-red-500">{message}</div>
          <div className="flex gap-2">
            <Button type="submit">ログイン</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
