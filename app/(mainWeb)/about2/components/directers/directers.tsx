import React from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";

const cardData = [
  {
    id: 1,
    imgSrc: "https://avatars.githubusercontent.com/u/86160567?s=200&v=4",
    title: "Card 1",
    subtitle: "nextui.org",
  },
  {
    id: 2,
    imgSrc: "https://avatars.githubusercontent.com/u/86160567?s=200&v=4",
    title: "Card 2",
    subtitle: "example.com",
  },
  {
    id: 3,
    imgSrc: "https://avatars.githubusercontent.com/u/86160567?s=200&v=4",
    title: "Card 3",
    subtitle: "example.com",
  },
  {
    id: 4,
    imgSrc: "https://avatars.githubusercontent.com/u/86160567?s=200&v=4",
    title: "Card 4",
    subtitle: "example.com",
  },
  
];

export default function App() {
  return (
    <>
    <div className="flex justify-center w-auto text-2xl p-4">
        Directors
    </div>
    <div className="flex justify-center items-center  gap-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {cardData.map((card) => (
          <Card key={card.id} className="w-[300px] bg-gray-200 shadow-md rounded-lg">
            <CardHeader className="flex gap-3 p-4">
              <Image
                alt="nextui logo"
                height={50}
                radius="full"
                src={card.imgSrc}
                width={50}
              />
              <div className="flex flex-col">
                <p className="text-md font-bold">{card.title}</p>
                <p className="text-sm text-gray-500">{card.subtitle}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
    </>
  );
}


//