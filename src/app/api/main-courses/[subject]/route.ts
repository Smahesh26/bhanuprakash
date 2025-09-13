import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all main courses by subject
export async function GET(
  req: Request,
  context: { params: Promise<{ subject: string }> }
) {
  const { subject } = await context.params;
  try {
    const items = await prisma.curriculum.findMany({
      where: { subject: { equals: subject, mode: "insensitive" } },
    });
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
