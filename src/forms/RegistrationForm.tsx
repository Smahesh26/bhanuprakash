"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnArrow from "@/svg/BtnArrow";
import { useRouter } from "next/navigation";

interface FormData {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  university: string;
  password: string;
  cpassword: string;
}

const schema = yup.object({
  fname: yup.string().required(),
  lname: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  university: yup.string().required(),
  password: yup.string().min(6).required(),
  cpassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required(),
});

const RegistrationForm = () => {
  const router = useRouter();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userData, setUserData] = useState<FormData | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleOtpVerify = async () => {
    if (otpInput !== generatedOtp) {
      toast.error("Invalid OTP");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Registration successful!");
        setShowOtpModal(false);
        reset();
        setTimeout(() => router.push("/courses"), 1500);
      } else {
        toast.error(result.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();

      if (res.ok) {
        setGeneratedOtp(result.otp); // Store OTP
        setUserData(data);
        setShowOtpModal(true);
        toast.info("OTP sent to your email");
      } else {
        toast.error(result.error || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending OTP");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="account__form">
        {["fname", "lname", "email", "phone", "country", "state", "city", "university", "password", "cpassword"].map((field, index) => (
          <div key={index} className="form-grp">
            <label>{field.replace(/^\w/, l => l.toUpperCase()).replace("cpassword", "Confirm Password")}</label>
            <input
              type={field.includes("password") ? "password" : "text"}
              {...register(field as keyof FormData)}
              placeholder={field}
            />
            <p className="form_error">{errors[field as keyof FormData]?.message}</p>
          </div>
        ))}
        <button type="submit" className="btn btn-two arrow-btn">
          Sign Up <BtnArrow />
        </button>
      </form>

      {showOtpModal && (
        <div className="otp-backdrop">
          <div className="otp-modal">
            <h2>Enter OTP</h2>
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="Enter OTP"
            />
            <div className="buttons">
              <button onClick={() => setShowOtpModal(false)}>Cancel</button>
              <button onClick={handleOtpVerify}>Verify</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .otp-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          z-index: 9999;
          align-items: center;
          justify-content: center;
        }

        .otp-modal {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .otp-modal input {
          width: 100%;
          padding: 0.75rem;
          margin: 1rem 0;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .otp-modal .buttons {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        .otp-modal button {
          padding: 0.5rem 1.2rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .otp-modal button:first-child {
          background: #ccc;
        }

        .otp-modal button:last-child {
          background: #0070f3;
          color: white;
        }
      `}</style>
    </>
  );
};

export default RegistrationForm;
