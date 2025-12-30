"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const PricingArea = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      id: "monthly",
      name: "Monthly Plan",
      price: "$29",
      priceId: "price_monthly", // Replace with your actual Stripe Price ID
      duration: "/month",
      features: [
        "Access to all video lectures",
        "Download PDF materials",
        "Advanced MCQ with explanations",
        "Case study practice",
        "Email support",
        "Mobile app access"
      ],
      popular: false
    },
    {
      id: "quarterly",
      name: "Quarterly Plan",
      price: "$79",
      priceId: "price_quarterly", // Replace with your actual Stripe Price ID
      duration: "/3 months",
      features: [
        "Everything in Monthly",
        "Save $8 per month",
        "Priority email support",
        "Progress tracking",
        "Download access for all PDFs",
        "Case study materials"
      ],
      popular: true
    },
    {
      id: "yearly",
      name: "Yearly Plan",
      price: "$299",
      priceId: "price_yearly", // Replace with your actual Stripe Price ID
      duration: "/year",
      features: [
        "Everything in Quarterly",
        "Best value - Save $49",
        "1-on-1 doubt clearing sessions",
        "Mock exams & assessments",
        "Personalized study plan",
        "Certificate of completion",
        "24/7 priority support"
      ],
      popular: false
    }
  ];

  const handleBuyNow = async (plan: typeof plans[0]) => {
    // Check if user is logged in
    if (!session) {
      localStorage.setItem("selectedPlan", plan.id);
      router.push("/login?redirect=/pricing");
      return;
    }

    setLoading(plan.id);

    try {
      // Create Stripe checkout session
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: plan.priceId,
          plan: plan.id,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setLoading(null);
        return;
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to create checkout session. Please try again.");
      setLoading(null);
    }
  };

  return (
    <section className="pricing-area section-py-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section__title text-center mb-50">
              <span className="sub-title">Choose Your Plan</span>
              <h2 className="title bold">Select the Perfect Plan for Your Medical Journey</h2>
              <p className="mt-3">
                Get access to comprehensive MBBS study materials, video lectures, and practice tests. 
                Choose a plan that fits your needs.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {plans.map((plan) => (
            <div key={plan.id} className="col-lg-4 col-md-6 mb-4">
              <div 
                className={`pricing-card ${plan.popular ? 'popular-plan' : ''}`}
                style={{
                  border: plan.popular ? '2px solid #0d447a' : '1px solid #e0e0e0',
                  borderRadius: '12px',
                  padding: '30px',
                  background: '#fff',
                  boxShadow: plan.popular ? '0 10px 40px rgba(13,68,122,0.15)' : '0 4px 20px rgba(0,0,0,0.08)',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
              >
                {plan.popular && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #5dba47 0%, #4a9c38 100%)',
                      color: '#fff',
                      padding: '5px 20px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-center mb-3" style={{ color: '#0d447a', fontSize: '24px', fontWeight: '700' }}>
                  {plan.name}
                </h3>

                <div className="text-center mb-4">
                  <span style={{ fontSize: '42px', fontWeight: '800', color: '#0d447a' }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: '16px', color: '#666' }}>
                    {plan.duration}
                  </span>
                </div>

                <ul style={{ listStyle: 'none', padding: '0', marginBottom: '30px' }}>
                  {plan.features.map((feature, index) => (
                    <li 
                      key={index} 
                      style={{ 
                        padding: '10px 0',
                        borderBottom: '1px solid #f0f0f0',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <i 
                        className="fas fa-check-circle" 
                        style={{ 
                          color: '#5dba47', 
                          marginRight: '10px',
                          fontSize: '16px'
                        }}
                      />
                      <span style={{ color: '#555', fontSize: '14px' }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleBuyNow(plan)}
                  disabled={loading === plan.id}
                  className="btn w-100"
                  style={{
                    background: plan.popular 
                      ? 'linear-gradient(135deg, #0d447a 0%, #094a8f 100%)'
                      : '#f8f9fa',
                    color: plan.popular ? '#fff' : '#0d447a',
                    border: plan.popular ? 'none' : '1px solid #0d447a',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    cursor: loading === plan.id ? 'wait' : 'pointer',
                    opacity: loading === plan.id ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (loading !== plan.id) {
                      if (plan.popular) {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #5dba47 0%, #4a9c38 100%)';
                      } else {
                        e.currentTarget.style.background = '#0d447a';
                        e.currentTarget.style.color = '#fff';
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (loading !== plan.id) {
                      if (plan.popular) {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #0d447a 0%, #094a8f 100%)';
                      } else {
                        e.currentTarget.style.background = '#f8f9fa';
                        e.currentTarget.style.color = '#0d447a';
                      }
                    }
                  }}
                >
                  {loading === plan.id ? 'Processing...' : session ? 'Subscribe Now' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <p className="text-muted">
            Already have an account? <Link href="/login" style={{ color: '#0d447a', fontWeight: '600' }}>Login here</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingArea;
