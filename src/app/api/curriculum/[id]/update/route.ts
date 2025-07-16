import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { subject, chapters } = body;
    const updated = await prisma.curriculum.update({
      where: { id: params.id },
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