import React from "react";
import Image from "next/image";
import styles from "./billboard.module.css"; 
import { Billboard as BillboardType } from "@/types";

export interface BillboardProps {
  data: BillboardType | null;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  // Log the received data for debugging
  console.log('Billboard Component - Received Data:', data);

  // More robust null and undefined checks
  if (!data) {
    console.warn('Billboard: No data provided');
    return (
      <div className={styles.billboardContainer}>
        <div className={styles.billboardImage}>
          <div className={styles.billboardOverlay}>
            <div className={styles.billboardText}>No Billboard Available</div>
          </div>
        </div>
      </div>
    );
  }

  // Additional checks for imageUrl and label
  const imageUrl = data.imageUrl || '';
  const label = data.label || 'Billboard';

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden w-full">
      <div 
        className="
          relative 
          w-full 
          h-[300px] 
          sm:h-[400px] 
          md:h-[500px] 
          lg:h-[600px] 
          overflow-hidden 
          rounded-xl 
          flex 
          items-center 
          justify-center
        "
      >
        <Image 
          src={imageUrl} 
          alt={label}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="
            object-cover 
            object-center 
            z-0
          "
        />
        <div 
          className="
            absolute 
            inset-0 
            bg-black 
            bg-opacity-30 
            hover:bg-opacity-20 
            transition-all 
            duration-300 
            z-10
          "
        />
        <div 
          className="
            relative 
            z-20 
            text-center 
            px-4 
            sm:px-8 
            md:px-16 
            lg:px-24
            drop-shadow-lg
          "
        >
          <h1 
            className="
              text-3xl 
              sm:text-4xl 
              md:text-5xl 
              lg:text-6xl 
              font-bold 
              text-white 
              mb-4 
              sm:mb-6 
              drop-shadow-md
            "
          >
            {label}
          </h1>
          {data.description && (
            <div 
              className="
                text-sm 
                sm:text-base 
                md:text-lg 
                text-white 
                max-w-xl 
                mx-auto 
                text-center 
                drop-shadow-md
              "
            >
              {data.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Billboard;
