"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import googleIcon from "@/assets/img/icons/google.svg";
import OtpModalWrapper from "@/components/modals/OtpModalWrapper";
import RegistrationForm, { FormData } from "@/components/forms/RegistrationForm";
import { toast } from "react-toastify";

export default function RegistrationArea() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [otpSent, setOtpSent] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [registrationData, setRegistrationData] = useState<FormData | null>(null);
  const [otpSentSuccess, setOtpSentSuccess] = useState(false);

  const isVerified = (session?.user as any)?.isVerified;

  useEffect(() => {
    if (status === "authenticated" && isVerified) {
      router.replace("/student-dashboard");
    }
  }, [status, isVerified, router]);

  const handleGoogleLogin = async () => {
    const result = await signIn("google", {
      redirect: false,
      role: "student", // Pass role for student registration
    });

    if (!result?.error) {
      const updated = await update(); // Refresh session
      const email = (updated?.user as any)?.email;

      if (email && !otpSent) {
        await sendOtp(email);
      }
    } else {
      toast.error("Google sign-in failed");
    }
  };

  const sendOtp = async (email: string) => {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setOtpSentSuccess(true); // Show success alert
      toast.success("OTP sent to your email!");
      setEmailForOtp(email);
      setOtpSent(true);
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

  // Called when OTP is verified successfully
  const handleOtpVerifySuccess = async () => {
    if (!registrationData) return;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    });

    if (res.ok) {
      toast.success("Registration successful!");
      await update();
      router.replace("/courses"); // Redirect to courses after OTP verification
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
                <p>Register below to get started.</p>

                {/* Success alert for OTP sent */}
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

                <div className="account__social mb-4">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-3 px-6 py-3 w-full border border-gray-300 rounded-md hover:bg-gray-100 transition"
                  >
                    <Image src={googleIcon} alt="Google" width={20} height={20} />
                    <span className="text-sm font-medium text-gray-800">
                      Continue with Google
                    </span>
                  </button>
                </div>

                <div className="account__divider"><span>or</span></div>

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

      {/* OTP Modal */}
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
