"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Panier</h1>
          <div className="mt-12 grid lg:grid-cols-12 gap-x-12">
            <div className="md:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">Panier vide</p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <div className="col-span-1 lg:col-span-5">
              <Summary />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default CartPage;
