"use client";

import { Product } from "@/types";
import React from "react";
import Image from "next/legacy/image";
import IconButton from "@/components/ui/icon-button";
import { X } from "lucide-react";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <div className="flex p-6 hover:bg-gray-50 transition-colors duration-200">
      <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          layout="fill"
          src={data.images[0].url}
          alt={data.name}
          className="object-cover object-center hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="pr-6">
            <h3 className="text-lg font-medium text-gray-900">
              {data.name}
            </h3>
            <div className="mt-1 flex items-center space-x-4">
              <p className="text-sm text-gray-500">{data.color.name}</p>
              <div className="h-4 w-px bg-gray-200" />
              <p className="text-sm text-gray-500">{data.size.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-lg font-medium text-gray-900">
              <Currency value={data.price} />
            </p>
            <button
              onClick={onRemove}
              className="rounded-full p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
