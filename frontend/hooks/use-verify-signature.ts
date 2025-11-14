"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import { VerifySignatureInput } from "@/types";

export function useVerifySignature() {
  return useMutation({
    mutationFn: (data: VerifySignatureInput) => api.verifySignature(data),
  });
}
