"use client";

import React, { MouseEventHandler } from "react";
import Image from "next/image";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 w-full h-full flex flex-col"
    >
      <div className="aspect-square relative flex-shrink-0">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative aspect-square rounded-t-xl overflow-hidden">
          <Image
            src={data?.images?.[0]?.url}
            alt={data.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            className="aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute w-full px-6 bottom-5">
            <div className="flex justify-center space-x-4">
              <IconButton 
                onClick={onPreview} 
                icon={<Expand size={20} className="text-gray-600" />} 
              />
              <IconButton 
                onClick={onAddToCart} 
                icon={<ShoppingCart size={20} className="text-gray-600" />} 
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative p-3 bg-white flex-grow flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-purple-600">{data.category?.name}</p>
            <span className="px-2 py-0.5 text-[10px] font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 rounded-full">
              En stock
            </span>
          </div>
          <h3 className="font-bold text-sm group-hover:text-purple-600 transition-colors duration-300">
            {data.name}
          </h3>
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-xs font-medium text-gray-500">Taille</span>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-purple-100 text-purple-700 rounded-full">
              {data.size.name}
            </span>
          </div>
        </div>
        <div className="pt-1 flex items-center justify-between">
          <Currency value={data?.price} className="text-sm font-bold text-gray-900" />
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center transform rotate-90 group-hover:rotate-0 transition-transform duration-500">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3.33337 8H12.6667" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 3.33331L12.6667 7.99998L8 12.6666" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
