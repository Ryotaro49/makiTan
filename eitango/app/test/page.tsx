import { apiUrl } from "@/constants/api";
import { Button } from "@mui/material";
import Link from "next/link";
import { zPhrases } from "../phrases/type";
import Test from "@/components/parts/Test";

export const getPhrases = async (checked: string, selectedValue: string) => {
  const url = new URL(`${apiUrl}/phrases`);
  url.searchParams.append("checked", checked);
  url.searchParams.append("selectedValue", selectedValue);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = await res.json();
  const phrases = zPhrases.parse(data);
  return phrases;
};

export default async function TestPage({
  searchParams,
}: {
  searchParams: { checked: string; selectedValue: string };
}) {
  const { checked, selectedValue } = searchParams;
  const phrases = await getPhrases(checked, selectedValue);

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
            該当する単語が見つかりませんでした。
          </Button>
        </Link>
      )}
    </main>
  );
}
