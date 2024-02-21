import Link from "next/link";
import { Metadata } from "next/types";
import { getPhrase } from "./getPhrase";
import Phrase from "./Phrase";

export const revalidate = 0;

// ページのメタデータを動的に取得
export async function generateMetadata({
  params,
}: {
  params: { tango_id: number };
}): Promise<Metadata> {
  console.log(params.tango_id);
  const phrase = await getPhrase(params.tango_id);
  return { title: phrase.phrase };
}

export default async function Page({
  params,
}: {
  params: { tango_id: number };
}) {
  console.log("ああああああああ");
  console.log(params);
  const phrase = await getPhrase(params.tango_id);
  return (
    <main>
      <Link
        href="/phrases"
      >
        ← back
      </Link>
      <Phrase item={phrase} />
    </main>
  );
}
