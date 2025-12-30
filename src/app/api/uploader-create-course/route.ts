import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // You may want to add authentication/authorization here
    const course = await prisma.course.create({
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
        thumb: data.thumb,
        instructors: data.instructors,
        price: data.price ? parseFloat(data.price) : undefined,
        videoUrl: data.videoUrl,
      },
    });
    return NextResponse.json({ success: true, course });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
