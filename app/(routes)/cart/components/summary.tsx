"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const Summary = () => {
  const searchPrams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchPrams.get("success")) {
      toast.success("Commande passée avec succès");
      removeAll();
    }
    if (searchPrams.get("canceled")) {
      toast.error("Commande annulée");
    }
  }, [searchPrams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      },
    );

    window.location = response.data.url;
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Récapitulatif
      </h2>
      
      <div className="space-y-6">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Sous-total</span>
          <Currency value={totalPrice} />
        </div>
        
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Frais de livraison</span>
          <span className="text-green-600 font-medium">Gratuit</span>
        </div>

        <div className="h-px bg-gray-200" />
        
        <div className="flex justify-between text-lg font-semibold">
          <span className="text-gray-900">Total</span>
          <Currency value={totalPrice} />
        </div>

        <Button
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-full font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Commander
        </Button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Paiement sécurisé via Stripe
        </p>
      </div>
    </div>
  );
};
export default Summary;
