import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Link from 'next/link';

export default function Home() {
  return (
<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh' }}>
  <Grid container spacing={2} justifyContent="center">
      <Grid item textAlign="center">
        <Link href="/phrases">
          <Button variant="outlined" size="large" sx={{ width: '200px', height: '60px' }}>単語一覧</Button>
        </Link>
    </Grid>
    <Grid item textAlign="center">
        <Link href="/test">
          <Button variant="outlined" size="large" sx={{ width: '200px', height: '60px' }}>テスト画面</Button>
        </Link>
    </Grid>
  </Grid>
</Box>
  );
}