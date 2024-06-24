"use client";

import { mainLinkData, mainLinkDataTypes } from "@/constants/mainLinksData";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

export const MainLink: React.FC = () => {
  return (
    <>
      {mainLinkData.map((item: mainLinkDataTypes) => (
        <div className="grid justify-items-center" key={item.id}>
          <Link href={item.url} className="overflow-hidden">
            <Player
              className={`stroke-gray-600 stroke-1 drop-shadow-lg brightness-110 h-40 object-top object-none`}
              style={item.options}
              loop
              hover
              src={item.imgsrc}
            ></Player>
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
