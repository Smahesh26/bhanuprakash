"use client";
import { useState } from "react";

const PricingPlans = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      id: "monthly",
      name: "Monthly Plan",
      price: "₹2,499",
      priceId: "price_monthly",
      duration: "/month",
      features: [
        "Access to all video lectures",
        "Download PDF materials",
        "MCQ practice with explanations",
        "Case study materials",
        "Email support",
        "Mobile app access"
      ],
      popular: false
    },
    {
      id: "quarterly",
      name: "Quarterly Plan",
      price: "₹6,999",
      priceId: "price_quarterly",
      duration: "/3 months",
      features: [
        "Everything in Monthly",
        "Save ₹500 per month",
        "Priority support",
        "Progress tracking",
        "Download all materials",
        "Case study practice"
      ],
      popular: true
    },
    {
      id: "yearly",
      name: "Yearly Plan",
      price: "₹24,999",
      priceId: "price_yearly",
      duration: "/year",
      features: [
        "Everything in Quarterly",
        "Best value - Save ₹5,000",
        "1-on-1 sessions",
        "Mock exams",
        "Personalized study plan",
        "Certificate of completion",
        "24/7 priority support"
      ],
      popular: false
    }
  ];

  const handleSubscribe = async (plan: typeof plans[0]) => {
    setLoading(plan.id);

    try {
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
    <>
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
                onClick={() => handleSubscribe(plan)}
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
                {loading === plan.id ? 'Processing...' : 'Subscribe Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 32,
        padding: 20,
        background: '#f7f8fa',
        borderRadius: 12,
        border: '1px solid #e3e6ed'
      }}>
        <p style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
          🔒 Secure payment powered by Stripe
        </p>
        <p style={{ fontSize: 13, color: '#888' }}>
          Cancel anytime • Money-back guarantee • No hidden fees
        </p>
      </div>
    </>
  );
};

export default PricingPlans;
