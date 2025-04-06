import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, tag, review, price, lesson, student, page, thumb } = body;

    // Validate required fields
    if (!title || !tag || !thumb) {
      return NextResponse.json(
        { error: "Title, tag, and thumb are required" },
        { status: 400 }
      );
    }

    const newVideo = await prisma.latestVideo.create({
      data: {
        title,
        tag,
        review,
        price,
        lesson,
        student,
        page,
        thumb,
      },
    });

    return NextResponse.json({ message: "Video added", data: newVideo });

  } catch (err) {
    console.error("Error adding video:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
