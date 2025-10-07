"use client";
import "../styles/index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./Providers"; // ✅ Import client-side wrapper
import FooterTwo from "@/layouts/footers/FooterTwo";
import Preloader from "@/components/Preloader";
import React, { useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      {loading && <Preloader />}
      {!loading && (
        <Providers>
          <main className="min-h-[calc(100vh-200px)]">
            {children}
          </main>
          <ToastContainer position="top-right" autoClose={3000} />
          <FooterTwo />
        </Providers>
      )}
    </AuthProvider>
  );
}
