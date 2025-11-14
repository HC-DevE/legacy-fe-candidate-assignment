import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DynamicProvider } from "@/providers/DynamicProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 Message Signer",
  description: "Sign and verify messages on the blockchain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <QueryProvider>
          <DynamicProvider>
            {children}
            <Toaster />
          </DynamicProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
