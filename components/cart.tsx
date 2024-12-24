"use client";

import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import useCart from '@/hooks/use-cart';
import Currency from '@/components/ui/currency';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateItemQuantity, removeAll } = useCart();

  // Fonction utilitaire pour convertir le prix
  const getNumericPrice = (price: string | number): number => {
    return typeof price === 'string' ? Number(price) : price;
  };

  // Calculer le prix total en utilisant la fonction de conversion
  const totalPrice = items.reduce((total, item) => 
    total + (getNumericPrice(item.price) * (item.quantity || 1)), 
    0
  );

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button 
        onClick={toggleCart}
        className="relative group"
      >
        <ShoppingCart 
          className="
            w-6 
            h-6 
            text-gray-700 
            group-hover:text-purple-600 
            transition-colors
          " 
        />
        {items.length > 0 && (
          <span 
            className="
              absolute 
              -top-2 
              -right-2 
              bg-purple-600 
              text-white 
              text-xs 
              rounded-full 
              h-4 
              w-4 
              flex 
              items-center 
              justify-center
            "
          >
            {items.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="
              fixed 
              top-0 
              right-0 
              w-96 
              h-full 
              bg-white 
              shadow-2xl 
              z-50 
              p-6 
              overflow-y-auto
            "
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Votre Panier</h2>
              <button 
                onClick={toggleCart}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                Votre panier est vide
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between border-b pb-4 last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Image du produit */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={item.images[0]?.url} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Détails du produit */}
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          
                          {/* Affichage conditionnel de la variation */}
                          {item.selectedVariation && (
                            <div className="text-sm text-gray-600 space-x-2">
                              {item.selectedVariation.color && (
                                <span 
                                  className="inline-block w-4 h-4 rounded-full" 
                                  style={{ backgroundColor: item.selectedVariation.color.value }}
                                />
                              )}
                              {item.selectedVariation.size && (
                                <span>{item.selectedVariation.size.name}</span>
                              )}
                            </div>
                          )}
                          
                          {/* Prix */}
                          <p className="text-sm text-gray-500 mt-1">
                            <Currency value={item.price} />
                          </p>
                        </div>
                      </div>

                      {/* Quantité et suppression */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded">
                          <button 
                            onClick={() => updateItemQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button 
                            onClick={() => updateItemQuantity(item.id, (item.quantity || 1) + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-700">Total</span>
                    <Currency value={totalPrice} className="font-bold" />
                  </div>
                  <Button 
                    className="
                      w-full 
                      bg-purple-600 
                      hover:bg-purple-700 
                      text-white 
                      py-3 
                      rounded-lg
                    "
                  >
                    Passer à la caisse
                  </Button>
                  <button
                    onClick={removeAll}
                    className="
                      w-full 
                      text-red-500 
                      hover:text-red-700 
                      mt-2 
                      text-sm
                    "
                  >
                    Vider le panier
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
