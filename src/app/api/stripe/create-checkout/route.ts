import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId, plan } = await req.json();

    // Get Stripe config from database
    const config = await prisma.stripeConfig.findFirst({
      where: { isActive: true }
    });

    if (!config?.secretKey) {
      return NextResponse.json(
        { error: "Stripe not configured. Please contact admin." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(config.secretKey, {
      apiVersion: "2025-12-15.clover",
    });

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email!,
      line_items: [
        {
          price: priceId, // Stripe Price ID (e.g., price_1234...)
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/student-dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        plan: plan,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
