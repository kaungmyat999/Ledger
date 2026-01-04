"use client";
import NavButton from "@/src/components/nav-button";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { routes } from "@/src/lib/constants";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMedia } from "react-use";

export default function Navigation() {
  const isMobile = useMedia("(max-width: 1024px)", false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(href: string) {
    router.push(href);
    setIsOpen(false);
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-none bg-white/10 font-normal text-white outline-none hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <SheetHeader>
            <SheetTitle>
              <span className="font-bold">Menu</span>
            </SheetTitle>
          </SheetHeader>
          <VisuallyHidden>
            <SheetDescription>
              side menu navigation for meowney application
            </SheetDescription>
          </VisuallyHidden>
          <nav className="flex flex-col gap-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => handleClick(route.href)}
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden items-center gap-2 overflow-x-auto lg:flex">
      {routes.map((route) => (
        <NavButton
          route={route}
          active={pathname === route.href}
          key={route.href}
        />
      ))}
    </nav>
  );
}
