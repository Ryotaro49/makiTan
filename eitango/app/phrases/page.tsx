import ErrorBoundary from '@/components/ErrorBoundary';
import FetchError from '@/components/FetchError';
import Loading from '@/components/Loading';
import { apiUrl } from "@/constants/api";
import { Suspense } from 'react';
import "server-only";
import TangoList from './TangoList';
import { zTangos } from "./type";

// 1. 静的/動的レンダリングや再生成の間隔を指定
export const revalidate = 0;

export const metadata = {
  title: "List Tangos",
}

export default async function Page() {
  // 2. APIを用いたデータ取得
  const phrases = await getPhrases();
  return (
    <main>
      <h2>単語一覧</h2>
      { /* 3. Client ComponentsのSuspenseの使用 */ }
      <ErrorBoundary fallback={<FetchError />}>
        <Suspense fallback={<Loading />}>
          <TangoList initialState={phrases} />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}

export const getPhrases = async () => {
    const res = await fetch(`${apiUrl}/phrases`, { cache: 'no-store' });
    const data = await res.json();
    const phrases = zTangos.parse(data);
    return phrases;
};