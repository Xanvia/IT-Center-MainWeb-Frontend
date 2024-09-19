import { Button } from "@nextui-org/react";
import Link from "next/link";

export const SignButtons = () => {
  return (
    <div className="flex gap-2">
      <div>
        <Link href={"/auth/signin"}>
          <Button className="text-white bg-maroon sm:block hidden">
            Login
          </Button>
        </Link>
      </div>
      <div>
        <Link href={"/auth/signup"}>
          <Button variant="bordered" className="border-maroon text-maroon">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};
