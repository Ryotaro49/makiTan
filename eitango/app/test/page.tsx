import { apiUrl } from "@/constants/api";
import "server-only";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { zPhrases } from "../phrases/type";
import Test from "@/components/parts/Test";
import TestConfigModal from "@/components/parts/TestConfigModal";

export default async function Page() {
  // 2. APIを用いたデータ取得
  const phrases = await getPhrases();
  return (
    <main>
      <Link href="/">
        <Button variant="outlined" size="large">
          ← back
        </Button>
      </Link>

      <Test initialState={phrases} />
    </main>
  );
}

export const getPhrases = async () => {
  const res = await fetch(`${apiUrl}/phrases`, { cache: "no-store" });
  const data = await res.json();
  const phrases = zPhrases.parse(data);
  return phrases;
};
