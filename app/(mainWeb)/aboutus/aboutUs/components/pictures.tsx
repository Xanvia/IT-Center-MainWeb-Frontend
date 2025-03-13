import React from "react";
import styles from "./pictures.module.css";
import { Image } from "@nextui-org/react";
import Link from "next/link";

interface PicturesProps {
  imageUrl: string;
  heading: string;
  description: string;
}

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

        <div className="pt-8">
          <Link href={"/aboutus/staff"}>
            <button className="bg-yellow-200 hover:bg-maroon text-maroon hover:text-yellow-200 font-bold py-2 px-4 border border-maroon rounded-lg sm:inline-block block w-52 md:w-auto">
              View Staff
            </button>
          </Link>
        </div>
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
