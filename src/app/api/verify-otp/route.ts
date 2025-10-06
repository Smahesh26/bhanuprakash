import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const record = await prisma.oTP.findFirst({
      where: {
        email,
        code: otp,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // Optionally, delete OTP after successful verification
    await prisma.oTP.delete({ where: { id: record.id } });

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error: any) {
    console.error("OTP Verify Error:", error.message || error);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}
