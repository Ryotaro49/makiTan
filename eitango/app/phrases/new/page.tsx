import Loading from "@/components/Loading";
import NewPhrase from "@/components/parts/NewPhrase";
import { Button, Stack, TextField, Typography } from "@mui/material";
import ErrorBoundary from "next/dist/client/components/error-boundary";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Link href="/phrases">
          <Button variant="outlined" size="large">
            ← back
          </Button>
        </Link>
        <NewPhrase />
      </Suspense>
    </main>
  );
}
