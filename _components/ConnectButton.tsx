"use client";
// frontend/apps/web/_components/ConnectButton.tsx

/**
 * This component runs on the client because:
 * - LazorKit relies on browser APIs (WebAuthn / Passkeys)
 * - Wallet connection state is client-side only
 */

import { useWallet } from "@lazorkit/wallet";

/**
 * ConnectButton
 * ------------------------------------------------------------------
 * A reusable UI component that handles connecting and disconnecting
 * a LazorKit smart wallet using passkey-based authentication.
 *
 * This component demonstrates:
 * - How to initiate LazorKit wallet connection
 * - How to handle connection state (connected / connecting)
 * - How to safely disconnect a smart wallet session
 *
 * ⚠️ IMPORTANT:
 * LazorKit uses WebAuthn-backed passkeys (hardware or platform-based).
 * A registered LazorKit passkey is required to fully complete
 * the connection flow in production.
 */
export function ConnectButton() {
  /**
   * useWallet() is the primary LazorKit hook for wallet state.
   *
   * It provides:
   * - connect(): triggers passkey-based wallet connection
   * - disconnect(): ends the current wallet session
   * - isConnected: boolean indicating wallet connection status
   * - isConnecting: boolean for pending connection state
   * - wallet: the connected smart wallet metadata (if available)
   */
  const { connect, disconnect, isConnected, isConnecting, wallet } =
    useWallet();

  /**
   * If the user is already connected and a wallet exists,
   * render a Disconnect button.
   *
   * We show a shortened version of the smart wallet address
   * for UX clarity without exposing the full address.
   */
  if (isConnected && wallet) {
    return (
      <button
        /**
         * Disconnects the LazorKit smart wallet session.
         * This does NOT delete the passkey — it only clears
         * the active connection in the app.
         */
        onClick={() => disconnect()}
        className="bg-red-600 text-white p-2 rounded hover:bg-red-700 hover:scale-105 transition-all duration-150"
      >
        {/* Display a shortened smart wallet address */}
        Disconnect <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">{wallet.smartWallet.slice(0, 6)}...</span>
      </button>
    );
  }

  /**
   * Default state:
   * Render a Connect button when no wallet is connected.
   *
   * The button is disabled while the connection is in progress
   * to prevent duplicate passkey prompts.
   */
  return (
    <button
      /**
       * Initiates the LazorKit passkey-based wallet connection flow.
       * This will trigger the browser's WebAuthn prompt
       * (hardware key, biometric, or platform authenticator).
       */
      onClick={() => connect()}
      disabled={isConnecting}
      className="bg-green-600 text-white p-2 rounded hover:bg-green-700 hover:scale-105 transition-all duration-300 ease-in-out 
 cursor-pointer disabled:opacity-50"
    >
      {/* UX feedback while waiting for passkey confirmation */}
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
