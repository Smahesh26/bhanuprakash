import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch all curriculums
export async function GET() {
  try {
    const curriculums = await prisma.curriculum.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(curriculums, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching curriculums:", error);
    return NextResponse.json(
      { error: "Failed to fetch curriculums" },
      { status: 500 }
    );
  }
}

// POST - Create new curriculum
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📥 Received curriculum data:", JSON.stringify(body, null, 2));

    const { subject, introVideoUrl, mcqs, chapters } = body;

    // Validation
    if (!subject || !subject.trim()) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    if (!chapters || !Array.isArray(chapters) || chapters.length === 0) {
      return NextResponse.json(
        { error: "At least one chapter is required" },
        { status: 400 }
      );
    }

    // Create curriculum with JSON fields (no need to stringify)
    const curriculum = await prisma.curriculum.create({
      data: {
        subject: subject.trim(),
        introVideoUrl: introVideoUrl || null,
        mcqs: (mcqs || []) as Prisma.InputJsonValue, // ✅ Cast to Prisma JSON type
        chapters: chapters as Prisma.InputJsonValue, // ✅ Cast to Prisma JSON type
      },
    });

    console.log("✅ Curriculum created successfully:", curriculum.id);
    return NextResponse.json(curriculum, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating curriculum:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create curriculum" },
      { status: 500 }
    );
  }
}