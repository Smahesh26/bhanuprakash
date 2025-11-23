"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import OtpModalWrapper from "@/components/modals/OtpModalWrapper";
import RegistrationForm, { FormData } from "@/components/forms/RegistrationForm";
import { toast } from "react-toastify";

function RegistrationContent() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [registrationData, setRegistrationData] = useState<FormData | null>(null);
  const [otpSentSuccess, setOtpSentSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const isVerified = (session?.user as any)?.isVerified;

  useEffect(() => {
    if (status === "authenticated" && isVerified) {
      router.replace("/student-dashboard");
    }
  }, [status, isVerified, router]);

  useEffect(() => {
    const planFromUrl = searchParams?.get('plan');
    const planFromStorage = typeof window !== 'undefined' ? localStorage.getItem('selectedPlan') : null;
    
    setSelectedPlan(planFromUrl || planFromStorage);
  }, [searchParams]);

  const sendOtp = async (email: string) => {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setOtpSentSuccess(true);
      toast.success("OTP sent to your email!");
      setEmailForOtp(email);
      setShowOtpModal(true);
    } else {
      setOtpSentSuccess(false);
      const data = await res.json();
      toast.error(data.error || "Failed to send OTP");
    }
  };

  const handleOtpSentFromForm = async (data: FormData) => {
    setRegistrationData(data);
    await sendOtp(data.email);
  };

  const handleOtpVerifySuccess = async () => {
    if (!registrationData) return;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    });

    if (res.ok) {
      const data = await res.json();
      toast.success("Registration successful!");
      await update();
      
      // ✅ Redirect based on subscription status
      if (data.hasPendingSubscription) {
        router.replace("/student-dashboard/purchase");
      } else {
        router.replace("/courses");
      }
    } else {
      const data = await res.json();
      toast.error(data.error || "Registration failed");
    }
  };

  return (
    <>
      <section className="singUp-area section-py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="singUp-wrap">
                <h2 className="title">Create Your Account</h2>
                
                {selectedPlan && (
                  <div 
                    className="alert mb-3" 
                    style={{
                      background: 'linear-gradient(135deg, #0d447a 0%, #094a8f 100%)',
                      color: '#fff',
                      borderRadius: '8px',
                      padding: '12px 20px',
                      textAlign: 'center',
                      fontWeight: '600'
                    }}
                  >
                    Selected Plan: <strong style={{ textTransform: 'uppercase' }}>{selectedPlan}</strong> 🎯
                  </div>
                )}
                
                <p>Register below to get started.</p>

                {otpSentSuccess && (
                  <div style={{
                    background: "#d4edda",
                    color: "#155724",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    textAlign: "center"
                  }}>
                    OTP sent successfully!
                  </div>
                )}

                <RegistrationForm onOtpSent={handleOtpSentFromForm} />

                <div className="account__switch mt-4 text-center">
                  <p>
                    Already have an account? <Link href="/login">Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showOtpModal && emailForOtp && (
        <OtpModalWrapper
          email={emailForOtp}
          onVerifySuccess={handleOtpVerifySuccess}
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </>
  );
}

export default function RegistrationArea() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <RegistrationContent />
    </Suspense>
  );
}
