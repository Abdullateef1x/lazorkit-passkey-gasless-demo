"use client";

/**
 * Root layout must be client-side because:
 * - LazorkitProvider relies on browser APIs
 * - Wallet, passkeys, and transaction signing are client-only
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LazorkitProvider } from "@lazorkit/wallet";

/**
 * Load Geist fonts for clean UI typography
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * App metadata
 * Used by Next.js for SEO and browser tab info
 */
const metadata: Metadata = {
  title: "Lazorkit-passkey-gasless-demo",
  description:
    "A Solana Devnet demo integrating Lazorkit SDK with passkey wallets and gasless USDC transactions using Next.js and React.",
};

/**
 * Buffer polyfill
 * ----------------
 * Some Solana libraries rely on Node's Buffer.
 * This ensures compatibility in the browser environment.
 */
if (typeof window !== "undefined") {
  window.Buffer = window.Buffer || require("buffer").Buffer;
}

/**
 * Lazorkit configuration
 * ----------------------
 * RPC_URL:
 * - Solana Devnet endpoint
 *
 * PORTAL_URL:
 * - Lazorkit authentication & wallet portal
 *
 * PAYMASTER:
 * - Lazorkit service that sponsors gas fees
 * - Enables gasless transactions using USDC
 */
const CONFIG = {
  RPC_URL: process.env.NEXT_PUBLIC_RPC_URL!,
  PORTAL_URL: process.env.NEXT_PUBLIC_PORTAL_URL!,
  PAYMASTER: { paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL! },
};


/**
 * RootLayout
 * ----------
 * Wraps the entire application with LazorkitProvider
 * so all child components can:
 * - Access wallet state
 * - Connect via passkeys
 * - Send gasless transactions
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* LazorkitProvider makes wallet context available globally */}
        <LazorkitProvider
          rpcUrl={CONFIG.RPC_URL}
          portalUrl={CONFIG.PORTAL_URL}
          paymasterConfig={CONFIG.PAYMASTER}
        >
          {children}
        </LazorkitProvider>
      </body>
    </html>
  );
}
