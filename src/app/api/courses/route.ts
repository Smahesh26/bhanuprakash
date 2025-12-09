import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(courses);
  } catch (err) {
    console.error("FETCH COURSES ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}