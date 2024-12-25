"use client";
import React, { SetStateAction } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const NewPhrase: React.FC = () => {
  const router = useRouter();
  // 1. フォームの入力値を管理するためのstate
  const [phrase, setPhrase] = useState("");
  const [meaning, setMeaning] = useState("");
  const [category, setCategory] = useState("");
  // 2. 作成APIを呼び出す関数
  const createPhrase = useCallback(async () => {
    const res = await fetch(`/api/phrases`, {
      method: "POST",
      body: JSON.stringify({
        phrase: phrase,
        meaning: meaning,
        category: category,
        is_passed: false,
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

  const handleCategoryChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCategory(event.target.value);
  };

  return (
    <Box
      my={4}
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      gap={4}
      p={2}
    >
      <Box
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
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
        <FormControl>
          <InputLabel id="category-label">品詞</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={handleCategoryChange}
            label="品詞"
          >
            <MenuItem value="">
              <em>未選択</em>
            </MenuItem>
            <MenuItem value="noun">名詞</MenuItem>
            <MenuItem value="pronoun">代名詞</MenuItem>
            <MenuItem value="verb">動詞</MenuItem>
            <MenuItem value="adjective">形容詞</MenuItem>
            <MenuItem value="adverb">副詞</MenuItem>
            <MenuItem value="auxiliaryverb">助動詞</MenuItem>
            <MenuItem value="article">冠詞</MenuItem>
            <MenuItem value="preposition">前置詞</MenuItem>
            <MenuItem value="conjunction">接続詞</MenuItem>
            <MenuItem value="interjection">間投詞</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", gap: 5 }}>
        <Button variant="outlined" onClick={createPhrase}>
          追加
        </Button>
      </Box>
    </Box>
  );
};

export default NewPhrase;
