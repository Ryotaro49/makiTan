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

export default function ButtonAppBar() {
  const { isLoggedIn, email, signOut } = useAuth();

  const handleSignOut = () => {
    // サインアウト処理
    signOut();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              href={"/"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Tango App
            </Link>
          </Typography>

          {isLoggedIn ? (
            <Box>
              <AccountMenu />
            </Box>
          ) : (
            <Link href={"/login"}>
              <Button color="inherit" sx={{ color: "white" }}>
                login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
