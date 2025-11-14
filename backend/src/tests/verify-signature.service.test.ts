import { recoverMessageAddress, isAddress, walletActions } from "viem";
import { ViemSignatureService } from "../services/signature.service";

jest.mock("viem", () => ({
  recoverMessageAddress: jest.fn(),
  isAddress: jest.fn(),
  signMessage: jest.fn(),
}));

describe("ViemSignatureService", () => {
  let service: ViemSignatureService;
  const mockRecoverMessageAddress =
    recoverMessageAddress as jest.MockedFunction<typeof recoverMessageAddress>;
  const mockIsAddress = isAddress as jest.MockedFunction<typeof isAddress>;

  beforeEach(() => {
    service = new ViemSignatureService();
    jest.clearAllMocks();
  });

  const messageToSign = "Hello, Web3!";
  const signer = "0x1234567890123456789012345678901234567890";

  const validSignature = "0xabcdef1234567890" as `0x${string}`;
  const invalidSignature = "0xinvalidsignature" as `0x${string}`;

  describe("verify", () => {
    it("should verify a valid signature successfully", async () => {
      
      const mockSigner = signer;
      const input = {
        message: messageToSign,
        signature: validSignature,
      };

      mockRecoverMessageAddress.mockResolvedValue(mockSigner as `0x${string}`);
      mockIsAddress.mockReturnValue(true);

      
      const result = await service.verify(input);

      
      expect(result).toEqual({
        isValid: true,
        signer: mockSigner,
        originalMessage: input.message,
      });
      expect(mockRecoverMessageAddress).toHaveBeenCalledWith({
        message: input.message,
        signature: input.signature,
      });
      expect(mockIsAddress).toHaveBeenCalledWith(mockSigner);
    });

    it("should return invalid for an invalid address", async () => {
      
      const mockInvalidSigner = "invalid-address";
      const input = {
        message: messageToSign,
        signature: invalidSignature,
      };

      mockRecoverMessageAddress.mockResolvedValue(
        mockInvalidSigner as `0x${string}`
      );
      mockIsAddress.mockReturnValue(false);

      
      const result = await service.verify(input);

      
      expect(result).toEqual({
        isValid: false,
        signer: mockInvalidSigner,
        originalMessage: input.message,
      });
    });

    it("should handle recovery errors gracefully", async () => {
      
      const input = {
        message: messageToSign,
        signature: "0xinvalidsignature" as `0x${string}`,
      };

      mockRecoverMessageAddress.mockRejectedValue(
        new Error("Invalid signature format")
      );

      await expect(service.verify(input)).rejects.toThrow(
        "Invalid signature format"
      );
    });

    it("should verify signature with special characters in message", async () => {
      
      const mockSigner = "0x1234567890123456789012345678901234567890";
      const input = {
        message: "Special chars: !@#$%^&*()",
        signature: "0xabcdef1234567890" as `0x${string}`,
      };

      mockRecoverMessageAddress.mockResolvedValue(mockSigner as `0x${string}`);
      mockIsAddress.mockReturnValue(true);

      const result = await service.verify(input);

      expect(result.isValid).toBe(true);
      expect(result.originalMessage).toBe(input.message);
    });

    it("should verify signature with empty message", async () => {
      const mockSigner = "0x1234567890123456789012345678901234567890";
      const input = {
        message: "",
        signature: "0xabcdef1234567890" as `0x${string}`,
      };

      mockRecoverMessageAddress.mockResolvedValue(mockSigner as `0x${string}`);
      mockIsAddress.mockReturnValue(true);

      const result = await service.verify(input);

      expect(result.isValid).toBe(true);
      expect(result.originalMessage).toBe("");
    });

    it("should verify signature with long message", async () => {
      
      const mockSigner = "0x1234567890123456789012345678901234567890";
      const longMessage = "A".repeat(1000);
      const input = {
        message: longMessage,
        signature: "0xabcdef1234567890" as `0x${string}`,
      };

      mockRecoverMessageAddress.mockResolvedValue(mockSigner as `0x${string}`);
      mockIsAddress.mockReturnValue(true);

      const result = await service.verify(input);

      expect(result.isValid).toBe(true);
      expect(result.originalMessage).toBe(longMessage);
    });
  });
});