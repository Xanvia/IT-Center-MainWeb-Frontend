interface HamButtonProps {
  sidebarOpen: string | boolean | undefined;
}

export const HamButton: React.FC<HamButtonProps> = ({ sidebarOpen }) => {
  return (
    <div className="relative block h-7 w-7 cursor-pointer">
      <span className="absolute right-0 h-full w-full">
        <span
          className={`block absolute left-0 top-0 my-1 h-0.5 w-full rounded-sm bg-black transition-all duration-300 ease-in-out dark:bg-white ${
            sidebarOpen ? "transform rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block absolute left-0 top-2 my-1 h-0.5 w-full rounded-sm bg-black transition-all duration-300 ease-in-out dark:bg-white ${
            sidebarOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block absolute left-0 top-4 my-1 h-0.5 w-full rounded-sm bg-black transition-all duration-300 ease-in-out dark:bg-white ${
            sidebarOpen ? "transform -rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </span>
    </div>
  );
};
