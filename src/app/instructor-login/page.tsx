"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderSeven from "@/layouts/headers/HeaderSeven";
import Image from "next/image";
import googleIcon from "@/assets/img/icons/google.svg";
import { signIn } from "next-auth/react";

export default function InstructorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API call if needed, or use NextAuth credentials provider
    const res = await fetch("/api/instructor-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.replace("/instructor-dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/instructor-dashboard" });
  };

  return (
    <>
      <HeaderSeven />
      <section className="singUp-area section-py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="singUp-wrap">
                <h2 className="title">Instructor Login</h2>
                <p>
                  Enter your email and password to access your dashboard.
                </p>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-3 px-6 py-3 w-full border border-gray-300 rounded-md hover:bg-gray-100 transition mb-4"
                >
                  <Image src={googleIcon} alt="Google" width={20} height={20} />
                  <span className="text-sm font-medium text-gray-800">
                    Continue with Google
                  </span>
                </button>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control rounded-3"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control rounded-3"
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="alert alert-danger py-2">{error}</div>}
                  <button
                    type="submit"
                    className="btn w-100 fw-bold"
                    style={{
                      background: "linear-gradient(90deg,#a86b2e 60%,#f9a116 100%)",
                      color: "#fff",
                      borderRadius: "30px",
                      padding: "10px 0",
                      fontSize: 18,
                      boxShadow: "0 2px 12px #a86b2e33",
                    }}
                  >
                    Login
                  </button>
                </form>
                <div className="account__switch mt-4 text-center">
                  <p>
                    Don't have an account? <a href="/instructor-registration">Register</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}