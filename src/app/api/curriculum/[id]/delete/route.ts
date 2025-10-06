import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function DELETE(
  _req: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.curriculum.delete({ where: { id } }); // or Number(id) if id is Int
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete curriculum" }, { status: 500 });
  }
}