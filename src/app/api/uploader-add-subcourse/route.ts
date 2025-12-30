import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // mainCourseId is required to link sub-course
    if (!data.mainCourseId) {
      return NextResponse.json({ success: false, error: "mainCourseId is required" }, { status: 400 });
    }
    const subCourse = await prisma.course.create({
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
        thumb: data.thumb,
        instructors: data.instructors,
        price: data.price ? parseFloat(data.price) : undefined,
        videoUrl: data.videoUrl,
        // Add a relation to main course if your schema supports it
        // mainCourseId: data.mainCourseId,
      },
    });
    return NextResponse.json({ success: true, subCourse });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
