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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const course = await prisma.course.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(course);
  } catch (err) {
    console.error("UPDATE COURSE ERROR:", err);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.course.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE COURSE ERROR:", err);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}