"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/utils/registerUser";

const SignUpPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwt");
    if (jwtToken) {
      router.push("/");
    }
  }, [router]);

  const handleSignUp = () => {
    setLoader(true);
    registerUser({ username, email, password })
      .then((response) => {
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("jwt", response.data.jwt);
        toast.success("Account created successfully");

        setLoader(false);
        router.push("/");
      })
      .catch((error) => {
        setLoader(false);
        toast.error("Something went wrong. Try again.");
      });
  };

  return (
    <div className="flex items-baseline justify-center my-10 mx-10 md:mx-auto">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100/60 border border-gray-200 rounded-xl shadow-md">
        <Image src="/logo.png" alt="Logo" width={200} height={200} />
        <h2 className="font-bold text-2xl md:text-3xl mt-4">
          Create an Account
        </h2>
        <p className="text-gray-500 mt-2 text-center">
          Enter your Email and Password to create an account
        </p>
        <div className="w-full flex flex-col gap-y-3 mt-7">
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="johndoe@example.com"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            disabled={!username || !email || !password}
            onClick={() => handleSignUp()}
          >
            {loader ? (
              <Loader className="h-5 w-5 animate-spin text-white" />
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-xs text-right">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500">
              Click here to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
