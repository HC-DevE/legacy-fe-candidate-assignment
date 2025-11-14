import { z } from "zod";

export const VerifyBody = z.object({
  message: z.string().min(1),
  signature: z.string().regex(/^0x[0-9a-fA-F]+$/),
});

export type VerifyBody = z.infer<typeof VerifyBody>;
