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
  hasActiveSubscription?: boolean;
  subscriptionStatus?: string;
  subscriptionEnd?: string;
  // add other custom fields if needed
};

export default function StudentDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as SessionUser | undefined;

  // Step 4: Expiry Handling
  const isExpired = user?.subscriptionEnd && new Date(user.subscriptionEnd) < new Date();

  // Step 1: Banner
  const showBanner = user?.subscriptionPlan && user.subscriptionPlan !== "none";
  const bannerText = user?.hasActiveSubscription
    ? `✅ Active Plan: ${user.subscriptionPlan?.toUpperCase()}`
    : `⏳ Pending Payment: ${user?.subscriptionPlan?.toUpperCase()} Plan`;

  return (
    <div className="container py-5">
      {/* Step 1: Subscription Status Banner */}
      {showBanner && (
        <div
          className="alert mb-4"
          style={{
            background: user?.hasActiveSubscription
              ? "linear-gradient(135deg, #5dba47 0%, #4a9c38 100%)"
              : "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)",
            color: "#fff",
            borderRadius: "8px",
            padding: "15px",
            fontWeight: "600",
          }}
        >
          {bannerText}
        </div>
      )}

      {/* Step 4: Expiry Handling */}
      {isExpired && (
        <div className="alert alert-warning mt-3">
          Your subscription has expired. Please renew to continue access.
          <button
            className="btn btn-warning ms-3"
            onClick={() => router.push("/pricing")}
          >
            Renew Now
          </button>
        </div>
      )}

      {/* Step 2: Restrict Content Based on Subscription */}
      {user?.hasActiveSubscription ? (
        <div>
          {/* Step 3: Upgrade/Renewal Button */}
          <div className="mt-4 mb-4">
            <button
              className="btn btn-outline-success"
              onClick={() => router.push("/pricing")}
            >
              Upgrade/Renew Plan
            </button>
          </div>
          {/* Premium content, courses, etc. */}
          <h3>Welcome to your premium dashboard!</h3>
          <p>Here are your plan features:</p>
          <ul>
            {(planDetails[user.subscriptionPlan as keyof typeof planDetails]?.features || []).map(
              (feature, idx) => (
                <li key={idx}>{feature}</li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div>
          <h4>Your subscription is not active.</h4>
          <p>Please complete payment to access premium content.</p>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/student-dashboard/purchase")}
          >
            Complete Payment
          </button>
        </div>
      )}

      {/* Step 5: Admin/Reporting Placeholder */}
      {/* You would create a separate admin page for reporting. */}
    </div>
  );
}