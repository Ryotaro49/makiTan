"use client";

import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // 送信ボタンをクリックしても処理は行わない
    alert(
      "問い合わせは ryotaro200049@gmail.com あてにメールを送ってください。",
    );
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          お問い合わせ
        </Typography>
        <Typography variant="body1" gutterBottom>
          お問い合わせは以下のメールアドレスにご連絡ください:
        </Typography>
        <Typography variant="body1" gutterBottom>
          <a href="mailto:ryotaro200049@gmail.com">ryotaro200049@gmail.com</a>
        </Typography>
      </Box>
    </Container>
  );
}
