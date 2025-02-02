import { zUpsertPhrase } from "@/app/(loggedin)/phrases/type";
import { prisma } from "@/globals/db";
import { listItemTextClasses } from "@mui/material";
import { tango } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY ?? "";

// 1. 動的レンダリングを強制する
export const dynamic = "force-dynamic";

// ユーザーIDをトークンからデコードするヘルパー関数
function getUserIdFromToken(req: NextRequest): number | null {
  const token = req.cookies.get("token");
  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token.value, SECRET_KEY);
    return parseInt(decoded.userId, 10);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  const unPassedOnlyChecked = req.headers.get("unpassedonlychecked");
  const questionscount = req.headers.get("questionscount");
  const category = req.headers.get("category");

  const filterOptions: { where: any; take?: number } = { where: {} };

  filterOptions.where = { user_id: userId };

  if (unPassedOnlyChecked == "true") {
    filterOptions.where.is_passed = false;
  }

  if (questionscount) {
    filterOptions.take = Number(questionscount);
  }

  if (category) {
    const categoryArray = category.split(",").map((cat) => cat.trim());
    filterOptions.where.category = { in: categoryArray };
  }

  const phrases = await prisma.tango.findMany(filterOptions);
  return NextResponse.json(phrases);
}

// 新規登録するAPI
export async function POST(req: NextRequest) {
  const userId = getUserIdFromToken(req);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const data = await req.json();
  const parsedData = zUpsertPhrase.parse(data);
  const phrase = await prisma.tango.create({
    data: {
      phrase: parsedData.phrase,
      meaning: parsedData.meaning,
      user_id: userId,
      category: parsedData.category,
      registration_date: new Date(),
      updated_at: new Date(),
      is_passed: false,
    },
  });
  return new NextResponse(`${phrase.tango_id}`, { status: 201 });
}
