import React from "react";
import SocialMedia from "../footerContent/socialMedia";
import Contact from "../footerContent/contact";
import Image from "next/image";
import Link from "next/link";
import {
  footerServicesLinks,
  footerLinksTypes,
  footerOurLinks,
  footerOtherLinks,
} from "@/constants/mainLinksData";

const Footer = () => {
  return (
    <footer className="bg-maroon">
      <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-0 items-center md:py-20 py-4">
        <div className="flex-col md:pl-10 mx-6 md:w-[30%]">
          <div className="h-3/4">
            <aside>
              <Image
                src="/logo/ceitlogo.png"
                className="w-20  2xl:w-auto"
                width={50}
                height={50}
                alt="Logo"
              />
              <p className="font-sans text-base text-gray-300">
                <span className="text-lg text-white">
                  Information Technology Center
                </span>
                <br />
                University of Perdeniya
                <br />
                Sri lanka
              </p>
            </aside>
          </div>
          <div className="footer text-base-content h-1/4 pt-5">
            <SocialMedia />
          </div>
        </div>
        <div className="flex justify-center px-5 md:px-0 footer pt-5 md:w-1/3 text-gray-400">
          <nav className="w-36 md:mx-3">
            <h6 className="footer-title text-yellow-300">Our Services</h6>
            {footerServicesLinks.map((item: footerLinksTypes) => (
              <Link key={item.id} href={item.url} className="overflow-hidden">
                {item.id}
              </Link>
            ))}
          </nav>
          <nav className="w-48 md:mx-3 ">
            <h6 className="footer-title text-yellow-300">Our Links</h6>
            {footerOurLinks.map((item: footerLinksTypes) => (
              <Link key={item.id} href={item.url} className="overflow-hidden">
                {item.id}
              </Link>
            ))}
          </nav>
          <nav className="w-44 md:mx-3 ">
            <h6 className="footer-title text-yellow-300">Other Links</h6>
            {footerOtherLinks.map((item: footerLinksTypes) => (
              <Link key={item.id} href={item.url} className="overflow-hidden">
                {item.id}
              </Link>
            ))}
          </nav>
        </div>
        <Contact />
      </div>
      <p className="footer footer-center py-3 text-gray-500 text-sm bg-darkmaroon">
        Copyright © 2025 - All right reserved by Information Technology Center -
        Developed by @Xanvia
      </p>
    </footer>
  );
};

export default Footer;
