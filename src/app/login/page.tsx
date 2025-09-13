"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Wrapper from "@/layouts/Wrapper";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      // Store session (could use cookies/localStorage or NextAuth session)
      localStorage.setItem("student-auth", "1");
      router.push("/");
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <Wrapper>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
        <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 2px 16px #0001", minWidth: 340 }}>
          <h2 style={{ color: "#4F46E5", marginBottom: 24 }}>Student Login</h2>
          <div style={{ marginBottom: 16 }}>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #E0E7FF" }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #E0E7FF" }} />
          </div>
          {error && <div style={{ color: "#e74c3c", marginBottom: 12 }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ background: "#4F46E5", color: "#fff", padding: "10px 24px", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", width: "100%" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default StudentLogin;