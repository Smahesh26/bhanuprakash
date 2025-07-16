import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function GET() {
  try {
    const students = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
