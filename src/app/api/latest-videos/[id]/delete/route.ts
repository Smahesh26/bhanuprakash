import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function DELETE(
  _req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.latestVideo.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (err: any) {
    console.error("Delete error:", err.message || err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
