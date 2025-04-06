"use client"; // 👈 add this line at the top!

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import googleIcon from "@/assets/img/icons/google.svg"; // make sure this path is correct

import icon from "@/assets/img/icons/google.svg";
import LoginForm from "@/forms/LoginForm";

const LoginArea = () => {
  return (
    <section className="singUp-area section-py-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="singUp-wrap">
              <h2 className="title">Welcome back!</h2>
              <p>
                Hey there! Ready to log in? Just enter your username and password
                below and you&apos;ll be back in action in no time. Let&apos;s go!
              </p>

              <div className="account__social">
              <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/courses" })}
      className="flex items-center justify-center gap-3 px-6 py-3 w-full border border-gray-300 rounded-md hover:bg-gray-100 transition"
    >
      <Image src={googleIcon} alt="Google" width={20} height={20} />
      <span className="text-sm font-medium text-gray-800">Continue with Google</span>
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
