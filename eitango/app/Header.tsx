"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export default function ButtonAppBar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    const checkToken = async () => {
      try {
        // トークンが存在するかをチェック
        const response = await fetch("/api/me");
        const data = await response.json();
        console.log("data", data);
        console.log("response", response);

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

  const handleSignOut = () => {
    // サインアウト処理
    fetch("/api/delete-cookie", {
      method: "DELETE",
    });
    setIsLoggedIn(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              href={"/"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Tango App
            </Link>
          </Typography>

          {isLoggedIn ? (
            <Link href={"/login"}>
              <Button
                color="inherit"
                sx={{ color: "white" }}
                onClick={handleSignOut}
              >
                {email}
              </Button>
            </Link>
          ) : (
            <Link href={"/login"}>
              <Button color="inherit" sx={{ color: "white" }}>
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
