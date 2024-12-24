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
        <Tab.Group 
          as="div" 
          className="flex flex-col-reverse"
          selectedIndex={selectedImageIndex}
          onChange={setSelectedImageIndex}
        >
          <div className="mx-auto mt-6 mb-6 w-full max-w-2xl sm:block lg:max-w-none">
            <Tab.List className="grid grid-cols-4 gap-6">
              {images.map((image, index) => (
                <Tab
                  key={image.id}
                  className={({ selected }) => classNames(
                    'relative flex aspect-square items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none',
                    selected ? 'ring-2 ring-indigo-500' : ''
                  )}
                >
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <Image
                      src={image.url}
                      alt="Product Thumbnail"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain object-center"
                    />
                  </span>
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels className="aspect-square w-full">
            {images.map((image) => (
              <Tab.Panel key={image.id}>
                <div className="aspect-square relative w-full sm:rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                  <Image
                    src={image.url}
                    alt="Product Image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain object-center"
                  />
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Gallery;
