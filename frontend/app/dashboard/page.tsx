"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MessageSigner } from "@/components/message/MessageSigner";
import { MessageHistory } from "@/components/message/MessageHistory";
import { CheckCircle, Loader, LogOut, Zap } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { MainBackground } from "@/components/background/MainBackground";

export default function DashboardPage() {
  const router = useRouter();
  const { primaryWallet, user, handleLogOut } = useDynamicContext();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (primaryWallet?.address) {
      setAuth(primaryWallet.address);
    }
  }, [user, primaryWallet, router, setAuth]);

  const handleSignOut = async () => {
    await handleLogOut();
    clearAuth();
    router.push("/");
  };

  if (!user || !primaryWallet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Logo className="w-16 h-16 animate-pulse rounded-xl" />
          <div className="animate-spin rounded-full h-8 w-8">
            <Loader className="w-8 h-8 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <MainBackground />

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10 rounded-xl" />
              <div>
                <h1 className="text-xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Web3 Message Signer & Verifier
                </h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            <MessageSigner />
          </div>

          <div className="space-y-6">
            <MessageHistory />
          </div>
        </div>

        <div className="text-center space-y-3 py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Powered by Blockchain Technology
            </span>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-8 pb-4">
          <div className="glass-card border border-primary/20 p-6 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">
                Secure & Decentralized
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              All signatures are cryptographically secure and verified on the
              Ethereum blockchain. Your private keys remain in your control at
              all times.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
