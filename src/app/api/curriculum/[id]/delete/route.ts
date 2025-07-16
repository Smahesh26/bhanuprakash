import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.curriculum.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete curriculum" }, { status: 500 });
  }
}