"use client";

import Loading from "@/components/Loading";
import TangoList from "@/components/parts/TangoList";
import { Button } from "@mui/material";
import Link from "next/link";
import useSWR from "swr";

export function PhrasesPage() {
  const {
    data: phrases,
    error,
    isLoading,
  } = useSWR("/api/phrases", (url) => fetch(url).then((res) => res.json()));

  if (isLoading) {
    return <Loading />;
  }
  return (
    <main>
      <Link href="/">
        <Button variant="outlined" size="large">
          ← back
        </Button>
      </Link>
      <h2>単語一覧</h2>
      {/* 3. Client ComponentsのSuspenseの使用 */}
      <Link href="/phrases/new">
        <Button variant="outlined" size="large">
          追加
        </Button>
      </Link>
      <TangoList initialState={phrases} />
    </main>
  );
}
