import { Button, Stack, TextField, Typography } from "@mui/material";
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href="/" >
        <Button variant="outlined" size="large" >テスト開始</Button>
      </Link>
    </main>
  );
}