import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, tag, review, price, lesson, student, page, thumb, youtubeUrl } = body;

    // Validation
    if (!title || !tag || !review || price === undefined || lesson === undefined || student === undefined || !thumb) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newVideo = await prisma.latestVideo.create({
      data: {
        title,
        tag,
        review,
        price: typeof price === "string" ? parseFloat(price) : price,
        lesson: typeof lesson === "string" ? parseInt(lesson) : lesson,
        student: typeof student === "string" ? parseInt(student) : student,
        thumb,
        page: page || "home_7",
        youtubeUrl: youtubeUrl || null, // Save YouTube URL or null
      }
    });

    return NextResponse.json({ message: "Video added successfully", data: newVideo });

  } catch (err: any) {
    console.error("Error adding video:", err.message || err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
