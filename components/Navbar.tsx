"use client";

import React, { useState } from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MainNav from "@/components/Main-nav";
import NavbarAction from "./navbar-action";
import { Category } from "@/types";
import getCategories from "@/actions/get-categories";

export const revalidate = 0;

interface NavbarProps {
  initialCategories: Category[];
}

const Navbar: React.FC<NavbarProps> = ({ initialCategories = [] }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                gap-x-2 
                text-white 
                hover:opacity-80 
                transition-opacity 
                duration-300
              "
            >
              <p className="text-2xl font-bold">
                Store<span className="text-yellow-300">.</span>
              </p>
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button 
                onClick={toggleMenu} 
                className="
                  text-white 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-white/30 
                  rounded-md 
                  p-2
                "
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {categories && categories.length > 0 ? (
                <MainNav data={categories} />
              ) : (
                <div className="text-white/50 text-center py-4">
                  No categories available
                </div>
              )}
              <NavbarAction />
            </div>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
              <div 
                className="
                  lg:hidden 
                  fixed 
                  inset-0 
                  top-[72px] 
                  bg-gradient-to-br 
                  from-purple-700 
                  via-fuchsia-500 
                  to-pink-500 
                  z-40 
                  overflow-y-auto
                "
              >
                <div className="px-4 pt-8 pb-4 space-y-4">
                  <div className="flex flex-col space-y-4">
                    {categories && categories.length > 0 ? (
                      categories.map((category: Category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.id}`}
                          className="
                            text-white 
                            text-lg 
                            font-medium 
                            py-3 
                            px-4 
                            rounded-lg 
                            hover:bg-white/10 
                            transition-colors 
                            duration-300
                          "
                          onClick={toggleMenu}
                        >
                          {category.name}
                        </Link>
                      ))
                    ) : (
                      <div className="text-white/50 text-center py-4">
                        No categories available
                      </div>
                    )}
                  </div>
                  <div className="pt-6 border-t border-white/20">
                    <NavbarAction />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </nav>
    </>
  );
};

export async function NavbarServer() {
  try {
    const fetchedCategories = await getCategories();
    
    // Ensure fetchedCategories is an array
    const categories: Category[] = Array.isArray(fetchedCategories) 
      ? fetchedCategories 
      : [];
    
    return <Navbar initialCategories={categories} />;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return <Navbar initialCategories={[]} />;
  }
}

export default NavbarServer;
