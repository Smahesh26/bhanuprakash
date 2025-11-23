"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StudentDashboard from "@/dashboard/student-dashboard/student-dashboard";
import Wrapper from "@/layouts/Wrapper";

const Index = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      const user = session?.user as any;

      // Check if subscription is pending
      if (user?.subscriptionStatus === "PENDING" && !user?.hasActiveSubscription) {
        router.push("/student-dashboard/purchase");
        return;
      }

      // Check if subscription is not active
      if (!user?.hasActiveSubscription) {
        router.push("/pricing");
        return;
      }
    }
  }, [status, session, router]);

  // Show loading while checking
  if (status === "loading") {
    return (
      <div className="text-center py-20">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Only show dashboard if user has active subscription
  if (!(session?.user as any)?.hasActiveSubscription) {
    return null;
  }

  return (
    <Wrapper>
      <StudentDashboard />
    </Wrapper>
  );
};

export default Index;
