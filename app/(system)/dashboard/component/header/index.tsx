import Link from "next/link";

import Image from "next/image";
import { HamButton } from "@/app/(mainWeb)/components/buttons/hamButton";
import Selection from "./selection";

const Header = (props: {
  sidebarOpen: boolean;
  setSidebarOpen: (arg0: boolean) => void;
  serverSession?: any;
}) => {
  return (
    <header className="sticky flex top-0 z-30 w-full bg-white drop-shadow-md dark:bg-primary-dark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-2 py-4 shadow-lg md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 lg:hidden">
          {/* ham button  */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="block lg:hidden "
          >
            <HamButton isBlack isClicked={props.sidebarOpen} />
          </button>

          {/* logo  */}
          <Link href="/" className="hidden sm:block flex-shrink-0 lg:hidden">
            <Image
              width={75}
              height={75}
              src={"/logo/pera-logo.png"}
              alt="Logo"
              priority
            />
          </Link>
        </div>
        <div className="">
          <div className="font-rubik text-2xl">
            IT CENTER <span className="text-red-700">Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:gap-7">
          <Selection serverSession={props.serverSession} />
        </div>
      </div>
    </header>
  );
};

export default Header;
