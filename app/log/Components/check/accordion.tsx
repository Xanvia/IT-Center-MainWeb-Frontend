import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';

interface AccordionProps {
  onItemSelected: (title: string) => void;
  onPhotosSelected: (photos: string[]) => void;
  onParagraphSelected: (paragraph: string[]) => void;
}

const CustomAccordion: React.FC<AccordionProps> = ({ onItemSelected, onPhotosSelected, onParagraphSelected }) => {
  const handleItemClick = (title: string, photos: string[], paragraph: string[]) => {
    onItemSelected(title);
    onPhotosSelected(photos);
    onParagraphSelected(paragraph);
  };

  return (
    <Accordion>
      <AccordionItem title="Item 1" onClick={() => handleItemClick(
        'Content headline for Item 1', 
        ["/logjpg/im1.jpg", "/logjpg/im2.jpg", "/logjpg/im3.jpg"],
        ["1 This is the paragraph for Item 1Some essay samples below are by students who chose to write about a challenge, while other examples may be helpful if you’re looking to write about yourself more generally. And yes, a few of these essays did help these students get accepted into the Ivy League (I’m not telling you which!) though these are all great essays regardless of where (or if) students were admitted to their top choice school."])}>
      </AccordionItem>
      <AccordionItem title="Item 2" onClick={() => handleItemClick(
        'Content headline for Item 2', 
        ["/logjpg/im2.jpg", "/logjpg/im1.jpg", "/logjpg/im4.jpg"],
        ['2 This is the paragraph for Item 1 Some essay samples below are by students who chose to write about a challenge, while other examples may be helpful if you’re looking to write about yourself more generally. And yes, a few of these essays did help these students get accepted into the Ivy League (I’m not telling you which!) though these are all great essays regardless of where (or if) students were admitted to their top choice school.'])}>
      </AccordionItem>
      <AccordionItem title="Item 3  headline for Item This is the paragraph Some essay" onClick={() => handleItemClick(
        'Content headline for Item This is the paragraph Some essay samples below are', 
        ["/logjpg/im4.jpg", "/logjpg/im2.jpg", "/logjpg/im1.jpg"],
        ['3 This is the paragraph for Item 1 Some essay samples below are by students who chose to write about a challenge, while other examples may be helpful if you’re looking to write about yourself more generally. And yes, a few of these essays did help these students get accepted into the Ivy League (I’m not telling you which!) though these are all great essays regardless of where (or if) students were admitted to their top choice school.'])}>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomAccordion;