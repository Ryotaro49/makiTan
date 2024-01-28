'use client'
import { Button, Stack, TextField, Typography } from "@mui/material";
import Link from 'next/link';
import useSWR from "swr";
import { Tango, zTangos } from "./type";

type Props = {
  initialState: Tango[];
}
const fetcher = (url: string) => fetch(url).then(async (res) => {
  const data = await res.json();
  const phrases = zTangos.parse(data);
  return phrases;
});

const TangoList: React.FC<Props> = ({ initialState }) => {
  // 2. クライアントサイドでのデータ取得
  const { data } = useSWR('/api/phrase', fetcher, { suspense: true, fallbackData: initialState })
  return (
    <div>
      {data.map(tango => <TangoItem key={tango.tango_id} item={tango} />)}
    </div>
  )
}

type TangoProps = {
  item: Tango;
}

const TangoItem: React.FC<TangoProps> = ({ item }) => {
  return (
    <div>
      { /* ノート編集ページは未実装のため一覧ページに遷移 */ }
      <Link href={`/phrases`}>
      </Link>
      { /* ノート詳細ページは未実装のため一覧ページに遷移 */ }
      <Link href={`/phrases`} prefetch={false}>
        <h3>{item.phrase}</h3>
      </Link>
      <p>{item.meaning}</p>
    </div>
  );
};

export default TangoList;