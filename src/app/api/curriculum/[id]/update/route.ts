import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PUT(
  req: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { subject, chapters } = body;

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

    const updated = await prisma.curriculum.update({
      where: { id }, // use Number(id) if id is Int in your schema
      data: { subject, chapters: chaptersWithExplanation },
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update curriculum" }, { status: 500 });
  }
}

// Example request body
// {
//   "subject": "New Subject",
//   "chapters": [ /* ...updated chapters array... */ ]
// }