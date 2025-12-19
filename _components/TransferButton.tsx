"use client";
// frontend/apps/web/_components/TransferButton.tsx

/**
 * This is a client component because:
 * - Gasless transactions require wallet interaction
 * - LazorKit SDK depends on browser APIs and session state
 */

import { useState } from "react";
import { useGaslessTransfer } from "../_hooks/useGaslessTransfer";

/**
 * TransferButton
 * ------------------------------------------------------------------
 * A UI component that demonstrates how to perform a **gasless SOL transfer**
 * using LazorKit's smart wallet infrastructure.
 *
 * Key concepts demonstrated:
 * - Gasless transactions (fees paid in USDC, not SOL)
 * - Smart wallet execution via LazorKit SDK
 * - Abstracted transaction logic through a reusable hook
 *
 * This example sends **0.1 SOL on Devnet** to a user-specified recipient.
 * The user does NOT need SOL for fees — LazorKit handles fee sponsorship.
 */
export function TransferButton() {
  /**
   * useGaslessTransfer is a custom hook that:
   * - Builds a Solana transfer transaction
   * - Wraps it with LazorKit's gasless execution logic
   * - Submits it via the connected smart wallet
   *
   * The hook intentionally hides low-level Solana SDK complexity
   * to keep the UI layer simple and reusable.
   */
  const { transfer } = useGaslessTransfer();

  /**
   * Recipient public key input (Devnet address).
   * Stored in local state and passed to the transfer function.
   */
  const [recipient, setRecipient] = useState("");

  /**
   * Loading state to prevent duplicate submissions
   * and provide visual feedback during transaction execution.
   */
  const [loading, setLoading] = useState(false);

    /** 
     * Status message to display feedback to the user.
     */
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);


  /**
   * handleTransfer
   * --------------------------------------------------------------
   * Executes the gasless transfer when the user clicks the button.
   *
   * Flow:
   * 1. Enable loading state
   * 2. Call the gasless transfer function
   * 3. Await transaction confirmation
   * 4. Display the transaction signature
   * 5. Handle errors gracefully
   */
  const handleTransfer = async () => {
    try {
      setLoading(true);

      /**
       * transfer(recipient):
       * - Creates a SOL transfer instruction
       * - Executes it via LazorKit smart wallet
       * - Pays network fees using USDC (gasless UX)
       *
       * Returns the confirmed transaction signature.
       */
      const signature = await transfer(recipient);

      setStatus({ type: "success", message: `Tx confirmed: ${signature}` });
      console.log("Transaction confirmed:", signature);
    } catch (error: any) {
      /**
       * Errors may occur due to:
       * - Invalid recipient address
       * - Wallet not connected
       * - User rejecting the passkey prompt
       * - Network / RPC failures
       */
      console.error("Transfer failed:", error);
      setStatus({ type: "error", message: error?.message || String(error) });
    } finally {
      /**
       * Always reset loading state to re-enable the UI
       * regardless of success or failure.
       */
      setLoading(false);
    }
  };

  return (
<div className="flex flex-col gap-2 p-2 bg-white/5 rounded-lg shadow-sm max-w-md w-full">
      {/* Recipient public key input (Devnet) */}
      <input
        type="text"
        placeholder="Enter recipient public key (Devnet)"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="border p-2 rounded focus:ring-2 focus:ring-green-400 transition"
      />

      {/* Gasless transfer trigger button */}
      <button
        /**
         * Disabled while the transaction is in progress
         * to avoid duplicate submissions.
         */
        onClick={handleTransfer}
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 hover:scale-105 transition-transform duration-150 cursor-pointer disabled:opacity-50 flex items-center justify-center"
      >
        {/* Dynamic label for better UX */}
        {loading ? "Sending..." : "Send 0.1 SOL (gasless USDC)"}
      </button>

            {/* Inline status message for better feedback */}
            {status && (
        <p className={`text-sm mt-1 ${status.type === "error" ? "text-red-500" : "text-green-500"}`}>
          {status.message}
        </p>
      )}

    </div>
  );
}
