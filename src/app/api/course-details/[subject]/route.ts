import { NextRequest, NextResponse } from "next/server";
import prisma from "lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subject: string }> }
) {
  const { subject } = await params; // Fix: await params before using

  if (!subject) {
    return NextResponse.json({ error: "No subject provided" }, { status: 400 });
  }

  try {
    const curriculum = await prisma.curriculum.findFirst({
      where: { subject },
    });
    if (!curriculum) {
      return NextResponse.json({ error: "Curriculum not found" }, { status: 404 });
    }
    return NextResponse.json(curriculum);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch curriculum" }, { status: 500 });
  }
}