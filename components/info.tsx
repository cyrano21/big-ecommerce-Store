"use client";

import { Product, ProductVariation } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/Button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { useState } from "react";
import cn from "classnames";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    data.variations && data.variations.length > 0 ? data.variations[0] : null
  );
  const [isFavorite, setIsFavorite] = useState(false);

  const onAddToCart = () => {
    if (selectedVariation) {
      cart.addItem(data, selectedVariation);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* En-tête avec titre et favoris */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{data.name}</h1>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 hover:scale-110 transition"
          >
            <Heart 
              size={24} 
              className={cn(
                "transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
              )} 
            />
          </button>
        </div>

        {/* Étoiles et avis */}
        <div className="flex items-center gap-x-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className="text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">(125 avis)</span>
        </div>

        {/* Prix */}
        <div className="flex items-center">
          <p className="text-xl sm:text-2xl font-medium text-orange-600">
            <Currency value={data?.price} />
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Description:</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{data.description}</p>
        </div>
      </div>

      {/* Variations */}
      {data.variations && data.variations.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {data.variations.map((variation) => (
              <div 
                key={variation.id} 
                onClick={() => setSelectedVariation(variation)}
                className="relative p-3 bg-white flex-grow flex flex-col justify-between border rounded-xl cursor-pointer"
              >
                {/* Taille */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Taille:</p>
                  <div className={cn(
                    "bg-black text-white px-3 py-1 rounded-md text-center",
                    selectedVariation?.id === variation.id && "ring-2 ring-white"
                  )}>
                    {variation.size?.name}
                  </div>
                </div>

                {/* Couleur */}
                {variation.color && (
                  <div className="space-y-2 mt-3">
                    <p className="text-sm font-medium">Couleur:</p>
                    <div className="flex items-center gap-x-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-600 flex items-center justify-center">
                        <div
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                          style={{ backgroundColor: variation.color.value }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Stock */}
                <div className="mt-3">
                  <span className={cn(
                    "text-xs font-medium",
                    variation.stock > 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {variation.stock > 0 ? "En stock" : "Rupture de stock"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bouton d'action */}
      <div className="flex items-center gap-x-3">
        <Button 
          onClick={onAddToCart} 
          className="flex items-center gap-x-2"
          disabled={!selectedVariation || selectedVariation.stock === 0}
        >
          Ajouter au panier
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
