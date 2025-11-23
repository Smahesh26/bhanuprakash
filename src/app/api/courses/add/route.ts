import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.category || !body.description || !body.thumb || !body.instructors || !body.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const course = await prisma.course.create({
      data: {
        title: body.title,
        category: body.category,
        description: body.description,
        thumb: body.thumb,
        instructors: body.instructors,
        price: Number(body.price),
        videoUrl: body.videoUrl,
      },
    });
    return NextResponse.json(course);
  } catch (err) {
    console.error("UPLOAD COURSE ERROR:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}