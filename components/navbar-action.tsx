"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import useCart from "../hooks/use-cart";

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
    <div className="flex items-center justify-center w-full">
      <button
        onClick={() => router.push("/cart")}
        className="
          relative 
          flex 
          items-center 
          justify-center 
          w-12 
          h-12 
          rounded-full 
          bg-white/10 
          hover:bg-white/20 
          text-white 
          transition-all 
          duration-300 
          group
        "
      >
        <ShoppingCart 
          className="
            h-6 
            w-6 
            transition-transform 
            duration-300 
            group-hover:scale-110
          " 
        />
        {cart.items.length > 0 && (
          <span 
            className="
              absolute 
              -top-2 
              -right-2 
              bg-yellow-300 
              text-purple-900 
              text-xs 
              font-bold 
              rounded-full 
              h-5 
              w-5 
              flex 
              items-center 
              justify-center
            "
          >
            {cart.items.length}
          </span>
        )}
      </button>
    </div>
  );
};

export default NavbarAction;
