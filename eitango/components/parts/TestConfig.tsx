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

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        テスト設定
      </Typography>
      <Stack spacing={2} py={2}>
        <FormControl fullWidth>
          <InputLabel id="questions-count">問題数</InputLabel>
          <Select
            labelId="questions-count"
            id="category"
            value={category}
            onChange={handleQuestionCountChange}
          >
            <MenuItem value="10">10問</MenuItem>
            <MenuItem value="20">20問</MenuItem>
            <MenuItem value="30">30問</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="category-label">品詞</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <MenuItem value="名詞">名詞</MenuItem>
            <MenuItem value="動詞">動詞</MenuItem>
            <MenuItem value="形容詞">形容詞</MenuItem>
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
        >
          <Button variant="contained" color="primary">
            テスト開始
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default TestConfig;
