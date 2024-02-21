import { zUpsertPhrase } from "@/app/phrases/type";
import { prisma } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

// 単語のIDはパスパラメーター`[id]`で受け取る

// 単語を1件取得
export async function GET(_req: NextRequest, { params }: {params :{tango_id : number} }) {
  const phrase = await prisma.tango.findUnique({
    where: { tango_id: Number(params.tango_id) },
  });
  if (phrase === null) {
    return new NextResponse(null, { status: 404 })
  }
  return NextResponse.json(phrase)
}

// 単語を更新
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const parcedData = zUpsertPhrase.parse(data);
  const phrase = await prisma.tango.update({
    where: { tango_id: Number(params.id) },
    data: { phrase: parcedData.phrase, meaning: parcedData.meaning },
  });
  return new NextResponse(null, { status: 204 });
}
