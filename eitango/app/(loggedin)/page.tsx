import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function TopPage() {
  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3" textAlign="center" sx={{ marginTop: 20 }}>
            makiTan
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "25vh",
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item textAlign="center">
              <Link href="/phrases">
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ width: "200px", height: "60px" }}
                >
                  単語一覧
                </Button>
              </Link>
            </Grid>
            <Grid item textAlign="center">
              <Link href="/test/config">
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ width: "200px", height: "60px" }}
                >
                  テスト画面
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
