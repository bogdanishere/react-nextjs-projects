"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All events",
    path: "/events/all",
  },
];

export default function Header() {
  const pathnameActive = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-white/10 h-14 sm:px-9 px-3">
      <Logo />
      <nav className="h-full">
        <ul className="flex gap-x-6 text-sm h-full">
          {routes.map((route) => (
            <li
              key={route.path}
              className={cn(
                "flex items-center hover:text-white relative transition",
                {
                  "text-white": pathnameActive === route.path,
                  "text-white/50": pathnameActive !== route.path,
                }
              )}
            >
              <Link href={route.path}>{route.name}</Link>
              {pathnameActive === route.path && (
                <motion.div
                  layoutId="header-active-link"
                  className="bg-accent h-1 w-full absolute bottom-0"
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
