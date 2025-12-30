"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./Providers";
import FooterTwo from "@/layouts/footers/FooterTwo";
import Preloader from "@/components/Preloader";
import React, { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      {!loading && (
        <Providers>
          <main className="min-h-[calc(100vh-200px)]">{children}</main>
          <ToastContainer position="top-right" autoClose={3000} />
          <FooterTwo />
        </Providers>
      )}
    </>
  );
}
