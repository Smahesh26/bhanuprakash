"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const planDetails = {
  basic: {
    name: "Basic Plan",
    price: "₹2,999",
    features: [
      "Access to all video lectures",
      "View-only PDF materials",
      "Basic MCQ practice",
      "Email support",
      "Mobile app access"
    ]
  },
  standard: {
    name: "Standard Plan", 
    price: "₹4,999",
    features: [
      "Everything in Basic",
      "Download PDF materials",
      "Advanced MCQ with explanations",
      "Case study practice",
      "Priority email support",
      "Progress tracking"
    ]
  },
  premium: {
    name: "Premium Plan",
    price: "₹7,999", 
    features: [
      "Everything in Standard",
      "1-on-1 doubt clearing sessions",
      "Mock exams & assessments",
      "Personalized study plan",
      "Certificate of completion",
      "24/7 priority support",
      "Lifetime access to materials"
    ]
  }
};

type SessionUser = {
  email?: string;
  subscriptionPlan?: string;
  // add other custom fields if needed
};

export default function PurchaseConfirmation() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const user = session?.user as SessionUser | undefined;
    const plan = localStorage.getItem("selectedPlan") || user?.subscriptionPlan || null;
    setSelectedPlan(plan);
  }, [session]);

  const handleProceedToPayment = async () => {
    setProcessing(true);
    const user = session?.user as SessionUser | undefined;
    
    // TODO: Implement payment gateway (Razorpay/Stripe)
    // For now, simulate payment
    setTimeout(async () => {
      // Simulate updating subscription status in backend
      await fetch("/api/dummy-payment-success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          plan: selectedPlan
        })
      });

      // Update session and redirect
      await update();
      localStorage.removeItem("selectedPlan");
      router.replace("/student-dashboard");
    }, 2000);
  };

  if (!selectedPlan) return <div>Loading...</div>;

  // ✅ Check for valid plan
  const plan = planDetails[selectedPlan as keyof typeof planDetails];
  if (!plan) {
    return (
      <div className="text-center py-20">
        <h4>Invalid plan selected. Please go back and choose a valid plan.</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => router.push("/pricing")}
        >
          Go to Pricing
        </button>
      </div>
    );
  }

  return (
    <section className="section-py-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 p-4" style={{ borderRadius: '12px' }}>
              <h3 className="text-center mb-4" style={{ color: '#0d447a' }}>
                Confirm Your Purchase
              </h3>
              
              <div className="text-center mb-4">
                <h4 style={{ color: '#0d447a', fontWeight: '700' }}>{plan.name}</h4>
                <h2 style={{ color: '#5dba47', fontWeight: '800', fontSize: '48px' }}>
                  {plan.price}
                </h2>
                <p className="text-muted">per month</p>
              </div>

              <ul className="list-unstyled mb-4">
                {plan.features.map((feature, idx) => (
                  <li 
                    key={idx} 
                    className="mb-2"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <i 
                      className="fas fa-check-circle" 
                      style={{ color: '#5dba47', marginRight: '10px', fontSize: '16px' }}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleProceedToPayment}
                disabled={processing}
                className="btn w-100"
                style={{
                  background: 'linear-gradient(135deg, #0d447a 0%, #094a8f 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '16px'
                }}
              >
                {processing ? 'Processing...' : 'Proceed to Payment'}
              </button>

              <p className="text-center text-muted mt-3 small">
                🔒 Secure payment powered by Razorpay
              </p>

              <button
                onClick={() => router.push('/student-dashboard')}
                className="btn btn-link w-100 mt-2"
                style={{ color: '#666' }}
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
