"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { dynamicEnvironmentId } from "@/lib/dynamic";

export function DynamicProvider({ children }: { children: React.ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: dynamicEnvironmentId,
        walletConnectors: [EthereumWalletConnectors],
        events: {
          onAuthSuccess: (args) => {
            console.log("Auth successful", args);
          },
          onLogout: () => {
            console.log("User logged out");
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}