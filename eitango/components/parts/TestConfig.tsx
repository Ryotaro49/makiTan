"use client";
import * as React from "react";
import {
  Button,
  Typography,
  Radio,
  Box,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TestConfig: React.FC = () => {
  const [questionsCount, setQuestionsCount] = React.useState<string>("10");
  const [category, setCategory] = React.useState<string>("");
  const [unPassedOnlyChecked, setUnPassedOnlyChecked] = React.useState(false);
  const router = useRouter();

  const handleQuestionCountChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuestionsCount(event.target.value);
  };

  const handleCategoryChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCategory(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnPassedOnlyChecked(event.target.checked);
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
      <Box
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Stack spacing={2} py={2}>
          <FormControl fullWidth>
            <InputLabel id="questions-count">問題数</InputLabel>
            <Select
              labelId="questions-count"
              id="category"
              value={questionsCount}
              onChange={handleQuestionCountChange}
            >
              <MenuItem value="10">10問</MenuItem>
              <MenuItem value="20">20問</MenuItem>
              <MenuItem value="30">30問</MenuItem>
            </Select>
          </FormControl>
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
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={unPassedOnlyChecked}
                  onChange={handleCheckboxChange}
                  value="True"
                />
              }
              label="覚えていないものだけ"
            />
          </FormGroup>
          <Link
            href={`/test?unPassedOnlyChecked=${unPassedOnlyChecked}&questionsCount=${questionsCount}&category=${category}`}
            style={{ textDecoration: "none" }}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <Button variant="contained" color="primary">
                テスト開始
              </Button>
            </Box>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default TestConfig;
