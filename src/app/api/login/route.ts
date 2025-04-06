import { NextResponse } from "next/server";
import { sendOtpEmail } from "../../../../lib/mailer";
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send email using nodemailer
    await sendOtpEmail(email, otp);

    return NextResponse.json({ message: "OTP sent successfully", otp });
  } catch (error: any) {
    console.error("OTP Error:", error.message || error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
