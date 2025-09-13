import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.mainCourse.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const created = await prisma.mainCourse.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        thumb: body.thumb,
        isFeatured: body.isFeatured,
        isFree: body.isFree,
        price: body.price,
        courseIds: (body.courseIds || []).join(","), // expects array from client
        description: body.description,
        rating: body.rating,
        uploadedBy: body.uploadedBy,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}