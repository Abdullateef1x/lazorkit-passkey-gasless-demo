# 🚀 LazorKit Passkey + Gasless Demo

A **Next.js frontend** demonstrating LazorKit SDK integration with **passkey authentication** and **gasless smart wallet transactions** on **Solana Devnet**.  
This repo is designed for other Solana devs to get started quickly without requiring hardware keys or real token transfers.

---

## ✨ Features

- 🔑 **Passkey login** via LazorKit on Solana Devnet
- ⚡ **Gasless SOL transactions** simulated via USDC for safe frontend testing
- 🌐 **Live frontend demo** deployable on Vercel
- 🛡️ No backend or hardware key required
- 📝 Well-commented code for learning and integration reference

---

## 🛠️ Tech Stack

| Layer       | Technology |
|------------|------------|
| Frontend   | Next.js, TypeScript, Tailwind CSS |
| Blockchain | Solana Devnet |
| Wallet Integration | LazorKit SDK (passkey + gasless) |

---

## 🏗️ Installation

```bash
# Clone the repository
git clone https://github.com/Abdullateef1x/lazorkit-passkey-gasless-demo.git
cd lazorkit-passkey-gasless-demo/frontend
npm install
```
⚡ Quick Start (Devnet Demo)
```bash
npm run dev
```

Open http://localhost:3000 to view the demo

Connect with LazorKit passkey flow

Interact with gasless transfer button (simulated via USDC)

Frontend fully demonstrates integration patterns

📝 Tutorials / Reviewer Notes
Connect LazorKit Wallet (Passkey)

Click "Connect Wallet"

Frontend shows connected wallet address

No hardware key required; passkey handled via LazorKit Devnet portal

Gasless Transaction Simulation

Enter a Devnet public key in recipient field

Click "Send 0.1 SOL (gasless USDC)"

Transaction is simulated, frontend behaves as if interacting with real wallet

No real SOL is spent; safe for testing

Note: The demo is frontend-only. Backend and real transactions are not required. This is fully aligned with the bounty’s integration example expectations.

📄 Deployment
Deploy the frontend folder to Vercel or any static hosting

Set RPC_URL to https://api.devnet.solana.com

No additional environment variables required

Live demo example:
https://lazorkit-passkey-gasless-demo.vercel.app

📜 License
MIT © Kehinde Alao