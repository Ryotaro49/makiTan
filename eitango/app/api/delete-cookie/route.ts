"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const cookieStore = cookies();

  try {
    // クッキー名を指定して削除
    cookieStore.delete("token");

    return NextResponse.json({ message: "Cookie deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete cookie" },
      { status: 500 },
    );
  }
}
