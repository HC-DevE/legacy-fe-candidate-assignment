export interface VerifySignatureRequest {
  message: string;
  signature: string;
}

export interface VerifySignatureResponse {
  isValid: boolean;
  signer: string | null;
  originalMessage: string;
  error?: string;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

export interface SignatureVerificationResult {
  isValid: boolean;
  recoveredAddress: string | null;
  error?: Error;
}