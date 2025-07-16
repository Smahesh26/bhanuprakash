import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.latestVideo.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (err: any) {
    console.error("Delete error:", err.message || err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
