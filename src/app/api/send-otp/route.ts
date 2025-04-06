import { NextResponse } from "next/server";
import { sendOtpEmail } from "../../../../lib/mailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP in session or DB if needed
  await sendOtpEmail(email, otp);

  return NextResponse.json({ message: "OTP sent", otp }); // Don't send OTP in production!
}
