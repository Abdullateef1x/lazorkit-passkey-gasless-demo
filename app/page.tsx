"use client";
// frontend/apps/web/app/page.tsx

import { ConnectButton } from "../_components/ConnectButton";
import { TransferButton } from "../_components/TransferButton";

/**
 * Homepage for Lazorkit-passkey-gasless-demo
 * -----------------------------------------
 * Demonstrates:
 * 1. Connect wallet with LazorkitProvider
 * 2. Perform a gasless USDC transfer on Devnet
 */
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <h1 className="text-3xl font-bold">Lazorkit Passkey + Gasless Demo</h1>
      <p className="text-gray-600 text-center max-w-md">
        Connect your Lazorkit smart wallet and try a gasless USDC transfer on Solana Devnet.
      </p>
      <ConnectButton />
      <TransferButton />
    </main>
  );
}
