import { recoverMessageAddress, isAddress, walletActions } from 'viem'

export interface ISignatureService {
  verify(input: { message: string; signature: `0x${string}` }): Promise<{ isValid: boolean; signer: string; originalMessage: string }>
}


// manual validation with EIP‑191 (message)
export class ViemSignatureService implements ISignatureService {
  constructor(){}

  async verify(input: { message: string; signature: `0x${string}` }) {
    const signer = await recoverMessageAddress({ message: input.message, signature: input.signature })
    return { isValid: isAddress(signer), signer, originalMessage: input.message }
  }

}
