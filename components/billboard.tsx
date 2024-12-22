import React from "react";
import { Billboard as BillboardType } from "@/types";
import styles from "./billboard.module.css"; // Assurez-vous que le chemin soit correct

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
    <div className={styles.billboardContainer}>
      <div
        className={styles.billboardImage}
        style={{ 
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundColor: imageUrl ? 'transparent' : '#f0f0f0'
        }}
      >
        <div className={styles.billboardOverlay}>
          <div className={styles.billboardText}>{label}</div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
