"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export function useAuth(redirectPath = null) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (redirectPath && currentUser) {
        router.push(redirectPath);
      }
    });

    return () => unsubscribe();
  }, [redirectPath, router]);

  return { user, loading };
}