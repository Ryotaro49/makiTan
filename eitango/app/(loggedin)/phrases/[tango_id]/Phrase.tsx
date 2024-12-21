"use client";
import { useRouter } from "next/navigation";
import { SetStateAction, useCallback, useState } from "react";
import { zPhrase } from "../type";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

type Props = {
  item: zPhrase;
};

const Phrase: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const [updatedPhrase, setUpdatedPhrase] = useState(item.phrase);
  const [updatedMeaning, setUpdatedMeaning] = useState(item.meaning);
  const [updatedCategory, setUpdatedCategory] = useState(item.category);
  const [updatedIs_passed, setUpdatedIs_passed] = useState(item.is_passed);
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
        user_id: item.user_id,
        phrase: updatedPhrase,
        meaning: updatedMeaning,
        category: updatedCategory,
        is_passed: updatedIs_passed,
      }),
    });
    if (res.ok) {
      alert("単語を更新しました。");
    } else {
      alert("更新に失敗しました。");
    }
  }, [
    item.tango_id,
    item.user_id,
    updatedPhrase,
    updatedMeaning,
    updatedCategory,
    updatedIs_passed,
  ]);

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    // チェックボックスの新しい値を取得し、状態を更新
    setUpdatedIs_passed(event.target.checked);
  };

  const handleCategoryChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUpdatedCategory(event.target.value);
  };

  return (
    <Box
      my={4}
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
      gap={4}
      p={2}
    >
      <TextField
        value={updatedPhrase}
        onChange={(e) => setUpdatedPhrase(e.target.value)}
        label="単語"
      />
      <TextField
        value={updatedMeaning}
        onChange={(e) => setUpdatedMeaning(e.target.value)}
        label="意味"
      />
      <FormControl>
        <InputLabel id="category-label">品詞</InputLabel>
        <Select
          labelId="category-label"
          value={updatedCategory}
          onChange={handleCategoryChange}
          label="品詞"
        >
          <MenuItem value="名詞">名詞</MenuItem>
          <MenuItem value="動詞">動詞</MenuItem>
          <MenuItem value="形容詞">形容詞</MenuItem>
          <MenuItem value="副詞">副詞</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={updatedIs_passed}
            onChange={handleCheckboxChange} // チェックボックスの状態が変更されたときに呼び出されるハンドラー
          />
        }
        label="覚えた"
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
