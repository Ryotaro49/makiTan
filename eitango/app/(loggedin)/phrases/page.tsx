import ErrorBoundary from "@/components/ErrorBoundary";
import FetchError from "@/components/FetchError";
import Loading from "@/components/Loading";
import { apiUrl } from "@/constants/api";
import { Suspense } from "react";
import TangoList from "../../../components/parts/TangoList";
import { zPhrases } from "./type";
import { Button } from "@mui/material";
import Link from "next/link";
import { cookies } from "next/headers";
import { PhrasesPage } from "@/components/pages/phrases/PhrasesPage";

// 1. 静的/動的レンダリングや再生成の間隔を指定
export const revalidate = 0;

export default async function Page() {
  return <PhrasesPage />;
}

// export const getPhrases = async () => {
//   const res = await fetch(`${apiUrl}/phrases`, {
//     cache: "no-store",
//     headers: {
//       Cookie: `token=${cookies().get("token")?.value}`,
//     },
//   });
//   const data = await res.json();
//   const phrases = zPhrases.parse(data);
//   return phrases;
// };
