import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

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
    <html lang="en">
      <head>
        <link rel="icon" href="/stockpilot-logo.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
