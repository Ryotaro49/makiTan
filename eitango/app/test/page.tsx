import { apiUrl } from "@/constants/api";
import { Button } from "@mui/material";
import Link from "next/link";
import { zPhrases } from "../phrases/type";
import Test from "@/components/parts/Test";

export const getPhrases = async (
  unPassedOnlyChecked: string,
  questionsCount: string,
) => {
  const url = new URL(`${apiUrl}/phrases`);
  url.searchParams.append("unPassedOnlyChecked", unPassedOnlyChecked);
  url.searchParams.append("questionsCount", questionsCount);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = await res.json();
  const phrases = zPhrases.parse(data);
  return phrases;
};

export default async function TestPage({
  searchParams,
}: {
  searchParams: { unPassedOnlyChecked: string; questionsCount: string };
}) {
  const { unPassedOnlyChecked, questionsCount } = searchParams;
  const phrases = await getPhrases(unPassedOnlyChecked, questionsCount);

  return (
    <main>
      <Link href="/">
        <Button variant="outlined" size="large">
          ← back
        </Button>
      </Link>
      {phrases.length > 0 ? (
        <Test initialState={phrases} />
      ) : (
        <Link href="/test/config">
          <Button variant="outlined" size="large">
            該当する単語が見つかりませんでした。テスト設定に戻る。
          </Button>
        </Link>
      )}
    </main>
  );
}
