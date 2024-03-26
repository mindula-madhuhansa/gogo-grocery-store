"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInUser } from "@/utils/signinUser";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { setIsLogin } = useAuthStore();

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwt");
    if (jwtToken) {
      setIsLogin();
      router.push("/");
    }
  }, [setIsLogin, router]);

  const handleSignIn = () => {
    signInUser({ email, password })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("jwt", res.data.jwt);
        toast.success("Signed in Successful");

        router.push("/");
      })
      .catch((error) => {
        toast.error("Something went wrong. Try again.");
      });
  };

  return (
    <div className="flex items-baseline justify-center my-10 mx-10 md:mx-auto">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100/60 border border-gray-200 rounded-xl shadow-md">
        <Image src="/logo.png" alt="Logo" width={200} height={200} />
        <h2 className="font-bold text-2xl md:text-3xl mt-4">
          Sign In to Account
        </h2>
        <p className="text-gray-500 mt-2 text-center">
          Enter your Email and Password to Sign In
        </p>
        <div className="w-full flex flex-col gap-y-3 mt-7">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="johndoe@example.com"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button disabled={!email || !password} onClick={() => handleSignIn()}>
            Sign In
          </Button>
          <p className="text-xs text-right">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500">
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
