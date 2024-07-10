import React from "react";
import styles from "./pictures.module.css";
import { Image } from "@nextui-org/react";
import dynamic from "next/dynamic";

interface PicturesProps {
  imageUrl: string;
  heading: string;
  description: string;
}

const LearnMore = dynamic(() => import("../learnmoreButton/LearnMoreButton"), {
  ssr: false,
});

const Pictures: React.FC<PicturesProps> = ({
  imageUrl,
  heading,
  description,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h1
          className={`${styles.heading} from-red-700 to-gray-800 bg-clip-text text-transparent bg-gradient-to-t font-semibold`}
        >
          {heading}
        </h1>
        <p className={styles.description}>{description}</p>
        <LearnMore />
      </div>
      <div className={styles.imageSection}>
        <Image
          isZoomed
          src={imageUrl}
          alt="About us"
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default Pictures;
