import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user || session.user.role !== "instructor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const config = await prisma.stripeConfig.findFirst({
      select: {
        publishableKey: true,
        secretKey: true,
        webhookSecret: true,
      }
    });

    return NextResponse.json(config || {});
  } catch (err) {
    console.error("Failed to fetch Stripe config:", err);
    return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user || session.user.role !== "instructor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { publishableKey, secretKey, webhookSecret } = body;

    if (!publishableKey || !secretKey) {
      return NextResponse.json(
        { error: "Publishable key and secret key are required" },
        { status: 400 }
      );
    }

    // Delete existing config and create new one (upsert)
    await prisma.stripeConfig.deleteMany({});
    
    const config = await prisma.stripeConfig.create({
      data: {
        publishableKey,
        secretKey,
        webhookSecret: webhookSecret || null,
      }
    });

    return NextResponse.json({ 
      success: true,
      publishableKey: config.publishableKey 
    });
  } catch (err) {
    console.error("Failed to save Stripe config:", err);
    return NextResponse.json({ error: "Failed to save config" }, { status: 500 });
  }
}
