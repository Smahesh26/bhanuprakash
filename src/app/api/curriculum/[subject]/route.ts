import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: Promise<{ subject: string }> }) {
  const { subject } = await context.params;
  try {
    const item = await prisma.curriculum.findFirst({
      where: { subject: { equals: subject, mode: "insensitive" } },
    });
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}