"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const NewPhrase: React.FC = () => {
  const router = useRouter();
  // 1. フォームの入力値を管理するためのstate
  const tango_id = 1;
  const [phrase, setPhrase] = useState("");
  const [meaning, setMeaning] = useState("");
  const [category, setCategory] = useState("");
  // 2. 作成APIを呼び出す関数
  const createPhrase = useCallback(async () => {
    const res = await fetch(`/api/phrases`, {
      method: "POST",
      body: JSON.stringify({
        user_id: tango_id,
        phrase: phrase,
        meaning: meaning,
        category: category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("単語が追加されました。");
      // 3. 現在のページのデータをサーバーから再取得する
      router.refresh();
    } else {
      alert("単語が追加できませんでした。");
    }
  }, [phrase, router, category, meaning]);

  return (
    <Box
      my={4}
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: "2px solid grey" }}
    >
      <TextField
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        label="単語"
      />
      <TextField
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
        label="意味"
      />
      <TextField
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        label="品詞"
      />
      <Box sx={{ display: "flex", gap: 5 }}>
        <Button variant="outlined" onClick={createPhrase}>
          追加
        </Button>
      </Box>
    </Box>
  );
};

export default NewPhrase;
