"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnArrow from "@/svg/BtnArrow";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

// ✅ Validation schema
const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Login successful!", { position: "top-center" });
        reset();
        setTimeout(() => router.push("/courses"), 1500);
      } else {
        toast.error(result.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="account__form">
      <div className="form-grp">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <p className="form_error">{errors.email?.message}</p>
      </div>

      <div className="form-grp">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <p className="form_error">{errors.password?.message}</p>
      </div>

      <div className="account__check mb-3">
        <div className="account__check-remember">
          <input type="checkbox" className="form-check-input" id="remember" />
          <label htmlFor="remember" className="form-check-label">
            Remember me
          </label>
        </div>
        <div className="account__check-forgot">
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-two arrow-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : <>Sign In <BtnArrow /></>}
      </button>
    </form>
  );
};

export default LoginForm;
