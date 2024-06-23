// pages/api/getUserId.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY ?? ""; // 環境変数からSECRET_KEYを取得し、デフォルト値として空文字列を設定

export async function GET(req: NextRequest) {
  try {
    // headersからクッキーを取得
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    // クッキーからトークンを取得
    const token = cookieHeader
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    // トークンを検証
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };

    // デコードされたトークンからuserIdを取得
    const userId = decoded.userId;

    return NextResponse.json({ userId });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
