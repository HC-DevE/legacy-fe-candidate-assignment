import { Wallet } from "@dynamic-labs/sdk-react-core";
import { z } from "zod";

// Zod Schemas
export const signMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(1000, "Message too long"),
});

export const verifySignatureSchema = z.object({
  message: z.string(),
  signature: z.string(),
});

// Types
export type SignMessageInput = z.infer<typeof signMessageSchema>;
export type VerifySignatureInput = z.infer<typeof verifySignatureSchema>;

export interface SignedMessage {
  id: string;
  message: string;
  signature: string;
  timestamp: number;
  address: string;
}

export interface VerificationResult {
  isValid: boolean;
  signer: string;
  originalMessage: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  address: string | null;
  primaryWallet: Wallet | null;
}