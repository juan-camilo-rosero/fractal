"use client";
import { LoginForm } from "@/components/sections/auth/login-form";
import { useAuth } from "@/lib/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/header/Header";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (user && !loading) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);
  
  if (loading) {
    return (
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <Skeleton className="h-8 w-48 bg-third-300" />
                <Skeleton className="h-4 w-64 bg-third-300" />
              </div>
             
              <div className="grid gap-6">
                <Skeleton className="h-10 w-full bg-third-300" />
                <Skeleton className="h-10 w-full bg-third-300" />
                <Skeleton className="h-10 w-full bg-third-300" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <Header/>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://images.pexels.com/photos/3337501/pexels-photo-3337501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}