import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Noto_Sans_JP } from "next/font/google";
import { CookiesProvider } from "next-client-cookies/server";
import Header from "../Header";

export default function LoggedinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <Header></Header>
      <CookiesProvider>{children}</CookiesProvider>
    </AppRouterCacheProvider>
  );
}
