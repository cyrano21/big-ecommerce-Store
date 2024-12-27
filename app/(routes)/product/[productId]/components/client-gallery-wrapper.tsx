"use client";

import { useState } from "react";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import { Product } from "@/types";

export default function ClientGalleryWrapper({ product }: { product: Product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariationId, setSelectedVariationId] = useState<string | undefined>(
    product.variations[0]?.id
  );

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
    const variation = product.variations.find(v => 
      product.images[index].variationId === v.id
    );
    if (variation) {
      setSelectedVariationId(variation.id);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 w-full">
      <div className="w-full lg:min-h-[600px]">
        <Gallery
          images={product.images}
          selectedIndex={selectedImageIndex}
          onImageSelect={handleImageSelect}
          selectedVariationId={selectedVariationId}
        />
      </div>
      <div className="w-full">
        <Info 
          data={product} 
          onImageSelect={handleImageSelect}
        />
      </div>
    </div>
  );
}
