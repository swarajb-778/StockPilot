import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StockPilot - Inventory Management Dashboard",
  description: "A comprehensive inventory management system for tracking products, sales, purchases, and expenses",
  keywords: ["inventory", "management", "dashboard", "products", "sales", "tracking"],
  authors: [{ name: "StockPilot Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#7c3aed",
          colorBackground: "#ffffff",
          colorText: "#1f2937",
          colorInputBackground: "#f9fafb",
          colorInputText: "#1f2937",
        },
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" href="/StockPilotLogo.svg" type="image/svg+xml" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
