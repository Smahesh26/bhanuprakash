import nodemailer from "nodemailer";

// Allow swapping to a non-SMTP transport (e.g., console/json) when SMTP is rate-limited
const transportMode = process.env.MAIL_TRANSPORT ?? "smtp";

const transporter =
  transportMode === "log"
    ? nodemailer.createTransport({ jsonTransport: true })
    : nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      });

export async function sendOtpEmail(email: string, otp: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <p>Hello,</p>
          <p>Your OTP code is: <strong style="font-size: 20px;">${otp}</strong></p>
          <p>This code is valid for 15 minutes.</p>
          <p>Thank you.......</p>
        </div>
      `,
    });

    // jsonTransport has no messageId, so guard access
    if (info.messageId) {
      console.log(`📧 OTP ${otp} sent to ${email} (messageId: ${info.messageId})`);
    } else {
      console.log(`📧 OTP ${otp} prepared for ${email} (log transport)`);
    }
  } catch (err: any) {
    console.error("❌ Failed to send email:", err);
    throw new Error("Failed to send OTP email");
  }
}
