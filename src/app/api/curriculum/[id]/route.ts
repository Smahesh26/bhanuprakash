import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Fix: await params before using
    console.log("Deleting curriculum:", id);

    await prisma.curriculum.delete({
      where: { id },
    });

    console.log("Curriculum deleted successfully");

    return NextResponse.json({ message: "Curriculum deleted successfully" });
  } catch (error) {
    console.error("DELETE curriculum error:", error);
    return NextResponse.json(
      { error: "Failed to delete curriculum" },
      { status: 500 }
    );
  }
}