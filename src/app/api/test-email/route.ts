import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "your-email@gmail.com", // <- change to your receiving email
      subject: "✅ OTP Test Email",
      text: "This is a test email from your app.",
    });

    return NextResponse.json({ message: "✅ Email sent successfully!" });
  } catch (error: any) {
    console.error("Test email error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
