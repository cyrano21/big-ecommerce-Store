'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tab } from '@headlessui/react';

import { Image as ImageType } from '@/types';

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.Group 
          as="div" 
          className="flex flex-col-reverse"
          selectedIndex={selectedImageIndex}
          onChange={setSelectedImageIndex}
        >
          <Tab.Panels className="aspect-square w-full">
            <Tab.Panel>
              <div className="aspect-square relative w-full sm:rounded-lg overflow-hidden">
                <Image
                  src={images[selectedImageIndex].url}
                  alt="Product Image"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </Tab.Panel>
          </Tab.Panels>

          <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <Tab.List className="grid grid-cols-4 gap-6">
              {images.map((image, index) => (
                <Tab
                  key={image.id}
                  className={`
                    relative 
                    flex 
                    aspect-square 
                    cursor-pointer 
                    items-center 
                    justify-center 
                    rounded-md 
                    bg-white 
                    p-2 
                    focus:outline-none 
                    ${selectedImageIndex === index 
                      ? 'ring-2 ring-purple-500 ring-offset-2' 
                      : 'hover:bg-gray-100'}
                  `}
                >
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <Image
                      src={image.url}
                      alt="Product Image"
                      fill
                      className="object-cover object-center"
                    />
                  </span>
                </Tab>
              ))}
            </Tab.List>
          </div>
        </Tab.Group>
      </div>

      {/* Mobile Thumbnails */}
      <div className="block sm:hidden px-4 mt-2 mb-2">
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={image.id}
              onClick={() => setSelectedImageIndex(index)}
              className={`
                relative 
                aspect-square 
                cursor-pointer 
                rounded-md 
                overflow-hidden 
                ${selectedImageIndex === index 
                  ? 'ring-2 ring-purple-500 ring-offset-2' 
                  : 'hover:opacity-75'}
              `}
            >
              <Image
                src={image.url}
                alt="Product Image"
                fill
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
