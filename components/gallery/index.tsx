"use client";
import React from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import GalleryTab from "./gallery-tab";
import { Image as ImageType } from "@/types";

interface GalleryProps {
  images?: ImageType[]; // Optional to handle cases where images might not be provided
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  console.log("images", images);

  if (!images || images.length === 0) {
    return <div>No images available.</div>; // Handling the case where images are not provided
  }

  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {images.map((image, index) => (
          <Tab.Panel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Image
                layout="fill"
                sizes="(max-width: 600px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw"
                src={image.url}
                alt="Image"
                className="object-cover object-center"
                priority={index === 0 ? true : false} // Add priority to the first image
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
