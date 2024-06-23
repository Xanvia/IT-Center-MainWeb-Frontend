"use client";

import { mainLinkData } from "@/constants/mainLinksData";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

export const MainLink: React.FC = ({}) => {
  return mainLinkData.map((items) => (
    <div className="grid justify-items-center" id={items.headline}>
      <Link href={items.url} className="overflow-hidden">
        <Player
          className={`stroke-gray-600 stroke-1 drop-shadow-lg brightness-110 h-40 object-top object-none ${items.options}`}
          loop
          hover
          src={items.imgsrc}
        ></Player>
      </Link>
      <div className="p-2 grid justify-items-center">
        <Link href={items.url}>
          <h5 className="mb-2 text-lg uppercase tracking-wider text-gray-600 hover:text-yellow-600 relative z-10">
            {items.headline}
          </h5>
        </Link>
        <p className="mx-5 text-center font-light text-sm text-gray-700 dark:text-gray-400 max-w-80">
          {items.description}
        </p>
      </div>
    </div>
  ));
};
