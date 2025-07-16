import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, chapters } = body;
    const created = await prisma.curriculum.create({
      data: { subject, chapters },
    });
    return NextResponse.json(created);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create curriculum" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const curriculums = await prisma.curriculum.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(curriculums);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch curriculums" }, { status: 500 });
  }
}