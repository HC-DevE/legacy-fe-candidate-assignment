import type { Request, Response } from "express";

import { VerifyBody } from "../validators/verify-signature.dto";
import { ViemSignatureService } from "../services/signature.service";

export const verifySignatureController = async (
  req: Request,
  res: Response
) => {
  const parsed = VerifyBody.safeParse(req.body);

  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.message });

  const service = new ViemSignatureService();

  try {
    const result = await service.verify({
      message: parsed.data.message,
      signature: parsed.data.signature as `0x${string}`,
    });

    return res.json(result);
  } catch (e: any) {
    return res
      .status(422)
      .json({ isValid: false, error: e?.message ?? "Invalid signature" });
  }
};
