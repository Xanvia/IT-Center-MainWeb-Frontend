"use client";

import { mainLinkData, mainLinkDataTypes } from "@/CONSTANT_DATA/mainLinksData";
import { Player } from "@lottiefiles/react-lottie-player";
import Image from "next/image";
import Link from "next/link";

export const MainLink: React.FC = () => {
  return (
    <>
      {mainLinkData.map((item: mainLinkDataTypes) => (
        <div className="grid justify-items-center" key={item.id}>
          <Link href={item.url} className="overflow-hidden">
            {item.id === "O P E N E D" ? (
              <Image
                src={item.imgsrc}
                width={100}
                height={100}
                alt="opened"
                className="translate-y-4 drop-shadow-lg brightness-110 w-40 h-32 mt-4 rounded-lg"
              />
            ) : (
              <Player
                className={`stroke-gray-600 stroke-1 drop-shadow-lg brightness-110 h-40 object-top object-none`}
                style={item.options}
                loop
                hover
                src={item.imgsrc}
              ></Player>
            )}
          </Link>
          <div className="p-2 grid justify-items-center">
            <Link href={item.url}>
              <h5 className="mb-2 text-lg uppercase tracking-wider text-gray-600 hover:text-yellow-600 relative z-10">
                {item.id}
              </h5>
            </Link>
            <p className="mx-5 text-center font-light text-sm text-gray-700 dark:text-gray-400 max-w-80">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
