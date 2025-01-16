import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Noto_Sans_JP } from "next/font/google";
import Header from "./Header";
import { CookiesProvider } from "next-client-cookies/server";
import { CssBaseline } from "@mui/material";
import ThemeWrapper from "@/components/pages/layout/ThemeWrapper";

// 1. フォントの読み込み
const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title: "makiTan",
  description: "makiTan - シンプルな単語学習 Web アプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9904912777438772" />
      </head>
      <body className={NotoSansJP.className}>
        <CssBaseline />
        <CookiesProvider>
          <ThemeWrapper>{children}</ThemeWrapper>
        </CookiesProvider>
      </body>
    </html>
  );
}
