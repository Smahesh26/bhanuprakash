import { NextResponse } from "next/server";
import { sendOtpEmail } from "../../../../lib/email";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Store OTP in DB
    await prisma.oTP.create({
      data: { email, code: otp, expiresAt },
    });

    await sendOtpEmail(email, otp);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("OTP Error:", error.message || error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
