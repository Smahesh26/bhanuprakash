import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    if (!id) return NextResponse.json({ error: "Missing video ID" }, { status: 400 });

    const updated = await prisma.latestVideo.update({
      where: { id }, // id is a string
      data: body,
    });

    return NextResponse.json({ message: "Video updated", data: updated });
  } catch (err) {
    console.error("Error updating video:", err);
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}