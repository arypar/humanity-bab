"use client";
import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavigationHeader: React.FC = () => {
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
            {/* Dropdown menu with NavigationMenu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:bg-gray-100 px-4 py-2 rounded-md">
                    Navigation Menu
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white border border-gray-200 rounded-md shadow-lg">
                    <ul className="p-2 space-y-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
                          >
                            Option 
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
                          >
                            Option 2
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
                          >
                            Option 3
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/enroll"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
                          >
                            Enroll Nonprofit
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <ConnectButton />
          </ul>
        </nav>
      </header>
  );
};

export default NavigationHeader;