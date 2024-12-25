import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { BookOpen, CheckCircle, Volume2 } from "lucide-react";

const features = [
  {
    name: "簡単単語登録",
    description: "学びたい単語を素早く簡単に登録できます。",
    icon: BookOpen,
  },
  {
    name: "カスタマイズ可能なテスト",
    description:
      "登録した単語からテストを作成できます。出題数や、覚えていない単語に絞って自由に設定できます。",
    icon: CheckCircle,
  },
  {
    name: "音声読み上げ機能",
    description: "単語の発音をブラウザの音声読み上げ機能で確認できます。",
    icon: Volume2,
  },
];

export default function FeaturesSection() {
  return (
    <Box sx={{ py: 4 }} id="features">
      <Container maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          効果的な単語学習をサポート
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          makiTan の主な機能をご紹介します。
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          シンプルな操作で、効率的に単語を覚えましょう。
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4, justifyContent: "center" }}>
          {features.map((feature) => (
            <Grid item key={feature.name} xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 64,
                    width: 64,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                  }}
                >
                  <feature.icon size={32} />
                </Box>
                <Typography variant="h6" align="center" gutterBottom>
                  {feature.name}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="text.secondary"
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
