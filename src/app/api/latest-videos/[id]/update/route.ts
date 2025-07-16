import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, tag, review, price, lesson, student, thumb, youtubeUrl } = body;

    const updated = await prisma.latestVideo.update({
      where: { id: context.params.id },
      data: {
        title,
        tag,
        review,
        price: parseFloat(price),
        lesson: parseInt(lesson), // <-- convert to int
        student: parseInt(student),
        thumb,
        youtubeUrl, // <-- update YouTube URL
      },
    });

    return NextResponse.json({ message: "Video updated", data: updated });
  } catch (err: any) {
    console.error("Update error:", err.message || err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}