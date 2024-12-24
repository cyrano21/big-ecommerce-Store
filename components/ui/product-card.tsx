"use client";

import React from "react";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { Product, ProductVariation } from "@/types/index";

interface ProductCardProps {
  data: Product & { 
    variations: ProductVariation[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  // Vérifier si le produit a des variations
  const hasVariations = data.variations && data.variations.length > 0;

  // Calculer le stock total disponible
  const totalStock = React.useMemo(() => {
    if (!hasVariations) {
      return 0;
    }
    return data.variations.reduce((total, variation) => total + (variation.stock || 0), 0);
  }, [data.variations, hasVariations]);

  // Vérifier si le produit est en stock
  const isInStock = totalStock > 0;
  const stockLabel = isInStock ? "En stock" : "Rupture de stock";
  const stockColor = isInStock ? "bg-green-500" : "bg-red-500";

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    
    // Si le produit a des variations, rediriger vers la page du produit
    if (data.variations && data.variations.length > 0) {
      router.push(`/product/${data?.id}`);
      return;
    }
    
    // Si le produit n'a pas de variations ou si la première variation est disponible
    const firstVariation = data.variations[0];
    if (firstVariation && firstVariation.stock > 0) {
      cart.addItem(data, firstVariation);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 w-full h-full flex flex-col"
    >
      <div className="aspect-square relative bg-gray-100 rounded-xl">
        <Image
          src={data.images?.[0]?.url}
          alt={data.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-square object-cover rounded-xl"
          priority={false}
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
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
      <div className="relative p-3 bg-white flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-purple-600 truncate max-w-[70%]">{data.category?.name}</p>
            <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full text-white ${stockColor}`}>
              {stockLabel}
            </span>
          </div>
          <div className="flex flex-col space-y-2 min-h-[120px]">
            <div className="group/title relative h-[40px]">
              <h3 className="font-semibold text-sm text-gray-700 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                {data.name}
              </h3>
              <div className="hidden group-hover/title:block absolute z-10 bg-white border border-gray-200 rounded-md p-2 shadow-lg whitespace-normal max-w-[300px] text-xs">
                {data.name}
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <p className="text-sm font-medium text-gray-900">
                <Currency value={data.price} />
              </p>
            </div>
            {hasVariations && (
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-medium text-gray-500">Taille:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {Array.from(new Set(data.variations.map(v => v.size?.name))).filter(Boolean).map((size) => (
                      <span key={size} className="px-3 py-1 text-[10px] font-semibold bg-black text-white rounded border">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">Couleur:</span>
                  <div className="flex space-x-2 m-2">
                    {Array.from(new Set(data.variations.map(v => v.color?.value))).filter(Boolean).map((color) => {
                      const colorName = data.variations.find(v => v.color?.value === color)?.color?.name;
                      return (
                        <div 
                          key={color}
                          className="w-4 h-4 rounded-full border border-gray-200 ring-2 ring-offset-2 ring-gray-400"
                          style={{ backgroundColor: color }}
                          title={colorName}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
