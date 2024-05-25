import React from "react";
import { Billboard as BillboardType } from "@/types";
import styles from "./billboard.module.css"; // Assurez-vous que le chemin soit correct

export interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className={styles.billboardContainer}>
      <div
        className={styles.billboardImage}
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      >
        <div className={styles.billboardOverlay}>
          <div className={styles.billboardText}>{data.label}</div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
