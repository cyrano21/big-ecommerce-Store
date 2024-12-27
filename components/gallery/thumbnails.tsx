'use client';

import React from 'react';
import Image from 'next/image';
import { Image as ImageType } from '@/types';
import cn from 'classnames';

interface ThumbnailsProps {
  images: ImageType[];
  onSelect: (index: number) => void;
  selectedIndex: number;  
}

const Thumbnails: React.FC<ThumbnailsProps> = ({ 
  images = [], 
  onSelect,
  selectedIndex = 0
}) => {
  const selectedImage = images[selectedIndex];
  
  const sameColorImages = images.filter(image => 
    image.color === selectedImage?.color
  );

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {sameColorImages.map((image) => {
        const originalIndex = images.findIndex(img => img.id === image.id);
        
        return (
          <button
            key={image.id}
            onClick={() => onSelect(originalIndex)}
            className={cn(
              "relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden transition-all duration-200",
              originalIndex === selectedIndex
                ? "ring-2 ring-purple-500"
                : "border border-gray-200 hover:border-gray-300"
            )}
          >
            <Image
              src={image.url}
              alt={`${image.color} variant`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        );
      })}
    </div>
  );
};

export default Thumbnails;
