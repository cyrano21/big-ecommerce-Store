"use client";

import React, { useState } from "react";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import { Product } from "@/types";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 min-h-[calc(100vh-80px)]">
          <div className="lg:min-h-[calc(100vh-80px)] lg:sticky lg:top-20">
            <Gallery
              images={product.images}
              selectedIndex={selectedImageIndex}
              onImageSelect={setSelectedImageIndex}
            />
          </div>

          <div className="lg:min-h-[calc(100vh-80px)] lg:py-8">
            <Info data={product} onImageSelect={setSelectedImageIndex} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
