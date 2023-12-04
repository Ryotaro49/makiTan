import { useCallback, useEffect, useState } from "react";
import { PasswordInput } from "./components/elements/PasswordInput";
import { Button } from "./components/elements/Button";
import { TextInput } from "./components/elements/TextInput";
import { Message } from "./components/elements/Message";
import { CheckBox } from "./components/elements/CheckBox";
import { usePointerPosition } from "./hooks/usePointerPosition";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [saveUsername, setSaveUsername] = useState(true);
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

  const { position, ctrlKey } = usePointerPosition({
    offset: { x: 50, y: 50 },
  });
  console.log(position, ctrlKey);

  return (
    <div className="flex h-full place-items-center justify-center">
      <form onSubmit={handleSubmit} className="rounded-lg border p-8 shadow-lg">
        <div className="grid grid-cols-1 gap-2">
          <TextInput
            type="text"
            name="username"
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
          <div className="flex gap-2">
            <Button type="submit">ログイン</Button>
          </div>
        </div>
      </form>
      <div
        style={{
          position: "absolute",
          backgroundColor: "pink",
          borderRadius: "50%",
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      />
    </div>
  );
}

export default App;
