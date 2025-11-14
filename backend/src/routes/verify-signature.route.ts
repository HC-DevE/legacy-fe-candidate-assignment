import { Router } from "express";
import { verifySignatureController } from "../controllers/verify-signature.controller";

export const router: Router = Router();
router.post("/verify-signature", verifySignatureController);