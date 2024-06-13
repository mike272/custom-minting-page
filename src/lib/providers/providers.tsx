"use client";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Mint Sea",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [
    process.env.NEXT_PUBLIC_ENABLE_TESTNET === "true" ? sepolia : mainnet,
  ],
  ssr: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
