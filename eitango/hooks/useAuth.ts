import React from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    const checkToken = async () => {
      try {
        // トークンが存在するかをチェック
        const response = await fetch("/api/me");
        const data = await response.json();

        if (response.ok && data.email) {
          setIsLoggedIn(true);
          setEmail(data.email);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to check token:", error);
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, [isLoggedIn]);

  const signOut = () => {
    // サインアウト処理
    fetch("/api/delete-cookie", {
      method: "DELETE",
    })
      .then(() => {
        setIsLoggedIn(false);
        window.location.replace("/lp"); // サインアウト後に /lp にリダイレクト
      })
      .catch((error) => {
        console.error("Failed to sign out:", error);
      });
  };

  return { isLoggedIn, email, signOut };
};
