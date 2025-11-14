"use client";

import { useState } from "react";
import {
  useConnectWithOtp,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Wallet,
  Shield,
  Sparkles,
  Lock,
  CheckCircle2,
  ArrowRight,
  Loader,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { MainBackground } from "../background/MainBackground";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const { setShowAuthFlow } = useDynamicContext();
  const { connectWithEmail, verifyOneTimePassword } = useConnectWithOtp();
  const router = useRouter();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email required", {
        description: "Please enter your email address",
      });
      return;
    }

    setIsLoading(true);
    await connectWithEmail(email);
    setIsLoading(false);
    setShowOtp(true);

    toast.success("Code sent!", {
      description: "Check your email for the verification code",
    });
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!otp.trim() || otp.trim().length < 4) {
      toast.error("Please enter the 4-6 digit code");
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const result = await verifyOneTimePassword(otp.trim());

      if (result) {
        toast.success("Authenticated successfully!");
        setShowAuthFlow(false);
        router.push("/dashboard");
      } else {
        toast.error("Invalid code", {
          description: "Please check your code and try again",
        });
      }
    } catch (err) {
      console.error("OTP verify error", err);
      toast.error("Verification failed", {
        description: "Please try again",
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await connectWithEmail(email);
      toast.success("Code resent to your email");
    } catch (err) {
      console.error("Resend failed", err);
      toast.error("Failed to resend code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletConnect = () => {
    setShowAuthFlow(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      
      <MainBackground />

      {/* Hero Badge */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-0">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 shadow-lg">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold text-gray-700">
            Powered by Web3 Technology
          </span>
        </div>
      </div>

      <div className="w-full max-w-md">
        {/* Login Card */}
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-purple-400/10 to-indigo-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10" />

          <CardHeader className="space-y-4 text-center pb-8">
            <div className="mx-auto mb-4">
              <Logo className="w-16 h-16 mx-auto animate-float rounded-xl" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                {showOtp ? "Verify Your Email" : "Welcome to Message Signer & Verifier"}
              </CardTitle>
              <CardDescription className="text-base mt-2 text-gray-600">
                {showOtp
                  ? `We sent a code to ${email}`
                  : "Sign messages securely with Web3"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-0">
            {!showOtp ? (
              <>
                {/* Email Authentication */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-semibold text-sm"
                    >
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-11 h-12 bg-white border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-purple-500/25"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Sending code...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span>Continue with Email</span>
                      </>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-gray-500 font-semibold">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Wallet Connect */}
                <Button
                  onClick={handleWalletConnect}
                  variant="outline"
                  className="w-full h-12 border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 rounded-xl transition-all hover:scale-[1.02] group font-semibold"
                  disabled={isLoading}
                >
                  <Wallet className="w-5 h-5 group-hover:text-purple-600 transition-colors" />
                  <span>Connect Wallet</span>
                </Button>
              </>
            ) : (
              /* OTP Verification Form */
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="otp"
                    className="text-gray-700 font-semibold text-sm"
                  >
                    Verification Code
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="h-14 text-center text-2xl font-bold tracking-widest bg-white border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all"
                    disabled={isVerifyingOtp}
                    maxLength={6}
                  />
                  <p className="text-xs text-gray-500 text-center mt-2">
                    {"Didn't receive the code?"}{" "}
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isLoading}
                      className="text-purple-600 font-semibold hover:underline"
                    >
                      Resend
                    </button>
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-purple-500/25"
                  disabled={isVerifyingOtp || otp.length < 4}
                >
                  {isVerifyingOtp ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Continue</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowOtp(false);
                    setOtp("");
                  }}
                  className="w-full hover:bg-purple-50"
                >
                  Back to email
                </Button>
              </form>
            )}

            {/* Trust Indicators */}
            {!showOtp && (
              <div className="pt-6 space-y-3">
                {[
                  { icon: Shield, text: "Bank-grade encryption" },
                  { icon: Lock, text: "Your keys, your control" },
                  { icon: CheckCircle2, text: "Verified on-chain" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
