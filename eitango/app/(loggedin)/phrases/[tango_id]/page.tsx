import Link from "next/link";
import { Metadata } from "next/types";
import { getPhrase } from "./getPhrase";
import Phrase from "./Phrase";
import { Button } from "@mui/material";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: { tango_id: number };
}) {
  const phrase = await getPhrase(params.tango_id);
  return (
    <main>
      <Phrase item={phrase} />
    </main>
  );
}
