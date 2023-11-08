import { useCallback, useRef, useState } from "react";
import "./App.css";
import { PasswordInput } from "./components/elements/PasswordInput";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  // const passwordRef = useRef<HTMLInputElement>(null);
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
    [username, password, setMessage]
  );
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="box">
          <input
            type="text"
            name="username"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div id="name"></div>
        </div>
        <div className="box">
          <PasswordInput
            placeholder="パスワード"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="box">
          <div id="message">{message}</div>
          <div className="box">
            <button type="submit">ログイン</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
