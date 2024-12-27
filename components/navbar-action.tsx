"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import useCart from "@/hooks/use-cart";
import Currency from "@/components/ui/currency";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";
import Image from "next/image";

// Fonction utilitaire pour convertir le prix
const getNumericPrice = (price: string | number): number => {
  return typeof price === "string" ? Number(price) : price;
};

const NavbarAction = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Calculer le prix total et la quantité totale
  const totalPrice = cart.items.reduce(
    (total, item) => total + getNumericPrice(item.price) * (item.quantity || 1),
    0
  );

  const totalQuantity = cart.items.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {/* Panier */}
      <div
        onClick={() => setIsCartOpen(true)}
        className="relative cursor-pointer"
      >
        <ShoppingCart
          size={24}
          className="text-gray-500 hover:text-gray-700 transition"
        />
        {totalQuantity > 0 && (
          <span
            className="
              absolute 
              -top-2 
              -right-2 
              bg-red-500 
              text-white 
              rounded-full 
              w-5 
              h-5 
              flex 
              items-center 
              justify-center 
              text-xs
            "
          >
            {totalQuantity}
          </span>
        )}
      </div>

      {/* Modal du panier */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Votre Panier</h2>
              <Button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </Button>
            </div>

            {cart.items.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                Votre panier est vide
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedVariation?.id}`}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.images[0]?.url}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.selectedVariation && (
                          <div className="text-sm text-gray-500">
                            {item.selectedVariation.color && (
                              <span
                                className={`inline-block w-4 h-4 rounded-full mr-2 ${
                                  item.selectedVariation.color
                                    ? "color-" +
                                      item.selectedVariation.color.value.replace(
                                        "#",
                                        ""
                                      )
                                    : ""
                                }`}
                              />
                            )}
                            {item.selectedVariation.size && (
                              <span>{item.selectedVariation.size.name}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded">
                        <Button
                          onClick={() =>
                            cart.updateItemQuantity(
                              item.id,
                              Math.max(1, (item.quantity || 1) - 1)
                            )
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </Button>
                        <span className="px-4">{item.quantity || 1}</span>
                        <Button
                          onClick={() =>
                            cart.updateItemQuantity(
                              item.id,
                              (item.quantity || 1) + 1
                            )
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <Currency
                          value={
                            getNumericPrice(item.price) * (item.quantity || 1)
                          }
                        />
                        <Button
                          type="button"
                          onClick={() => setIsCartOpen(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X size={24} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <Currency value={totalPrice} />
                </div>

                <button
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
                  onClick={() => {
                    /* Logique de paiement */
                  }}
                >
                  Procéder au paiement
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Total du panier */}
      <div className="text-sm font-medium text-gray-700">
        <Currency value={totalPrice} />
      </div>
    </div>
  );
};

export default NavbarAction;
