import Link from "next/link";
import { Metadata } from "next/types";
import { getPhrase } from "./getPhrase";
import Phrase from "./Phrase";
import { Button } from "@mui/material";

export const revalidate = 0;

// ページのメタデータを動的に取得
export async function generateMetadata({
  params,
}: {
  params: { tango_id: number };
}): Promise<Metadata> {
  const phrase = await getPhrase(params.tango_id);
  return { title: phrase.phrase };
}

export default async function Page({
  params,
}: {
  params: { tango_id: number };
}) {
  const phrase = await getPhrase(params.tango_id);
  return (
    <main>
      <Link href="/phrases">
        <Button variant="outlined" size="large">
          ← back
        </Button>
      </Link>
      <Phrase item={phrase} />
    </main>
  );
}
