import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma"; // adjust path if needed

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      password,
      countryCode,
      phone,
      country,
      state,
      university,
      selectedPlan,
    } = body;

    // 1. Validate
    if (!fullName || !email || !phone || !country || !state || !university || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save user in DB with subscription fields
    const user = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        phone: `${countryCode}${phone}`,
        country,
        state,
        university,
        isVerified: true, // Set after OTP verification
        // ✅ NEW: Use Prisma schema subscription fields
        subscriptionPlan: selectedPlan || 'none',
        subscriptionStatus: 'PENDING',
        paymentStatus: 'PENDING',
        hasActiveSubscription: false
      },
    });

    return NextResponse.json({ success: true, message: "User registered successfully" });
  } catch (error: any) {
    console.error("Registration Error:", error.message || error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
