"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

interface MainLinkProps {
  imgSrc: string;
  heading: string;
  options?: string;
}

export const MainLink: React.FC<MainLinkProps> = ({
  imgSrc,
  heading,
  options,
}) => {
  return (
    <div className="grid justify-items-center">
      <Link href="#">
        <Player
          className={`stroke-gray-600 stroke-1 drop-shadow-lg brightness-110 h-40 object-top object-none ${options}`}
          loop
          hover
          src={imgSrc}
        ></Player>
      </Link>
      <div className="p-2 grid justify-items-center">
        <Link href="#">
          <h5 className="mb-2 text-lg uppercase tracking-wider text-gray-600 hover:text-yellow-600 relative z-10">
            {heading}
          </h5>
        </Link>
        <p className="mx-5 text-center font-light text-sm text-gray-700 dark:text-gray-400 max-w-80">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  );
};
