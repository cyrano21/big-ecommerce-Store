"use client";

import React from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import MainNav from "@/components/Main-nav";
import NavbarAction from "./navbar-action";
import { Category } from "@/types";

interface NavbarProps {
  categories: Category[];
}

const Navbar: React.FC<NavbarProps> = ({ categories = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav 
        className="
          sticky 
          top-0 
          left-0 
          right-0 
          z-50 
          bg-gradient-to-r 
          from-purple-700 
          via-fuchsia-500 
          to-pink-500 
          shadow-lg
        "
      >
        <div className="absolute inset-0 bg-[url('/nav-pattern.svg')] opacity-10"></div>
        
        <Container>
          <div className="relative flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8 w-full max-w-full">
            {/* Logo */}
            <Link 
              href="/" 
              className="
                flex 
                items-center 
                text-white 
                font-bold 
                text-xl 
                hover:opacity-80 
                transition-opacity
              "
            >
              <Image 
                src="/logo.svg" 
                alt="E-Store Logo" 
                width={40} 
                height={40} 
                className="mr-2 rounded-full"
                priority
                onError={(e) => {
                  const imgElement = e.target as HTMLImageElement;
                  imgElement.onerror = null;
                  imgElement.src = '/vercel.svg'; // Fallback image
                }}
              />
              E-Store
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button 
                onClick={toggleMenu} 
                className="text-white focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
              <div className="
                lg:hidden 
                absolute 
                top-full 
                left-0 
                w-full 
                bg-gradient-to-r 
                from-purple-700 
                via-fuchsia-500 
                to-pink-500 
                shadow-lg 
                z-50
              ">
                <div className="px-4 py-6">
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.id}`}
                        className="
                          block 
                          text-white 
                          hover:text-yellow-300 
                          py-2 
                          border-b 
                          border-white/20 
                          last:border-b-0
                        "
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="text-white">
                      No categories available
                    </div>
                  )}
                  
                  {/* Mobile Cart Action */}
                  <div className="mt-4 border-t border-white/20 pt-4">
                    <NavbarAction />
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              {categories && categories.length > 0 ? (
                <MainNav data={categories} />
              ) : (
                <div className="text-white">
                  No categories available
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="hidden lg:block">
              <NavbarAction />
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
