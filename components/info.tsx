"use client";

import { Product, ProductVariation } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { useState } from "react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    data.variations && data.variations.length > 0 ? data.variations[0] : null
  );

  const onAddToCart = () => {
    if (selectedVariation) {
      cart.addItem(data, selectedVariation);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        {data.variations && data.variations.length > 0 && (
          <div className="flex flex-col gap-y-2">
            <h3 className="font-semibold text-black">Variations disponibles</h3>
            <div className="grid grid-cols-3 gap-2">
              {data.variations.map((variation) => (
                <Button
                  key={variation.id}
                  onClick={() => setSelectedVariation(variation)}
                  className={`p-2 border rounded-md ${
                    selectedVariation?.id === variation.id
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  disabled={variation.stock === 0}
                >
                  <div className="flex flex-col items-center">
                    {variation.color && (
                      <div
                        className="w-4 h-4 rounded-full mb-1"
                        style={{ backgroundColor: variation.color.value }}
                      />
                    )}
                    <span className="text-sm">
                      {variation.size?.name}
                      {variation.color?.name && ` - ${variation.color.name}`}
                    </span>
                    <span className="text-xs text-gray-500">
                      Stock: {variation.stock}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="mt-10 flex items-center gap-x-3">
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
    </div>
  );
};

export default Info;
