"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isMobile?: boolean;
}

export function NavLink({ href, children, isMobile = false }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors duration-200",
        isMobile 
          ? "block p-3 rounded-md text-lg"
          : "p-2 rounded-md",
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-muted-foreground hover:bg-primary/5 hover:text-primary/90"
      )}
    >
      {children}
    </Link>
  );
}
