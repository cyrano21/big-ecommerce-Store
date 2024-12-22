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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-block">
              Votre Panier
            </h1>
            <p className="mt-2 text-gray-600">
              Gérez vos articles et finalisez votre commande
            </p>
          </div>
          
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              {cart.items.length === 0 ? (
                <div className="bg-gradient-to-br from-white via-purple-50 to-fuchsia-50 rounded-2xl shadow-sm p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</h3>
                  <p className="text-gray-500 text-lg mb-6">Commencez votre shopping dès maintenant !</p>
                  <button 
                    onClick={() => window.history.back()}
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                  >
                    Continuer vos achats
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cart.items.map((item) => (
                    <li key={item.id} className="bg-gradient-to-br from-white via-fuchsia-50 to-pink-50 rounded-2xl shadow-sm overflow-hidden transition-transform duration-200 hover:scale-[1.02]">
                      <CartItem data={item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-16 rounded-2xl lg:mt-0 lg:col-span-5">
              <div className="bg-gradient-to-br from-white via-purple-50 to-fuchsia-50 rounded-2xl shadow-sm sticky top-8">
                <Summary />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default CartPage;
