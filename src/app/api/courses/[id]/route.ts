import { NextResponse } from "next/server";
import prisma from "lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.id },
    });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (err) {
    console.error("FETCH COURSE ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}