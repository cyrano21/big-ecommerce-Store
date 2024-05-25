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
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Taille:</h3>
          <div>{data?.size?.name}</div>
        </div>

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Couleur:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600 bg-color"></div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2">
          Ajouter au panier
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
