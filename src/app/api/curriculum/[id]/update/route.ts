import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { subject, chapters } = body;
    const updated = await prisma.curriculum.update({
      where: { id },
      data: { subject, chapters },
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update curriculum" }, { status: 500 });
  }
}

// Example request body
// {
//   "subject": "New Subject",
//   "chapters": [ /* ...updated chapters array... */ ]
// }