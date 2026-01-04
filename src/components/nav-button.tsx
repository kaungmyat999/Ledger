import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

type Props = {
  route: {
    href: string;
    label: string;
  };
  active?: boolean;
};
export default function NavButton({ route, active }: Props) {
  return (
    <Button
      asChild
      size="sm"
      className={cn(
        "w-full justify-between border-none font-normal text-white outline-none hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:w-auto",
        active ? "bg-white/20" : "bg-transparent",
      )}
    >
      <Link href={route.href}>{route.label}</Link>
    </Button>
  );
}
