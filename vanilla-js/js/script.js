window.onload = () => {
  // 各要素の取得 (querySelector)
  const usernameInput = document.querySelector("#username-input");
  const passwordInput = document.querySelector("#password-input");
  const switchPasswordVisibilityButton = document.querySelector(
    "#switch-password-visibility-button"
  );
  const form = document.querySelector("#login-form");
  const messageDiv = document.querySelector("#message");

  // パスワード表示切り替えボタンの処理
  //   - パスワード入力欄の type を変更
  //   - ボタンのテキストを変更 (Show / Hide)
  switchPasswordVisibilityButton.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      switchPasswordVisibilityButton.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      switchPasswordVisibilityButton.textContent = "Show";
    }
  });
  // フォーム送信時の処理
  //  - ユーザー名とパスワードの取得
  //  - ユーザー名とパスワードの入力チェック → エラーの場合はメッセージの表示 (div#message)
  //  - ユーザー名とパスワードの一致チェック → エラーの場合はメッセージの表示 (div#message)
  //  - エラーメッセージのクリア
  //  - ログインメッセージの表示 (alert)
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (username === "") {
      messageDiv.textContent = "ユーザー名は必須です。";
      return;
    }
    if (password === "") {
      messageDiv.textContent = "パスワードは必須です。";
      return;
    }
    if (username !== password) {
      messageDiv.textContent = "ユーザー名とパスワードが一致しません。";
      return;
    }
    messageDiv.textContent = "";
    alert(username + "さん、こんにちは！");
  });
};
