"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function OtpModalWrapper({
  email,
  onVerifySuccess,
  onClose,
}: {
  email: string;
  onVerifySuccess: () => void;
  onClose?: () => void;
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    if (!otp) return toast.error("Enter the OTP");

    setLoading(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        toast.success("OTP verified!");
        onVerifySuccess();
      } else {
        const data = await res.json();
        toast.error(data.error || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-full max-w-sm shadow-lg relative">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            aria-label="Close"
            type="button"
          >
            ×
          </button>
        )}
        <h3 className="text-lg font-semibold mb-2">Enter OTP</h3>
        <p className="text-sm mb-3">
          OTP sent to: <strong>{email}</strong>
        </p>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <button
          onClick={verifyOtp}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
