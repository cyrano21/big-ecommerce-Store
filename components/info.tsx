"use client";

import React, { useEffect } from "react";
import { Product } from "../types";
import Currency from "./ui/currency";
import Button from "./ui/Button";
import { ShoppingCart, Heart, Star } from "lucide-react";

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
    <div className="space-y-6 sm:space-y-8 transition-all duration-300 relative group">
      {/* Favorite Button */}
      <button 
        className="
          absolute 
          top-2 
          right-2 
          sm:top-7
          sm:right-4 
          z-10 
          text-gray-400 
          hover:text-red-500 
          transition-colors 
          duration-300
        "
      >
        <Heart 
          className="
            w-6 
            h-6 
            sm:w-8 
            sm:h-8 
            fill-current 
            transform 
            hover:scale-110 
            transition-transform
          " 
        />
      </button>

      <div className="flex flex-col space-y-4">
        <h1 
          className="
            text-2xl 
            sm:text-3xl 
            font-bold 
            text-gray-900 
            tracking-tight
          "
        >
          {data.name}
        </h1>

        {data.description && (
          <div 
            className="
              text-gray-600
              leading-relaxed
              max-w-prose
              mt-4
            "
          >
            {data.description}
          </div>
        )}

        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`
                  w-5 
                  h-5 
                  text-yellow-500 
                  ${i < 4 ? 'fill-current' : 'text-gray-300'}
                `} 
              />
            ))}
            <span className="text-sm font-medium text-gray-600">
              (4.0)
            </span>
          </div>
          <div 
            className="
              h-4 
              w-px 
              bg-gray-300
            " 
          />
          <div className="text-sm text-gray-600">
            {data.color.name} / {data.size.name}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p 
            className="
              text-2xl 
              sm:text-3xl 
              font-semibold 
              text-gray-900 
              group-hover:text-purple-600 
              transition-colors 
              mb-2 
              sm:mb-0
            "
          >
            <Currency value={data.price} />
          </p>
        </div>
      </div>
      
      <hr className="border-gray-200 border-dashed" />
      
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <h3 className="text-xs sm:text-sm font-medium text-gray-900">Taille:</h3>
          <div 
            className="
              text-xs 
              sm:text-sm 
              text-gray-700 
              bg-purple-50 
              px-2 
              py-1 
              sm:px-3 
              sm:py-1 
              rounded-full 
              hover:bg-purple-100 
              transition-colors
            "
          >
            {data?.size?.name}
          </div>
        </div>

        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <h3 className="text-xs sm:text-sm font-medium text-gray-900">Couleur:</h3>
          <div 
            className="
              h-6 
              w-6 
              sm:h-10 
              sm:w-10 
              rounded-full 
              border-2 
              border-gray-300 
              bg-color 
              shadow-md 
              transform 
              hover:scale-110 
              transition-transform 
              duration-200 
              cursor-pointer
            "
            title={data?.color?.name}
          ></div>
        </div>
      </div>

      <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <Button 
          className="
            w-full 
            flex 
            items-center 
            justify-center 
            gap-x-2 
            bg-purple-600 
            hover:bg-purple-700 
            text-white 
            px-4 
            sm:px-8 
            py-2 
            sm:py-3 
            rounded-full 
            transition-all 
            duration-200 
            transform 
            hover:scale-105 
            group/button
            text-sm 
            sm:text-base
          "
        >
          <ShoppingCart 
            className="
              w-4 
              h-4 
              sm:w-5 
              sm:h-5 
              group-hover/button:animate-bounce
            " 
          />
          Ajouter au panier
        </Button>
        <Button 
          variant="outline" 
          className="
            w-full 
            flex 
            items-center 
            justify-center 
            gap-x-2 
            border-purple-600 
            text-purple-600 
            hover:bg-purple-50 
            px-4 
            sm:px-8 
            py-2 
            sm:py-3 
            rounded-full 
            transition-all 
            duration-200
            text-sm 
            sm:text-base
          "
        >
          Acheter maintenant
        </Button>
      </div>
    </div>
  );
};

export default Info;
