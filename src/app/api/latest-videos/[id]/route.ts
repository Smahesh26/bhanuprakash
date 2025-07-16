import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// ✅ DELETE video
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) return NextResponse.json({ error: "Missing video ID" }, { status: 400 });

    const deleted = await prisma.latestVideo.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Video deleted", data: deleted });
  } catch (err) {
    console.error("Error deleting video:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

// ✅ PATCH video
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) return NextResponse.json({ error: "Missing video ID" }, { status: 400 });

    const body = await req.json();

    const updated = await prisma.latestVideo.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ message: "Video updated", data: updated });
  } catch (err) {
    console.error("Error updating video:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
