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
    <form id="login-form" onSubmit={handleSubmit}>
      <div className="box">
        <TextInput
          type="text"
          name="username"
          id="username-input"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div id="name"></div>
      </div>
      <PasswordInput
        placeholder="パスワード"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-teal border bg-slate-50"
      />
      <CheckBox
        label="ユーザー名を保存する"
        checked={saveUsername}
        onChange={(e) => setSaveUsername(e.target.checked)}
      />
      <div className="box">
        <Message message={message} variant="error" />
        <div className="box">
          <Button type="submit" id="login-button">
            ログイン
          </Button>
        </div>
      </div>
    </form>
  );
}

export default App;
