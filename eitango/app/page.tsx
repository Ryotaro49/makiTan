import { Button, Stack, TextField, Typography } from "@mui/material";
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href="/phrases" >
        <Button variant="outlined" size="large" >単語一覧</Button>
      </Link>
      <Link href="/test" >
        <Button variant="outlined" size="large" >テスト画面</Button>
      </Link>
    </main>
  );
}