import request from "supertest";
import express from "express";
import { ViemSignatureService } from "../services/signature.service";
import { verifySignatureController } from "../controllers/verify-signature.controller";

describe("POST /verify-signature", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());

    const controller = verifySignatureController;

    app.post("/verify-signature", controller);
  });

  it("400 on bad payload", async () => {
    const res = await request(app)
      .post("/verify-signature")
      .send({ message: "", signature: "0x123" });

    expect(res.status).toBe(400);
  });

  it("422 on invalid signature", async () => {
    const res = await request(app)
      .post("/verify-signature")
      .send({ message: "hello", signature: "0x" + "11".repeat(65) });

    expect(res.status).toBe(422);
    expect(res.body.isValid).toBe(false);
  });

  it("200 on valid signature", async () => {
    const message = "Hello, Web3!";
    const signature =
      "0x0165c7fecb570b7a200d3b5556b90e0f4d4aa5dc19dc344f5c53fcab543fe149757db241daabfb240f4ef2a23c9af31b39eb473f453722949d7dd9b3d5088c3b1b" as `0x${string}`;
    const res = await request(app)
      .post("/verify-signature")
      .send({ message, signature });

    expect(res.status).toBe(200);
    expect(res.body.originalMessage).toBe(message);
    expect(typeof res.body.signer).toBe("string");
    expect(res.body.isValid).toBe(true);
  });
});
