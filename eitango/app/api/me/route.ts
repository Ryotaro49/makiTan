import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "@/globals/db";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY ?? "";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // トークンをデコードしてユーザー情報を取得
    const decoded: any = jwt.verify(token, SECRET_KEY);

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // トークンからユーザーIDを使用してユーザー情報を取得
    // ここではPrismaを使用してユーザーのメールアドレスを取得します
    const user = await prisma.user.findUnique({
      where: { user_id: decoded.userId },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ email: user.email });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
