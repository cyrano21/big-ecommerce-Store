"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import useCart from "../hooks/use-cart";

const CartIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16" 
    width="20" 
    height="20" 
    fill="currentColor" 
    className="bi bi-cart"
  >
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
  </svg>
);

const NavbarAction = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="w-auto border-transparent disabled:cursor-not-allowed disabled:opacity-50 font-semibold hover:opacity-75 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center"
      >
        <CartIcon />
        <span className="ml-2 text-sm font-medium">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};
export default NavbarAction;
