"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SyncStatusIndicator } from "../ui";

export function Header() {
  const pathname = usePathname();

  const linkClass = (href: string, exact = false) =>
    clsx(
      "px-3 py-1 rounded-md text-sm font-medium transition-colors",
      (exact ? pathname === href : pathname.startsWith(href))
        ? "bg-zinc-800 text-white"
        : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
    );

  return (
    <header className="border-b border-zinc-800 bg-zinc-900">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <nav aria-label="Navegación principal" className="flex items-center gap-2">
          <Link href="/" className={linkClass("/", true)} aria-current={pathname === "/" ? "page" : undefined}>
            Dashboard
          </Link>

          <Link href="/clients" className={linkClass("/clients")} aria-current={pathname.startsWith("/clients") ? "page" : undefined}>
            Clientes
          </Link>

          <Link href="/products" className={linkClass("/products")} aria-current={pathname.startsWith("/products") ? "page" : undefined}>
            Productos
          </Link>

          <Link href="/opportunities" className={linkClass("/opportunities")} aria-current={pathname.startsWith("/opportunities") ? "page" : undefined}>
            Oportunidades
          </Link>

          <Link href="/analytics" className={linkClass("/analytics")} aria-current={pathname.startsWith("/analytics") ? "page" : undefined}>
            Analytics
          </Link>
        </nav>
        <div className="flex items-center">
          <SyncStatusIndicator />
        </div>
      </div>
    </header>
  );
}
