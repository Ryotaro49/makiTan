import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "your_jwt_secret"; // 環境変数から読み込み

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.user_id }, secret, {
      expiresIn: "1h",
    });

    // 送信する確認メールの内容を作成
    // const confirmationEmail = {
    //   to: email,
    //   subject: "メールアドレスの確認",
    //   html: `以下のリンクをクリックしてメールアドレスを確認してください：<a href="https://yourapp.com/confirm/${user.user_id}?token=${token}">メールアドレスを確認する</a>`,
    // };

    // // 確認メールを送信
    // await sendConfirmationEmail(confirmationEmail);

    // return NextResponse.json(
    //   { message: "ユーザーが作成されました。確認メールが送信されました。" },
    //   { status: 201 },
    // );

    return NextResponse.json({ token }, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// emailService.js

// export async function sendConfirmationEmail(emailData: any) {
//   // ここでは実際にメールを送信する代わりに、コンソールにメール内容を出力します
//   console.log("Sending email:", emailData);
// }
