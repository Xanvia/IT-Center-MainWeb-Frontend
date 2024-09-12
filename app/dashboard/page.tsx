import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { shortcuts } from "@/constants/dashboardShortcuts";

const isAdmin = () => true; // Set to false to see non-admin view

export default function Home() {
  const primaryShortcuts = shortcuts.filter((s) => s.primary);
  const secondaryShortcuts = shortcuts.filter(
    (s) => !s.primary && (!s.adminOnly || isAdmin())
  );
  return (
    <main className="">
      <h1 className="font-rubik text-5xl my-5 text-gray-600">Good Morning!</h1>
      {/* Primary shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {primaryShortcuts.map((shortcut) => (
          <Link key={shortcut.name} href={shortcut.href} passHref>
            <Card isPressable className="w-full h-full">
              <CardBody className="p-0">
                <Image
                  src={shortcut.visual}
                  alt={`${shortcut.name} illustration`}
                  className="w-full object-cover h-40"
                />
              </CardBody>
              <CardFooter className="flex-col items-center p-4">
                <shortcut.icon className="w-8 h-8 mb-2" />
                <p className="text-lg font-semibold">{shortcut.name}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {/* Secondary shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {secondaryShortcuts.map((shortcut) => (
          <Link key={shortcut.name} href={shortcut.href} passHref>
            <Card isPressable className="w-full h-full">
              <CardBody className="p-0">
                <Image
                  src={shortcut.visual}
                  alt={`${shortcut.name} illustration`}
                  className="w-full object-cover h-24"
                />
              </CardBody>
              <CardFooter className="flex-col items-center p-2">
                <shortcut.icon className="w-6 h-6 mb-1" />
                <p className="text-sm text-center">{shortcut.name}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
