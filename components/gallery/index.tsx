"use client";

import Image from "next/image";
import { Tab } from "@headlessui/react";
import { Image as ImageType } from "@/types";
import { cn } from "@/lib/utils";
import "./gallery.css";

interface GalleryProps {
  images: ImageType[];
  selectedIndex?: number;
  onImageSelect: (index: number) => void;
  selectedVariationId?: string;
}

const Gallery: React.FC<GalleryProps> = ({ 
  images,
  selectedIndex = 0,
  onImageSelect,
  selectedVariationId
}) => {
  const filteredImages = selectedVariationId
    ? images.filter(img => img.variationId === selectedVariationId)
    : images;

  console.log("Gallery rendering with:", {
    selectedVariationId,
    filteredImagesCount: filteredImages.length,
    selectedIndex
  });

  // Trouver l'index relatif dans les images filtrées
  const currentFilteredIndex = filteredImages.findIndex(
    img => img.id === images[selectedIndex]?.id
  );

  const handleThumbnailClick = (filteredIndex: number) => {
    const selectedImage = filteredImages[filteredIndex];
    const originalIndex = images.findIndex(img => img.id === selectedImage.id);
    console.log("Thumbnail click:", { filteredIndex, originalIndex });
    onImageSelect(originalIndex);
  };

  return (
    <div className="gallery-container">
      {/* Colonne des miniatures */}
      <div className="thumbnails-column">
        {filteredImages.map((image, index) => (
          <div 
            key={image.id}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "thumbnail-item",
              index === currentFilteredIndex && "selected"
            )}
          >
            <Image
              src={image.url}
              alt={`Miniature ${index + 1}`}
              width={80}
              height={80}
              className="thumbnail-image"
            />
          </div>
        ))}
      </div>

      {/* Image principale */}
      <div className="main-image-section">
        <div className="main-image-wrapper">
          <Image
            src={filteredImages[currentFilteredIndex]?.url || images[0].url}
            alt="Image principale"
            fill
            priority
            className="main-image"
            sizes="(max-inline-size: 768px) 100vw, (max-inline-size: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;