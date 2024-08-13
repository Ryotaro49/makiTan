import { apiUrl } from "@/constants/api";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { zPhrases } from "../phrases/type";
import Test from "@/components/parts/Test";
import { text } from "stream/consumers";

export const getPhrases = async (
  unPassedOnlyChecked: string,
  questionsCount: string,
  category: string,
) => {
  const url = new URL(`${apiUrl}/phrases`);
  url.searchParams.append("unPassedOnlyChecked", unPassedOnlyChecked);
  url.searchParams.append("questionsCount", questionsCount);
  url.searchParams.append("category", category);

  const res = await fetch(url.toString(), { cache: "no-store" });
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
  const style = {
    position: "absolute" as "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    textAlign: "center",
    border: "2px solid #000",
    p: 4,
  };

  return (
    <Box>
      {phrases.length > 0 ? (
        <Test initialState={phrases} />
      ) : (
        <Box sx={style}>
          <Box fontSize={20}>該当する単語が見つかりませんでした。</Box>
          <Link href="/test/config">
            <Button variant="outlined" size="large">
              <Box>テスト設定に戻る</Box>
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}
