import { Box, Button, Grid } from "@mui/material";
import Link from "next/link";
import Test from "@/components/parts/Test";
import { getPhrases } from "./utils";

export default async function TestPage({
  searchParams,
}: {
  searchParams: {
    unPassedOnlyChecked: string;
    questionsCount: string;
    shuffle: string;
    category: string;
  };
}) {
  const { unPassedOnlyChecked, questionsCount, shuffle, category } =
    searchParams;
  const phrases = await getPhrases(
    unPassedOnlyChecked,
    questionsCount,
    category,
  );
  const shuffledPhrases =
    shuffle === "true"
      ? phrases
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      : phrases;

  return (
    <>
      {shuffledPhrases.length > 0 ? (
        <Test initialState={shuffledPhrases} />
      ) : (
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          container
          direction="column"
          gap={10}
          sx={{ minHeight: "40vh" }} // 画面全体の高さを指定
        >
          <Box fontSize={20}>該当する単語が見つかりませんでした。</Box>
          <Link href="/test/config">
            <Button variant="contained" color="primary">
              <Box>テスト設定に戻る</Box>
            </Button>
          </Link>
        </Grid>
      )}
    </>
  );
}
