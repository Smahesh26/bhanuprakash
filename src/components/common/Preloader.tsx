"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/img/bg/logo1.png";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setTimeout(() => setVisible(false), 700);
    if (typeof window === "undefined") return;
    if (document.readyState === "complete") {
      hide();
      return;
    }
    const onLoad = () => hide();
    window.addEventListener("load", onLoad);
    // safety timeout in case 'load' doesn't fire quickly
    const fallback = setTimeout(() => setVisible(false), 2000);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="preloader-overlay" role="status" aria-live="polite">
      <div className="preloader-box">
        <Image src={logo} alt="MedSchool logo" width={140} height={140} priority />
        <h2 className="preloader-title">Welcome to MedSchool</h2>
      </div>

      <style jsx>{`
        .preloader-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff; /* white background */
          z-index: 9999;
          animation: preloaderFade 1s ease forwards;
        }
        .preloader-box {
          text-align: center;
          color: #230908; /* normal site text color */
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          transform: translateY(0);
          animation: popIn 420ms ease;
          padding: 8px 18px;
          border-radius: 12px;
          /* subtle shadow so logo stands out on white bg */
          box-shadow: 0 12px 40px rgba(35, 9, 8, 0.06);
        }
        .preloader-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.2px;
        }
        @keyframes popIn {
          from { transform: translateY(-8px) scale(.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes preloaderFade {
          0% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; pointer-events: none; }
        }
        @media (max-width: 768px) {
          .preloader-title { font-size: 16px; }
        }
      `}</style>
    </div>
  );
}