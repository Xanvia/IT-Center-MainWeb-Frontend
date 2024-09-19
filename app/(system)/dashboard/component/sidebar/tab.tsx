import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabProps {
  pathname: string;
  children: React.ReactNode;
}

export const Tab = ({ pathname, children }: TabProps) => {
  const path = usePathname();
  return (
    <Link
      href={pathname}
      className={`flex items-center gap-2 rounded-md px-4 py-2 duration-300 ease-in-out  ${
        path === pathname
          ? "bg-yellow-400 text-black"
          : "hover:bg-gray-400 hover:text-black"
      }`}
    >
      {children}
    </Link>
  );
};
