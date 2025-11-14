"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PenLine, Send, Loader, Sparkles } from "lucide-react";
import { signMessageSchema, SignedMessage } from "@/types";
import { useMessageStore } from "@/store/message.store";
import { useVerifySignature } from "@/hooks/use-verify-signature";
import { toast } from "sonner";

export function MessageSigner() {
  const { primaryWallet } = useDynamicContext();
  const addMessage = useMessageStore((state) => state.addMessage);
  const [isSigningMessage, setIsSigningMessage] = useState(false);
  const verifyMutation = useVerifySignature();

  const form = useForm({
    defaultValues: {
      message: "",
    },
    onSubmit: async ({ value }) => {
      if (!primaryWallet) {
        toast.error("No wallet connected", {
          description: "Please connect your wallet first",
        });
        return;
      }

      setIsSigningMessage(true);

      try {
        const signature = await primaryWallet.signMessage(value.message);

        const signedMessage: SignedMessage = {
          id: crypto.randomUUID(),
          message: value.message,
          signature: signature!,
          timestamp: Date.now(),
          address: primaryWallet.address,
        };

        const verificationResult = await verifyMutation.mutateAsync({
          message: value.message,
          signature: signature!,
        });

        if (verificationResult.isValid) {
          addMessage(signedMessage);

          toast.success("Message signed successfully! ✅", {
            description: `Verified by: ${verificationResult.signer.slice(
              0,
              10
            )}...`,
          });

          form.reset();
        } else {
          throw new Error("Signature verification failed");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Signing error:", error);
        toast.error("Signing failed", {
          description: error.message || "Failed to sign message",
        });
      } finally {
        setIsSigningMessage(false);
      }
    },
  });

  return (
    <Card className="relative overflow-hidden border-0 shadow-2xl hover-lift">
      {/* todo: I commented the following background because did have time to do it properly for a good fit */}
      
      {/* Animated Gradient Background */}
      {/* <div className="absolute inset-0 bg-linear-to-br from-purple-50 via-indigo-50/50 to-blue-50/30" />
      <div className="absolute inset-0 bg-linear-to-tr from-purple-500/5 via-transparent to-blue-500/5" />       */}

      {/* Blur Orbs */}
      {/* <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} /> */}

      {/* Shimmer Effect */}
      {/* <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/40 to-transparent" />
      </div> */}

      {/* Content */}
      <div className="relative">
        <CardHeader className="space-y-3 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-indigo-500 p-0.5 shadow-lg animate-pulse-glow">
                  <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                    <PenLine className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Sign Message
                </CardTitle>
                <CardDescription className="text-sm mt-0.5">
                  Cryptographically sign your message
                </CardDescription>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-primary/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-gray-700">
                Secure
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field
              name="message"
              validators={{
                onChange: signMessageSchema.shape.message,
              }}
            >
              {(field) => (
                <div className="space-y-3">
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    Your Message
                    <span className="text-xs text-muted-foreground font-normal">
                      (Max 1000 characters)
                    </span>
                  </Label>
                  <div className="relative group">
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Type your message here... This message will be cryptographically signed with your wallet."
                      className="flex w-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 min-h-[140px] resize-none transition-all shadow-sm hover:shadow-md hover:border-primary/40 group-hover:bg-white"
                      disabled={isSigningMessage}
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <span
                        className={`text-xs font-medium transition-colors ${
                          field.state.value.length > 900
                            ? "text-orange-500"
                            : field.state.value.length > 0
                            ? "text-primary"
                            : "text-gray-400"
                        }`}
                      >
                        {field.state.value.length}/1000
                      </span>
                    </div>
                  </div>
                  {field.state.meta.errors &&
                  field.state.meta.errors.length > 0 ? (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <p className="text-sm text-red-600 font-medium">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
            </form.Field>

            <Button
              type="submit"
              className="w-full h-14 bg-linear-to-r from-purple via-indigo-500 to-blue-500 hover:from-purple/90 hover:via-indigo-500/90 hover:to-blue-500/90 text-white font-semibold text-base rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl shadow-primary/25"
              disabled={isSigningMessage || verifyMutation.isPending}
            >
              {isSigningMessage || verifyMutation.isPending ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Signing & Verifying...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Sign Message</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
