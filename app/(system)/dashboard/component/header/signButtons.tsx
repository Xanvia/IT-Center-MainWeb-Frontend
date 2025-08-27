import { Button } from "@nextui-org/react";
import Link from "next/link";

interface props {
  reservation?: boolean;
}

export const SignButtons = ({ reservation }: props) => {
  return (
    <div className="flex gap-2">
      {reservation && (
        <div className="pl-5">
          <Link href={"/dashboard"}>
            <Button
              className={`text-white  ${
                reservation ? " bg-yellow-500" : " bg-maroon "
              }`}
              size={reservation ? "sm" : "md"}
            >
              Dashboard
            </Button>
          </Link>
        </div>
       )} 
      <div >
        <Link href={"/auth/signin"}>
          <Button
            className={`text-white sm:block hidden ${
              reservation ? " bg-yellow-500" : " bg-maroon "
            }`}
            size={reservation ? "sm" : "md"}
          >
            Login
          </Button>
        </Link>
      </div>
      <div>
        <Link href={"/auth/signup"}>
          <Button
            size={reservation ? "sm" : "md"}
            variant="bordered"
            className={`border-maroon text-maroon ${
              reservation ? "border-yellow-500 text-yellow-500" : ""
            }`}
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};
