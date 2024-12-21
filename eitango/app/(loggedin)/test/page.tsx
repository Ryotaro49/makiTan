import { apiUrl } from "@/constants/api";
import { Box, Button, Grid } from "@mui/material";
import Link from "next/link";
import { zPhrases } from "../phrases/type";
import Test from "@/components/parts/Test";
import { text } from "stream/consumers";
import { cookies } from "next/headers";

export const getPhrases = async (
  unPassedOnlyChecked: string,
  questionsCount: string,
  category: string,
) => {
  const res = await fetch(`${apiUrl}/phrases`, {
    cache: "no-store",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
      unPassedOnlyChecked: unPassedOnlyChecked,
      questionsCount: questionsCount,
      category: category,
    },
  });
  const data = await res.json();
  const phrases = zPhrases.parse(data);
  return phrases;
};

export default async function TestPage({
  searchParams,
}: {
  searchParams: {
    unPassedOnlyChecked: string;
    questionsCount: string;
    category: string;
  };
}) {
  const { unPassedOnlyChecked, questionsCount, category } = searchParams;
  const phrases = await getPhrases(
    unPassedOnlyChecked,
    questionsCount,
    category,
  );

  return (
    <>
      {phrases.length > 0 ? (
        <Test initialState={phrases} />
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
