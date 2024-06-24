import React from 'react';
import styles from './pictures.module.css';
import { Image } from "@nextui-org/react";
import dynamic from 'next/dynamic';


interface picturesProps {
  imageUrl: string;
  heading: string;
  description: string;
}

const Leanmore = dynamic(() => import('../learnmoreButton/LearnMoreButton'), { ssr: false });

const pictures: React.FC<picturesProps> = ({ imageUrl, heading, description }) => {
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.description}>{description}</p>
        <Leanmore/>
      </div>
      <div className={styles.imageSection}>
        <Image isZoomed src={imageUrl} alt="Right side" className={styles.image} />
      </div>
    </div>
  );
};

export default pictures;
