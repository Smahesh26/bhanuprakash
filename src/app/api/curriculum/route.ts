import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    // Ensure MCQs have explanation field
    const chaptersWithExplanation = chapters.map((chapter: any) => ({
      ...chapter,
      topics: chapter.topics.map((topic: any) => ({
        ...topic,
        mcqs: (topic.mcqs || []).map((mcq: any) => ({
          ...mcq,
          explanation: mcq.explanation ?? "", // default to empty string if not present
        })),
        subtopics: (topic.subtopics || []).map((sub: any) => ({
          ...sub,
          mcqs: (sub.mcqs || []).map((mcq: any) => ({
            ...mcq,
            explanation: mcq.explanation ?? "",
          })),
        })),
      })),
    }));

    const created = await prisma.curriculum.create({
      data: { subject, chapters: chaptersWithExplanation },
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
    console.log("Fetching all curriculums");

    const curriculums = await prisma.curriculum.findMany({
      select: {
        id: true,
        subject: true,
        chapters: true,
        createdAt: true, // Keep createdAt for ordering
        // Remove updatedAt to avoid the error
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`Found ${curriculums.length} curriculums`);

    return NextResponse.json(curriculums);
  } catch (error) {
    console.error("GET curriculum error:", error);
    return NextResponse.json(
      { error: "Failed to fetch curriculums" },
      { status: 500 }
    );
  }
}