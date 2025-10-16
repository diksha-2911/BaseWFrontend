"use client";
import { ReactNode } from "react";
import { baseSepolia } from "wagmi/chains";
import { WagmiProvider } from "wagmi";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "../wagmi.config";
import "@coinbase/onchainkit/styles.css";

const queryClient = new QueryClient();
//Wrapping your app in 3 providers - 1. WagmiProvider -> for blockchain config, 2. QueryClientProvider -> for client side data querying 3. OnchinKitProvider -> for Base Network
export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
          config={{
            appearance: {
              mode: "auto",
            },
            wallet: {
              display: "modal",
              preference: "all",
            },
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
