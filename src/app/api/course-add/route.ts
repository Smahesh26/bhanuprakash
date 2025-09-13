import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.curriculum.findMany();
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, chapters } = body;

    // Example validation
    if (!subject || !chapters) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const created = await prisma.curriculum.create({
      data: { subject, chapters },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}