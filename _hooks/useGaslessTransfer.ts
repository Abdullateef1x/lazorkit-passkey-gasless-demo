// frontend/apps/web/_hooks/useGaslessTransfer.ts
"use client";

/**
 * This hook runs on the client because:
 * - LazorKit wallet state is browser-based
 * - Passkey authentication requires WebAuthn APIs
 * - Transactions must be signed in the user's session
 */

import { useWallet } from "@lazorkit/wallet";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

/**
 * useGaslessTransfer
 * ------------------------------------------------------------------
 * A reusable hook that performs **gasless SOL transfers** using
 * LazorKit's smart wallet infrastructure.
 *
 * Key concepts demonstrated:
 * - Smart wallet–based transactions (no private keys exposed)
 * - Passkey-authenticated signing
 * - Gasless execution (fees paid in USDC instead of SOL)
 *
 * This hook abstracts away low-level Solana transaction logic
 * so UI components can trigger transfers with a single function call.
 */
export const useGaslessTransfer = () => {
  /**
   * LazorKit wallet hook provides:
   * - signAndSendTransaction → submits transactions via smart wallet
   * - smartWalletPubkey → public key of the user's smart wallet
   *
   * The smart wallet is controlled via passkeys, not seed phrases.
   */
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();

  /**
   * transfer
   * --------------------------------------------------------------
   * Executes a gasless SOL transfer to a recipient address.
   *
   * @param recipient - Destination public key (base58 string)
   * @param lamports  - Amount to send (default: 0.1 SOL)
   *
   * @returns Transaction signature once confirmed
   */
  const transfer = async (
    recipient: string,
    lamports: number = 0.1 * LAMPORTS_PER_SOL
  ) => {
    /**
     * Guard clauses to ensure the wallet is connected
     * and a valid recipient is provided.
     */
    if (!smartWalletPubkey) {
      throw new Error("Wallet not connected.");
    }

    if (!recipient) {
      throw new Error("Recipient not provided.");
    }

    /**
     * Convert recipient string into a Solana PublicKey.
     * trim() is used to avoid common copy/paste whitespace issues.
     */
    const destination = new PublicKey(recipient.trim());

    /**
     * Create a standard SOL transfer instruction.
     * Even though this is a normal SystemProgram instruction,
     * LazorKit will execute it via the smart wallet.
     */
    const instruction = SystemProgram.transfer({
      fromPubkey: smartWalletPubkey,
      toPubkey: destination,
      lamports,
    });

    /**
     * signAndSendTransaction:
     * - Signs the transaction using passkey authentication
     * - Executes it via LazorKit smart wallet
     * - Pays network fees using USDC (gasless UX)
     *
     * No SOL balance is required for fees.
     */
    const signature = await signAndSendTransaction({
      instructions: [instruction],
      transactionOptions: {
        feeToken: "USDC", // Enables gasless execution
      },
    });

    /**
     * Return the confirmed transaction signature
     * so the UI can display or link to a Solana explorer.
     */
    return signature;
  };

  /**
   * Expose the transfer function to UI components.
   * Additional gasless actions can be added here later.
   */
  return { transfer };
};
