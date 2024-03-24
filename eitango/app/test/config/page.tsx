import { apiUrl } from "@/constants/api";
import "server-only";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { zPhrases } from "../../phrases/type";
import Test from "@/components/parts/Test";
import TestConfig from "@/components/parts/TestConfig";

export default async function Page() {
  return (
    <main>
      <Link href="/">
        <Button variant="outlined" size="large">
          ← back
        </Button>
      </Link>
      <TestConfig />
    </main>
  );
}
