"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  continueWithGoogle,
  continueWithOutlook,
  continueWithFacebook,
} from "@/lib/auth_functions";

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await continueWithGoogle();
      router.push("/dashboard/onboarding");
    } catch (error) {
      setError("Error al iniciar sesión con Google: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOutlookLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await continueWithOutlook();
      router.push("/dashboard/onboarding");
    } catch (error) {
      setError("Error al iniciar sesión con Outlook: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await continueWithFacebook();
      router.push("/dashboard/onboarding");
    } catch (error) {
      setError("Error al iniciar sesión con Facebook: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Ingresa a tu cuenta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Abre las puertas para un nuevo futuro
        </p>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="grid gap-6">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continuar con Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          onClick={handleOutlookLogin}
          disabled={true}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 24 24"
            fill="#0078D4"
          >
            <path d="M11.55 21H3v-8.29h8.55V21zm9.45 0h-8.55v-8.29H21V21zm-9.45-9.28H3V3h8.55v8.72zm9.45 0h-8.55V3H21v8.72z" />
          </svg>
          Continuar con Outlook
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          onClick={handleFacebookLogin}
          disabled={true}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              fill="#1877F2"
            />
          </svg>
          Continuar con Facebook
        </Button>
      </div>
    </div>
  );
}
