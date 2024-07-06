"use client";

import React, { useState } from "react";
import styles from "./Components/css/log.module.css";
import CustomAccordion from "./Components/accordion";

const initialContent = "Certificate based Computer skill programme";
const initialPhotos = ["/logjpg/im1.jpg", "/logjpg/im2.jpg", "/logjpg/im3.jpg"];
const initialParagraph = [
  "1 This is the paragraph for Item 1Some essay samples below are by students who chose to write about a challenge, while other examples may be helpful if you’re looking to write about yourself more generally. And yes, a few of these essays did help these students get accepted into the Ivy League (I’m not telling you which!) though these are all great essays regardless of where (or if) students were admitted to their top choice school.",
];

export default function Home() {
  const [subject, setSubject] = useState<string>(initialContent);
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [paragraph, setParagraph] = useState<string[]>(initialParagraph);

  return (
    <div className="overflow-hidden">
      <div className={styles.Container}>
        <div className="p-2 md:pt-10 pb-2">
          <h1 className=" from-red-700 to-gray-800 bg-clip-text text-transparent bg-gradient-to-t font-bold md:text-3xl text-xl text-center gird">
            Service Log
          </h1>
          <div className="flex justify-center mt-1">
            <div className="bg-yellow-600 h-1 md:w-32 rounded-md"></div>
          </div>
        </div>

        <div className={styles.ContentWrapper}>
          <div className={styles.itemBox}>
            <div className={styles.headLine}>
              <CustomAccordion
                onItemSelected={setSubject}
                onPhotosSelected={setPhotos}
                onParagraphSelected={setParagraph}
              />
            </div>
          </div>

          <div className={styles.ContentBox}>
            <div className={styles.ContentHeadline}>{subject}</div>
            <div className={styles.Photos}>
              {photos.map((photo, index) => (
                <img
                  className={styles.Photo}
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                />
              ))}
            </div>
            {paragraph && <p className={styles.Paragraph}>{paragraph}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
