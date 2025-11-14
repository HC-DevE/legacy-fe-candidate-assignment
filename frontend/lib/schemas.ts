import { z } from "zod";

export const loginSchema = z.object({ email: z.email() });

export const messageSchema = z.object({ message: z.string().min(1) });

export type LoginInput = z.infer<typeof loginSchema>;

export type MessageInput = z.infer<typeof messageSchema>;
