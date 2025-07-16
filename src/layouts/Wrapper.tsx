"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "@/components/common/ScrollToTop";
import AOS from "aos";

// Dynamically import MotionAnimation so it loads client-side only
const MotionAnimation = dynamic(() => import("@/hooks/MotionAnimation"), { ssr: false });

if (typeof window !== "undefined") {
  import("bootstrap/dist/js/bootstrap");
}

const Wrapper = ({ children }: any) => {
  useEffect(() => {
    import("@/utils/utils").then((mod) => mod.animationCreate());
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {children}
      <MotionAnimation />
      <ScrollToTop />
      <ToastContainer position="top-center" />
    </>
  );
};

export default Wrapper;
