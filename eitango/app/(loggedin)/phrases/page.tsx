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
  // const token = cookies().get("token");
  // console.log("token", token);
  // 2. APIを用いたデータ取得
  // const phrases = await getPhrases();

  return <PhrasesPage />;
  // const {
  //   data: phrases,
  //   error,
  //   isLoading,
  // } = useSWR("/api/phrases", (url) => fetch(url).then((res) => res.json()));

  // if (isLoading) {
  //   return <Loading />;
  // }
  // return (
  //   <main>
  //     <Link href="/">
  //       <Button variant="outlined" size="large">
  //         ← back
  //       </Button>
  //     </Link>
  //     <h2>単語一覧</h2>
  //     {/* 3. Client ComponentsのSuspenseの使用 */}
  //     <ErrorBoundary fallback={<FetchError />}>
  //       <Suspense fallback={<Loading />}>
  //         <Link href="/phrases/new">
  //           <Button variant="outlined" size="large">
  //             追加
  //           </Button>
  //         </Link>
  //         <TangoList initialState={phrases} />
  //       </Suspense>
  //     </ErrorBoundary>
  //   </main>
  // );
}

export const getPhrases = async () => {
  const res = await fetch(`${apiUrl}/phrases`, {
    cache: "no-store",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
    },
  });
  const data = await res.json();
  const phrases = zPhrases.parse(data);
  return phrases;
};
