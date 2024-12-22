"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { LogIn } from "lucide-react";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  // Vérifiez si data existe et n'est pas vide
  if (!data || data.length === 0) {
    return null;
  }

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full">
      <div className="flex items-center space-x-4 lg:space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'px-3 py-2 rounded-full transition-all duration-300',
              'text-sm font-medium',
              route.active 
                ? 'text-white bg-white/20 backdrop-blur-sm' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
      
      <div className="mt-4 lg:mt-0 lg:ml-6">
        <button 
          className="
            flex 
            items-center 
            gap-x-2
            px-6 
            py-2 
            rounded-full 
            bg-yellow-300 
            hover:bg-yellow-400 
            text-purple-900 
            font-medium 
            transition-all 
            duration-300 
            transform 
            hover:scale-105
            group
          "
        >
          <LogIn className="h-4 w-4 group-hover:rotate-12 transition-transform" />
          Login
        </button>
      </div>
    </div>
  );
};

export default MainNav;
