"use client";

import { useState } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginField from "@/components/parts/LoginField";

export default function SignIn() {
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (!res.ok) {
        const result = await res.json();
        setError(result.message);
        console.log("Error:", result.message);
      } else {
        const result = await res.json();
        alert(`ログインしました。User ID: ${result.userId}`);
        console.log("Login successful");
        window.location.href = "/";
      }
    } catch (error) {
      setError("Something went wrong");
      console.log("Fetch error:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          makiTan
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <LoginField />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={handleRememberMeChange}
              />
            }
            label="ログイン状態を保持する"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                {"パスワードを忘れた場合はこちら"}
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                {"新規登録の場合はこちら"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
