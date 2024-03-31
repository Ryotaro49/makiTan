import { zUpsertPhrase } from "@/app/phrases/type";
import { prisma } from "@/globals/db";
import { listItemTextClasses } from "@mui/material";
import { tango } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// 1. 動的レンダリングを強制する
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const params = new URL(req.nextUrl).searchParams;
  const unPassedOnlyChecked = params.get("unPassedOnlyChecked");
  const selectedValue = params.get("selectedValue");

  const filterOptions = {};

  if (unPassedOnlyChecked !== "false") {
    Object.assign(filterOptions, {
      where: { is_passed: false },
    });
  }

  if (selectedValue) {
    Object.assign(filterOptions, {
      take: Number(selectedValue),
    });
  }

  const phrases = await prisma.tango.findMany(filterOptions);
  return NextResponse.json(phrases);
}

// 新規登録するAPI
export async function POST(req: NextRequest) {
  const data = await req.json();
  const parcedData = zUpsertPhrase.parse(data);
  const phrase = await prisma.tango.create({
    data: {
      phrase: parcedData.phrase,
      meaning: parcedData.meaning,
      user_id: parcedData.user_id,
      category: parcedData.category,
      registration_date: new Date(),
      updated_at: new Date(),
      is_passed: false,
    },
  });
  return new NextResponse(`${phrase.tango_id}`, { status: 201 });
}
