import { zUpsertPhrase } from "@/app/phrases/type";
import { prisma } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

// 1. 動的レンダリングを強制する
export const dynamic = "force-dynamic";

// 2. ノート一覧を取得するAPI
export async function GET() {
  // 3. DBからノート一覧を取得
  const phrases = await prisma.tango.findMany();
  return NextResponse.json(phrases);
}

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
      is_passed: 0,
    },
  });
  return new NextResponse(`${phrase.tango_id}`, { status: 201 });
}
