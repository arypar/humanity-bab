"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavigationHeader: React.FC = () => {
  const pathname = usePathname();
  const isEnrollPage = pathname === "/enroll";

  return (
    <header className="w-full bg-background border-b border-border">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 group transition-transform duration-500 hover:scale-105">
          <Link
            href="/"
            className="text-xl font-bold transition-colors duration-500 group-hover:text-orange-500"
          >
            give.fun
          </Link>
        </div>
        <ul className="flex space-x-4 items-center">
          <AnimatePresence mode="wait">
            <motion.li
              key={isEnrollPage ? "home" : "enroll"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={isEnrollPage ? "/" : "/enroll"}
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {isEnrollPage ? "Back to Home" : "Enroll Nonprofit"}
              </Link>
            </motion.li>
          </AnimatePresence>
          <ConnectButton />
        </ul>
      </nav>
    </header>
  );
};

export default NavigationHeader;