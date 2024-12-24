"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import AccountMenu from "@/components/parts/AccountMenu";
import { usePathname } from "next/navigation";

export default function ButtonAppBar() {
  const { isLoggedIn, email, signOut } = useAuth();
  const pathname = usePathname(); // 現在のパスを取得

  const getPageTitle = () => {
    if (pathname === "/phrases") return "単語一覧";
    if (pathname === "/test/config") return "テスト設定";
    if (pathname === "/test") return "テスト";
    if (pathname === "/phrases/new") return "単語追加";
    return ""; // デフォルト: 空
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              href={"/"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              makiTan
            </Link>
            {getPageTitle() && (
              <Typography
                variant="subtitle1"
                component="span"
                sx={{ ml: 2, color: "inherit" }}
              >
                {getPageTitle()}
              </Typography>
            )}
          </Typography>

          {isLoggedIn ? (
            <Box>
              <AccountMenu />
            </Box>
          ) : (
            <Link href={"/login"}>
              <Button color="inherit" sx={{ color: "white" }}>
                ログイン
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
