import express from "express";
import cors from "cors";

import { router as verifyRouter } from "./routes/verify-signature.route";
import config from "./config/config";

export function createServer(): express.Application {
  const app = express();

  app
    // .use(cors({ origin: config.corsOrigin }))
    .use(cors({ origin: "*"}))
    .use(express.json({ limit: "64kb" }))
    .use(verifyRouter);

  app.get("/health", (_req, res) => res.json({ ok: true }));

  return app;
}
