"use client";

import React, { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import CustomAccordion from "./accordion";
import styles from "./log.module.css";

const initialContent = "Item 1";
const initialPhotos = ["/logjpg/im1.jpg", "/logjpg/im2.jpg", "/logjpg/im3.jpg"];
const initialParagraph = [
  "1 This is the paragraph for Item 1Some essay samples below are by students who chose to write about a challenge, while other examples may be helpful if you’re looking to write about yourself more generally. And yes, a few of these essays did help these students get accepted into the Ivy League (I’m not telling you which!) though these are all great essays regardless of where (or if) students were admitted to their top choice school.",
];

const App: React.FC = () => {
  const [content, setContent] = useState<string>(initialContent);
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [paragraph, setParagraph] = useState<string[]>(initialParagraph);

  return (
    <NextUIProvider>
      <div className={styles.Container}>
        <div className={styles.pageName}>Logs</div>
        <div className={styles.ContentWrapper}>
          <div className={styles.ContentHeadline}>{content}</div>

          <div className={styles.itemBox}>
            <div className={styles.headLine}>
              <CustomAccordion
                onItemSelected={setContent}
                onPhotosSelected={setPhotos}
                onParagraphSelected={setParagraph}
              />
            </div>
          </div>

          <div className={styles.ContentBox}>
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
    </NextUIProvider>
  );
};

export default App;
