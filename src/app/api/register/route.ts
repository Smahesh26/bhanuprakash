import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma"; // adjust path if needed

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fname,
      lname,
      email,
      phone,
      country,
      state,
      city,
      university,
      password,
    } = body;

    // 1. Validate
    if (!fname || !lname || !email || !phone || !country || !state || !city || !university || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save user in DB
    const user = await prisma.user.create({
      data: {
        fname,
        lname,
        email,
        phone,
        country,
        state,
        city,
        university,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (error: any) {
    console.error("Registration Error:", error.message || error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
