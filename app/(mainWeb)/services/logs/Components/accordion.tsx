import React, { useState } from "react";
import styles from "./css/log.module.css";

interface AccordionProps {
  onItemSelected: (title: string) => void;
  onPhotosSelected: (photos: string[]) => void;
  onParagraphSelected: (paragraph: string[]) => void;
}

const CustomAccordion: React.FC<AccordionProps> = ({
  onItemSelected,
  onPhotosSelected,
  onParagraphSelected,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (
    index: number,
    title: string,
    photos: string[],
    paragraph: string[]
  ) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
      onItemSelected(title);
      onPhotosSelected(photos);
      onParagraphSelected(paragraph);
    }
  };

  return (
    <div className={styles.accordion}>
      {[
        {
          title: "Certificate based Computer skill programme",
          photos: ["/logjpg/im1.jpg", "/logjpg/im2.jpg", "/logjpg/im3.jpg"],
          paragraph: [
            "1 This is the paragraph for Item 1Some essay samples below are by students who chose to write about a challenge, while other examples may be helpful if you’re looking to write about yourself more generally. And yes, a few of these essays did help these students get accepted into the Ivy League (I’m not telling you which!) though these are all great essays regardless of where (or if) students were admitted to their top choice",
          ],
        },
        {
          title: "Certificate based Computer skill programme",
          photos: ["/logjpg/im2.jpg", "/logjpg/im1.jpg", "/logjpg/im4.jpg"],
          paragraph: [
            "2 This is the paragraph for Item 1 Some essay samples below are by students who chose to write about a challenge, while other examples may be helpful if you’re looking to write about yourself more generally. And yes, a few of these essays did help these students get accepted into the Ivy League (I’m not telling you which!) though these are all great essays regardless of where (or if) students were admitted to their top choice ",
          ],
        },
        {
          title: "Certificate based Computer skill programme",
          photos: ["/logjpg/im4.jpg", "/logjpg/im2.jpg", "/logjpg/im1.jpg"],
          paragraph: [
            "3 This is the paragraph for Item 1 Some essay samples below are by students who chose to write about a challenge, while other examples may be helpful if you’re looking to write about yourself more generally. And yes, a few of these essays did help these students get accepted into the Ivy League (I’m not telling you which!) though these are all great essays regardless of where (or if) students were admitted to their top choice",
          ],
        },
      ].map((item, index) => (
        <div key={index}>
          <div
            className={`${styles.accordion_title} ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() =>
              handleItemClick(index, item.title, item.photos, item.paragraph)
            }
          >
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomAccordion;
