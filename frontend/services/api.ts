import { VerifySignatureInput, VerificationResult } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  async verifySignature(
    data: VerifySignatureInput
  ): Promise<VerificationResult> {
    try {
      
      const response = await fetch(`${API_URL}/verify-signature`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new ApiError(
          response.status,
          error.message || "Failed to verify signature"
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Network error. Please check your connection.");
    }
  },
};
