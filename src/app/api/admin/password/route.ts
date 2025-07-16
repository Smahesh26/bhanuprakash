// filepath: src/app/api/admin/password/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function PUT(req: Request) {
  const { currentPassword, newPassword } = await req.json();
  const admin = await prisma.admin.findFirst();
  if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });

  // Check current password (plain text, for demo only)
  if (admin.password !== currentPassword) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
  }

  // Update password
  await prisma.admin.update({
    where: { id: admin.id },
    data: { password: newPassword },
  });

  return NextResponse.json({ success: true });
}