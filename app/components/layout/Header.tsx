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
        : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
    );

  return (
    <header className="border-b border-zinc-800 bg-zinc-900">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <nav className="flex items-center gap-2">
          <Link href="/" className={linkClass("/", true)}>
            Dashboard
          </Link>

          <Link href="/clients" className={linkClass("/clients")}>
            Clientes
          </Link>

          <Link href="/products" className={linkClass("/products")}>
            Productos
          </Link>

          <Link href="/opportunities" className={linkClass("/opportunities")}>
            Oportunidades
          </Link>

          <Link href="/analytics" className={linkClass("/analytics")}>
            Analytics
          </Link>
        </nav>

        <SyncStatusIndicator />
      </div>
    </header>
  );
}
