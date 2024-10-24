import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// この関数はすべてのリクエストで実行されます
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // トークンをCookieから取得

  // トークンがない場合は /login にリダイレクト
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // トークンがあればリクエストを続行
  return NextResponse.next();
}

// ミドルウェアを実行するパスを指定
export const config = {
  matcher: "/", // トップページに対して実行
};
