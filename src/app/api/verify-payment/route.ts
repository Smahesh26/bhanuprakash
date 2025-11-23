import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { orderId, paymentId, signature, userId, planId } = await req.json();
    
    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (generatedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Update user subscription in database
    // await User.updateOne({ _id: userId }, {
    //   'subscription.status': 'active',
    //   'subscription.paymentStatus': 'completed',
    //   'subscription.paymentId': paymentId,
    //   'subscription.startDate': new Date(),
    //   'subscription.endDate': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    //   'hasActiveSubscription': true
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
