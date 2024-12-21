"use client";
import * as React from "react";
import {
  Button,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Collapse,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TestConfig: React.FC = () => {
  const [questionsCount, setQuestionsCount] = React.useState<string>("10");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );
  const [unPassedOnlyChecked, setUnPassedOnlyChecked] = React.useState(false);
  const [isPartsOfSpeechVisible, setIsPartsOfSpeechVisible] =
    React.useState(false);
  const router = useRouter();

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
          <TextField
            fullWidth
            label="問題数"
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            value={questionsCount}
            onChange={(e) => setQuestionsCount(e.target.value)}
          />
          <FormControl>
            <Button
              onClick={() => setIsPartsOfSpeechVisible(!isPartsOfSpeechVisible)}
              variant="text"
              sx={{ justifyContent: "flex-start", mb: 1 }}
              endIcon={isPartsOfSpeechVisible ? "▼" : "▶"}
            >
              <Typography variant="subtitle1">品詞</Typography>
            </Button>
            <Collapse in={isPartsOfSpeechVisible}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes("noun")}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes("noun")
                            ? prev.filter((c) => c !== "noun")
                            : [...prev, "noun"],
                        )
                      }
                      value="noun"
                    />
                  }
                  label="名詞"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes("pronoun")}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes("pronoun")
                            ? prev.filter((c) => c !== "pronoun")
                            : [...prev, "pronoun"],
                        )
                      }
                      value="pronoun"
                    />
                  }
                  label="代名詞"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes("verb")}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes("verb")
                            ? prev.filter((c) => c !== "verb")
                            : [...prev, "verb"],
                        )
                      }
                      value="verb"
                    />
                  }
                  label="動詞"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes("adjective")}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes("adjective")
                            ? prev.filter((c) => c !== "adjective")
                            : [...prev, "adjective"],
                        )
                      }
                      value="adjective"
                    />
                  }
                  label="形容詞"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes("adverb")}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes("adverb")
                            ? prev.filter((c) => c !== "adverb")
                            : [...prev, "adverb"],
                        )
                      }
                      value="adverb"
                    />
                  }
                  label="副詞"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes("auxiliaryverb")}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes("auxiliaryverb")
                            ? prev.filter((c) => c !== "auxiliaryverb")
                            : [...prev, "auxiliaryverb"],
                        )
                      }
                      value="auxiliaryverb"
                    />
                  }
                  label="助動詞"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes("article")}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes("article")
                            ? prev.filter((c) => c !== "article")
                            : [...prev, "article"],
                        )
                      }
                      value="article"
                    />
                  }
                  label="冠詞"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes("preposition")}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes("preposition")
                            ? prev.filter((c) => c !== "preposition")
                            : [...prev, "preposition"],
                        )
                      }
                      value="preposition"
                    />
                  }
                  label="前置詞"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes("conjunction")}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes("conjunction")
                            ? prev.filter((c) => c !== "conjunction")
                            : [...prev, "conjunction"],
                        )
                      }
                      value="conjunction"
                    />
                  }
                  label="接続詞"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes("interjection")}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes("interjection")
                            ? prev.filter((c) => c !== "interjection")
                            : [...prev, "interjection"],
                        )
                      }
                      value="interjection"
                    />
                  }
                  label="間投詞"
                />
              </FormGroup>
            </Collapse>
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
            href={`/test?unPassedOnlyChecked=${unPassedOnlyChecked}&questionsCount=${questionsCount}&category=${selectedCategories.join(",")}`}
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
