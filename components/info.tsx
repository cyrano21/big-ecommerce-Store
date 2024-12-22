"use client";

import React, { useEffect } from "react";
import { Product } from "../types";
import Currency from "./ui/currency";
import Button from "./ui/Button";
import { ShoppingCart } from "lucide-react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-value",
      data?.color?.value
    );
  }, [data?.color?.value]);

  return (
    <div className="space-y-8 transition-all duration-300">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{data.name}</h1>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-semibold text-gray-900">
            <Currency value={data?.price} />
          </p>
        </div>
      </div>
      
      <hr className="border-gray-200" />
      
      <div className="space-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="text-sm font-medium text-gray-900">Taille:</h3>
          <div className="text-sm text-gray-700">{data?.size?.name}</div>
        </div>

        <div className="flex items-center gap-x-4">
          <h3 className="text-sm font-medium text-gray-900">Couleur:</h3>
          <div className="h-8 w-8 rounded-full border-2 border-gray-300 bg-color shadow-sm transform hover:scale-110 transition-transform duration-200"></div>
        </div>
      </div>

      <div className="pt-6">
        <Button className="w-full sm:w-auto flex items-center justify-center gap-x-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition-all duration-200 transform hover:scale-105">
          <ShoppingCart className="w-5 h-5" />
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};

export default Info;
