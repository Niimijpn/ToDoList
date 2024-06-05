import { NextResponse } from "next/server";
import prisma from "@/lib/utils";

// 一覧を取得する
export async function GET() {
  const posts = await prisma.post.findMany();

  return NextResponse.json(posts);
}
