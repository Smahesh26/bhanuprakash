"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import googleIcon from "@/assets/img/icons/google.svg";
import LoginForm from "@/forms/LoginForm";

const LoginArea = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const isNewUser = (session?.user as any)?.isNewUser;
      if (isNewUser) {
        router.replace("/registration");
      } else {
        router.replace("/student-dashboard");
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (status === "authenticated") return null;

  return (
    <section className="singUp-area section-py-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="singUp-wrap">
              <h2 className="title">Welcome back!</h2>
              <p>
                Hey there! Ready to log in? Just enter your username and password
                below and you&apos;ll be back in action in no time.
              </p>

              <div className="account__social">
                <button
                  type="button"
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: "/student-dashboard",
                      role: "student",
                    })
                  }
                  className="flex items-center justify-center gap-3 px-6 py-3 w-full border border-gray-300 rounded-md hover:bg-gray-100 transition"
                >
                  <Image src={googleIcon} alt="Google" width={20} height={20} />
                  <span className="text-sm font-medium text-gray-800">
                    Continue with Google
                  </span>
                </button>
              </div>

              <div className="account__divider">
                <span>or</span>
              </div>

              <LoginForm />

              <div className="account__switch">
                <p>
                  Don&apos;t have an account? <Link href="/registration">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginArea;
