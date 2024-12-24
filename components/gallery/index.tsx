'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import classNames from 'classnames/dedupe'; // changed to dedupe import

import { Image as ImageType } from '@/types';

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="flex flex-col px-2">
      <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
        <div className="flex flex-col-reverse">
          <div className="mx-auto mt-6 mb-6 w-full max-w-2xl sm:block lg:max-w-none">
            <div className="grid grid-cols-4 gap-6">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  onMouseEnter={() => setSelectedImageIndex(index)}
                  className={`
                    relative 
                    flex 
                    aspect-square 
                    items-center 
                    justify-center 
                    rounded-md 
                    bg-white 
                    hover:bg-gray-50 
                    ${selectedImageIndex === index 
                      ? 'ring-2 ring-indigo-500' 
                      : 'hover:opacity-75'}
                  `}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-md">
                    <Image
                      src={image.url}
                      alt="Product Thumbnail"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain object-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-square relative w-full sm:rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
            {images.length > 0 && (
              <Image
                src={images[selectedImageIndex]?.url || '/placeholder-product.jpg'}
                alt="Product Image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain object-center"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
