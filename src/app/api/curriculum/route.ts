import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, chapters } = body;

    // Add validation
    if (!subject || !chapters) {
      return NextResponse.json(
        { error: "Subject and chapters are required" },
        { status: 400 }
      );
    }

    const created = await prisma.curriculum.create({
      data: { subject, chapters },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("Curriculum creation error:", err);
    return NextResponse.json(
      { error: "Failed to create curriculum" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const curriculums = await prisma.curriculum.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(curriculums);
  } catch (err) {
    console.error("Curriculum fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch curriculums" },
      { status: 500 }
    );
  }
}