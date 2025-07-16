import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id) return NextResponse.json({ error: "Missing video ID" }, { status: 400 });

    const updated = await prisma.latestVideo.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ message: "Video updated", data: updated });
  } catch (err) {
    console.error("Error updating video:", err);
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}