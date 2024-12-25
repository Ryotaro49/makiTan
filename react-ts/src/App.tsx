import { useState } from "react";
import { PasswordInput } from "./components/elements/PasswordInput";
import { Button } from "./components/elements/Button";
import { TextInput } from "./components/elements/TextInput";
import { Message } from "./components/elements/Message";
import { CheckBox } from "./components/elements/CheckBox";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saveUsername, setSaveUsername] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (username === "") {
      setMessage("ユーザー名を入力してください");
      return;
    }
    if (password === "") {
      setMessage("パスワードを入力してください");
      return;
    }
    if (username !== password && password !== username) {
      setMessage("ユーザー名またはパスワードが間違っています");
      return;
    }
    alert(`${username} さん、ようこそ！`);
    setMessage("");
  };

  return (
    <div className="flex h-full place-items-center justify-center bg-gradient-to-b from-emerald-600 to-green-100">
      <form
        onSubmit={handleSubmit}
        className="rounded border bg-white p-8 shadow-lg"
      >
        <div className="mb-4 text-center text-xl font-semibold">login</div>
        <div className="grid grid-cols-1 gap-3">
          <TextInput
            type="text"
            name="username"
            id="username-input"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            placeholder="パスワード"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CheckBox
            label="ユーザー名を保存する"
            checked={saveUsername}
            onChange={(e) => setSaveUsername(e.target.checked)}
          />
          <Message message={message} variant="error" />
          <Button type="submit">ログイン</Button>
        </div>
      </form>
    </div>
  );
}

export default App;
