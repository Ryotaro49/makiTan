import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://github.com/Ryotaro49">
            Ryotaro Makita
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          <Link href="/terms" color="inherit" sx={{ px: 1 }}>
            利用規約
          </Link>
          <Link href="/privacy" color="inherit" sx={{ px: 1 }}>
            プライバシーポリシー
          </Link>
          <Link href="/contact" color="inherit" sx={{ px: 1 }}>
            お問い合わせ
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
