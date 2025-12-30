import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    // Get Stripe config
    const config = await prisma.stripeConfig.findFirst({
      where: { isActive: true }
    });

    if (!config?.secretKey || !config.webhookSecret) {
      console.error("Stripe not properly configured");
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const stripe = new Stripe(config.secretKey, {
      apiVersion: "2025-12-15.clover",
    });

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        config.webhookSecret
      );
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Get the subscription
        const subscriptionId = session.subscription as string;
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan || "monthly";

        if (!userId) {
          console.error("No userId in session metadata");
          break;
        }

        // Calculate subscription dates
        const subscriptionStart = new Date((subscription as any).current_period_start * 1000);
        const subscriptionEnd = new Date((subscription as any).current_period_end * 1000);

        // Update user subscription in database
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionPlan: plan,
            subscriptionStart: subscriptionStart,
            subscriptionEnd: subscriptionEnd,
            hasActiveSubscription: true,
            subscriptionStatus: "ACTIVE",
            paymentStatus: "COMPLETED",
            paymentId: subscriptionId,
          },
        });

        console.log(`✅ Subscription activated for user ${userId}`);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Find user by subscription ID
        const user = await prisma.user.findFirst({
          where: { paymentId: subscription.id }
        });

        if (user) {
          const subscriptionEnd = new Date((subscription as any).current_period_end * 1000);
          const isActive = (subscription as any).status === "active";

          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionEnd: subscriptionEnd,
              hasActiveSubscription: isActive,
              subscriptionStatus: isActive ? "ACTIVE" : "CANCELLED",
            },
          });

          console.log(`✅ Subscription updated for user ${user.id}`);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Find user by subscription ID
        const user = await prisma.user.findFirst({
          where: { paymentId: subscription.id }
        });

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              hasActiveSubscription: false,
              subscriptionStatus: "CANCELLED",
            },
          });

          console.log(`❌ Subscription cancelled for user ${user.id}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: err.message || "Webhook handler failed" },
      { status: 500 }
    );
  }
}
