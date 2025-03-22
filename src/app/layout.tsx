import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { NextAuthProvider } from "@/components/providers/next-auth-provider";
import MiniKitProvider from "@/components/providers/minikit-provider";
import { ErudaWrapper } from "@/components/providers/eruda-wrapper";
import { PrivyAuthProvider } from "@/components/providers/privy-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Black Box Team",
  description:
    "Instant access to specialized professional teams for your startup.",
  keywords: [
    "startup teams",
    "professional services",
    "HR solutions",
    "marketing experts",
    "legal teams",
    "team building",
    "startup resources",
    "business solutions",
    "professional network",
    "expert teams",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased")}>
        <NextAuthProvider>
          <PrivyAuthProvider>
            <ErudaWrapper>
              <MiniKitProvider>{children}</MiniKitProvider>
            </ErudaWrapper>
          </PrivyAuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
