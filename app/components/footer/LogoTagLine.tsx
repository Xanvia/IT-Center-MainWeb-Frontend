import React from "react";
import Image from "next/image";

const LogoTagLine = () => {
  return (
    <aside>
      <Image
        src="/logo/ceitlogo.png"
        className="md:w-20 w-16 2xl:w-auto"
        width={50}
        height={50}
        alt="Logo"
      />
      <p className="font-sans text-base">
        <span className="text-lg">Information Technology Center</span>
        <br />
        University of Perdeniya
        <br />
        Sri lanka
      </p>
    </aside>
  );
};

export default LogoTagLine;
