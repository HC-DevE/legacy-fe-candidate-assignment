"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Copy, User, Check, Zap, Shield } from "lucide-react";
import { truncateAddress } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";

export function DashboardHeader() {
  const { primaryWallet, user } = useDynamicContext();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (primaryWallet?.address) {
      await navigator.clipboard.writeText(primaryWallet.address);
      setCopied(true);
      toast.success("Address copied!", {
        description: "Wallet address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 shadow-2xl">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-50 via-indigo-50/50 to-blue-50/30" />
      <div className="absolute inset-0 bg-linear-to-tr from-purple-500/5 via-transparent to-blue-500/5" />

      {/* Blur Orbs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />

      {/* Shimmer Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          {/* Left: Wallet Info */}
          <div className="flex items-center gap-4">
            {/* Avatar with Status */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-indigo-500 p-0.5 animate-pulse-glow shadow-xl items-center justify-center flex">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
              </div>
              {/* Active Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-linear-to-br from-green-300 to-emerald-400 border-2 border-white flex items-center justify-center shadow-lg">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-2">
              {/* Title & Status Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Connected Wallet
                </h2>
                <span className="px-3 py-1 rounded-full bg-linear-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold border border-green-400/20 shadow-sm flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Active
                </span>
              </div>

              {/* User Email */}
              {user?.email && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 backdrop-blur-sm border border-blue-200/50 w-fit shadow-sm">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">
                    {user.email}
                  </span>
                </div>
              )}

              {/* Address with Copy */}
              {primaryWallet?.address && (
                <div className="flex items-center gap-2">
                  <code className="px-3 py-1.5 rounded-lg bg-linear-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-900 font-mono text-sm font-medium shadow-sm">
                    {truncateAddress(primaryWallet.address, 6)}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Network & Security Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Network Badge */}
            <div className="relative overflow-hidden px-4 py-2.5 rounded-xl bg-linear-to-br from-purple via-indigo-500 to-blue-500 shadow-lg">
              <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
              <div className="relative flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-sm" />
                <span className="text-sm font-bold text-white">Ethereum</span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="px-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm border border-green-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  Secured
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="mt-6 pt-4 border-t border-gray-200/50">
          <div className="flex items-center justify-around gap-4 flex-wrap">
            {/* Connection Info */}
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">Connected</span>
              </div>
              <div className="w-px h-3 bg-gray-300" />
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-500" />
                <span>Fast & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
