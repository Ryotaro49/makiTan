import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Image from "next/image";

export default function HeroSection() {
  return (
    <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              component="h1"
              variant="h2"
              color="text.primary"
              gutterBottom
            >
              シンプルな
            </Typography>
            <Typography
              component="h1"
              variant="h2"
              color="text.primary"
              gutterBottom
              sx={{ color: "primary.main" }}
            >
              単語学習アプリ
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              makiTan は、単語を簡単に登録しテストできる Web アプリです。
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/signup"
            >
              無料で始める
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Image
              src="/photos/makitan_image.png"
              alt="単語学習イメージ"
              width={600}
              height={400}
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
