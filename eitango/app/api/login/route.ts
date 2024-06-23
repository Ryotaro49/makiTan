import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // トークンを生成するためにjsonwebtokenをインポート
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY ?? ""; // 環境変数からSECRET_KEYを取得し、デフォルト値として空文字列を設定

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "メールアドレスかパスワードが正しくありません" },
        { status: 401 },
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "メールアドレスかパスワードが正しくありません" },
        { status: 401 },
      );
    }

    // 認証成功 - トークンを生成してクッキーに保存
    const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, {
      expiresIn: "1h", // トークンの有効期限を1時間に設定
    });

    const response = NextResponse.json({
      userId: user.user_id,
      message: "Login successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1時間 (秒単位)
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
