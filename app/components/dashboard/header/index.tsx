import Link from "next/link";
import DropdownNotification from "./notification";
import DropdownProfile from "./profile";
import Image from "next/image";
import { HamButton } from "../../buttons/hamButton";
// import { HamButton } from "./hamButton";

const Header = (props: {
  sidebarOpen: boolean;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky flex top-0 z-10 w-full bg-white drop-shadow-md dark:bg-primary-dark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between lg:justify-end  px-4 py-4 shadow-lg md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* ham button  */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="block p-1.5 lg:hidden "
          >
            <HamButton isBlack isClicked={props.sidebarOpen} />
          </button>

          {/* logo  */}
          <Link href="/" className="block flex-shrink-0 lg:hidden">
            <Image
              width={75}
              height={75}
              src={"/logo/pera-logo.png"}
              alt="Logo"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-3 lg:gap-7">
          <ul className="flex items-center gap-2 sm:gap-4">
            <DropdownNotification />
          </ul>
          <DropdownProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
