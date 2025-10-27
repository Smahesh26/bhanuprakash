import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Fix: await params before using
    const body = await request.json();
    const { subject, chapters } = body;

    console.log("Updating curriculum:", id, {
      subject,
      chaptersCount: chapters?.length,
    });

    // Ensure MCQs have explanation field
    const chaptersWithExplanation = chapters.map((chapter: any) => ({
      ...chapter,
      topics: chapter.topics.map((topic: any) => ({
        ...topic,
        mcqs: (topic.mcqs || []).map((mcq: any) => ({
          ...mcq,
          explanation: mcq.explanation ?? "",
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

    const curriculum = await prisma.curriculum.update({
      where: { id },
      data: {
        subject,
        chapters: JSON.stringify(chaptersWithExplanation),
      },
    });

    console.log("Curriculum updated successfully");

    return NextResponse.json({
      id: curriculum.id,
      subject: curriculum.subject,
      message: "Curriculum updated successfully",
    });
  } catch (error) {
    console.error("PUT curriculum error:", error);
    return NextResponse.json(
      { error: "Failed to update curriculum" },
      { status: 500 }
    );
  }
}

// Example request body
// {
//   "subject": "New Subject",
//   "chapters": [ /* ...updated chapters array... */ ]
// }