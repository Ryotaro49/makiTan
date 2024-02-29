"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { zPhrase } from "../type";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

type Props = {
  item: zPhrase;
};

const Phrase: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const [updatedPhrase, setUpdatedPhrase] = useState(item.phrase);
  const [updatedMeaning, setUpdatedMeaning] = useState(item.meaning);
  const deletePhrase = useCallback(async () => {
    const res = await fetch(`/api/phrases/${item.tango_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("単語を削除しました。");
      router.push(`/phrases`);
      router.refresh();
    } else {
      alert("Note failed to delete");
    }
  }, [item.tango_id, router]);
  const updatePhrase = useCallback(async () => {
    const res = await fetch(`/api/phrases/${item.tango_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phrase: updatedPhrase,
        meaning: updatedMeaning,
      }),
    });
    if (res.ok) {
      alert("単語を更新しました。");
    } else {
      alert("更新に失敗しました。");
    }
  }, [item.tango_id, updatedPhrase, updatedMeaning]);

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
      <Typography>{item.phrase}</Typography>
      <TextField
        value={updatedPhrase}
        onChange={(e) => setUpdatedPhrase(e.target.value)}
        label="単語"
      />
      <Typography>{item.meaning}</Typography>
      <TextField
        value={updatedMeaning}
        onChange={(e) => setUpdatedMeaning(e.target.value)}
        label="意味"
      />
      <Box sx={{ display: "flex", gap: 5 }}>
        <Button onClick={updatePhrase} variant="outlined">
          更新
        </Button>
        <Button onClick={deletePhrase} variant="outlined">
          削除
        </Button>
      </Box>
    </Box>
  );
};

export default Phrase;
