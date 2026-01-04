import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Sign In",
};
export default function Page() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="mt-8 flex items-center justify-center">
        <ClerkLoaded>
          <SignIn />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="text-muted-foreground size-10 animate-spin" />
        </ClerkLoading>
      </div>
      <div className="hidden items-center justify-center bg-slate-950 lg:flex">
        <Image src="/logo.svg" width={150} height={150} priority alt="logo" />
      </div>
    </div>
  );
}
