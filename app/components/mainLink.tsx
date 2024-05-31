"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

interface MainLinkProps {
  imgSrc: string;
  heading: string;
}

export const MainLink: React.FC<MainLinkProps> = ({ imgSrc, heading }) => {
  return (
    <div className="grid justify-items-center">
      <Link href="#">
        <Player
          loop
          hover
          src={imgSrc}
          style={{ height: "175px", stroke: "#000", objectFit: "cover" }}
        ></Player>
        {/* <Image
          src={imgSrc}
          width={150}
          height={150}
          alt="link"
          className="border rounded-2xl "
        /> */}
      </Link>
      <div className="p-2 grid justify-items-center">
        <Link href="#">
          <h5 className="mb-2 text-lg uppercase tracking-wider text-gray-600">
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
