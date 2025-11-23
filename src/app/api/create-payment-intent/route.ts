import { NextRequest, NextResponse } from "next/server";

// Dummy Stripe configuration for demo
const STRIPE_SECRET_KEY = "sk_test_dummy_key_for_demo";

export async function POST(request: NextRequest) {
  try {
    const { courseTitle, amount } = await request.json();

    // Simulate Stripe payment intent creation
    console.log("🔄 Creating payment intent for:", { courseTitle, amount });
    
    // In a real implementation, you would use:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount,
    //   currency: 'usd',
    //   metadata: { courseTitle }
    // });

    // For demo purposes, return a dummy response
    const dummyPaymentIntent = {
      id: `pi_dummy_${Date.now()}`,
      client_secret: `pi_dummy_${Date.now()}_secret_dummy`,
      amount: amount,
      currency: 'usd',
      status: 'requires_payment_method'
    };

    console.log("✅ Payment intent created (demo):", dummyPaymentIntent.id);

    return NextResponse.json({
      clientSecret: dummyPaymentIntent.client_secret,
      paymentIntentId: dummyPaymentIntent.id
    });

  } catch (error) {
    console.error("❌ Payment intent creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
