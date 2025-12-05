"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function ClerkAuthProvider({ children }: ProvidersProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // If no Clerk key is available, render children without Clerk
  // This allows the app to work even without Clerk configured
  if (!publishableKey) {
    console.warn("Clerk publishable key not found. Authentication features will not work.");
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
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
      {children}
    </ClerkProvider>
  );
}

