import React from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { ImMail2,ImPhone } from "react-icons/im";

const cardData = [
  {
    id: 1,
    imgSrc: "/aboutus2img/directors.jpg",
    name: "Dr. Upul Jayasinghe",
    edu: "Ph.D. (UK), M.Eng. (Thailand), B.Sc(Moratuwa)",
    mail:"director.ceit@gs.pdn.ac.lk",
    mobno1:"+94 81 2384848/ ",
    mobno2:"+94 81 2392901"
  },
  {
    id: 2,
    imgSrc: "/aboutus2img/directors.jpg",
    name: "Dr. Upul Jayasinghe",
    edu: "Ph.D. (UK), M.Eng. (Thailand), B.Sc(Moratuwa)",
    mail:"director.ceit@gs.pdn.ac.lk",
    mobno1:"+94 81 2384848",
    
  },
  {
    id: 3,
    imgSrc: "/aboutus2img/directors.jpg",
    name: "Dr. Upul Jayasinghe",
    edu: "Ph.D. (UK), M.Eng. (Thailand), B.Sc(Moratuwa)",
    mail:"director.ceit@gs.pdn.ac.lk",
    mobno1:"+94 81 2384848/ ",
    mobno2:"+94 81 2392901"
  },
  {
    id: 4,
    imgSrc: "/aboutus2img/directors.jpg",
    name: "Dr. Upul Jayasinghe",
    edu: "Ph.D. (UK), M.Eng. (Thailand), B.Sc(Moratuwa)",
    mail:"director.ceit@gs.pdn.ac.lk",
    mobno1:"+94 81 2384848/ ",
    mobno2:"+94 81 2392901"
  },
];

export default function App() {
  return (
    <>
      <div className="flex justify-center w-auto text-2xl p-4">
        Directors
      </div>
      <div className="flex justify-center items-center gap-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardData.map((card) => (
            <Card key={card.id} className="w-[400px] bg-gray-200 shadow-md rounded-lg">
              <CardHeader className="flex gap-3 p-4">
                <Image
                  alt="nextui logo"
                  height={50}
                  radius="full"
                  src={card.imgSrc}
                  width={50}
                />
                <div className="flex flex-col">
                  <p className="text-md font-bold">{card.name}</p>
                  <p className="text-sm text-gray-500">{card.edu}</p>
                  
                  <div className="flex items-center gap-2">
                    <ImMail2 style={{ fontSize: 20 }} />
                    <p className="text-sm">{card.mail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ImPhone style={{ fontSize: 20 }}/>
                    <div className="flex flex-col text-sm">
                      <p>{card.mobno1}</p>
                      <p>{card.mobno2}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
