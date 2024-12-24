"use client";

import Loading from "@/components/Loading";
import TangoList from "@/components/parts/TangoList";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import useSWR from "swr";

export function PhrasesPage() {
  const {
    data: phrases,
    error,
    isLoading,
  } = useSWR("/api/phrases", (url) => fetch(url).then((res) => res.json()));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box px={isMobile ? 0 : 5} pt={isMobile ? 2 : 5}>
      <Box display={"flex"} justifyContent={"end"} mb={5}>
        {/* 3. Client ComponentsのSuspenseの使用 */}
        <Link href="/phrases/new">
          <Button variant="outlined" size="large">
            追加
          </Button>
        </Link>
      </Box>
      <TangoList initialState={phrases} />
    </Box>
  );
}
