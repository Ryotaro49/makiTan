import React, { useState } from "react";
import "./App.css";
import { PasswordInput } from "./components/elements/PasswordInput";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

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
        <input
          type="text"
          name="username"
          id="username-input"
          placeholder="ユーザー名"
          value={username}
          onChange={handleUsernameChange}
        />
        <div id="name"></div>
      </div>
      <div className="box">
        <PasswordInput value={password} onChange={handlePasswordChange} />
      </div>
      <div className="box">
        {message && <div>{message}</div>}
        <div className="box">
          <button type="submit" id="login-button">
            ログイン
          </button>
        </div>
      </div>
    </form>
  );
}

export default App;
