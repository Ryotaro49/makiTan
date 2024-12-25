import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function Header() {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          makiTan
        </Typography>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="/login"
            sx={{ my: 1, mx: 1.5 }}
          >
            ログイン
          </Link>
        </nav>
        <Button
          href="/signup"
          variant="contained"
          color="primary"
          sx={{ my: 1, mx: 1.5 }}
        >
          登録
        </Button>
      </Toolbar>
    </AppBar>
  );
}
