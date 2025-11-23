import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

const planPrices = {
  basic: 2999,    // in cents ($29.99)
  standard: 4999, // in cents ($49.99)
  premium: 7999   // in cents ($79.99)
};

export async function POST(req: Request) {
  try {
    const { planId, userId } = await req.json();
    const amount = planPrices[planId as keyof typeof planPrices];

    if (!amount) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { userId, planId }
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount
    });
  } catch (error) {
    return NextResponse.json({ error: 'Stripe payment creation failed' }, { status: 500 });
  }
}
