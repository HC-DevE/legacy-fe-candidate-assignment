"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuthStore } from "@/store/auth.store";

export default function HomePage() {
  const router = useRouter();
  const { user, primaryWallet } = useDynamicContext();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (user && primaryWallet) {
      setAuth(primaryWallet.address, user?.email);
      router.push("/dashboard");
    }
  }, [user, primaryWallet, router, setAuth]);
  
  return (
    <main className="relative">
      <LoginForm />
    </main>
  );
}
