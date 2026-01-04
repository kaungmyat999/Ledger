import { Signature } from "@/src/components/signature";
import { Toaster } from "@/src/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { QueryProvider } from "./query-provider";
import SheetsProvider from "./sheet-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Suspense>{children}</Suspense>
        <Toaster />
        <SheetsProvider />
        <Signature />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </ClerkProvider>
  );
}
