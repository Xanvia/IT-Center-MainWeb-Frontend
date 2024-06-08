import React from "react";
import LogoTagLine from "./LogoTagLine";
import SocialMedia from "./SocialMedia";
import Contact from "./Contact";
import CopyRight from "./CopyRight";

const Footer = () => {
  return (
    <div className="bg-maroon">
      <div className="flex mx-8 py-6">
        <div className="flex-auto flex-col pl-20 mx-6 w-1/3">
          <div className=" h-3/4">
            <LogoTagLine />
            {/*<div className="flex-auto bg-red-900">one</div>
          <div className="flex-auto bg-red-300">second</div>*/}
          </div>
          <div className="footer text-base-content h-1/4 pt-5">
            <SocialMedia />
          </div>
        </div>
        <div className="flex  footer px-10 pt-2 w-1/3 text-teal-300">
          <nav className="flex-auto mx-6">
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav className="flex-auto mx-6">
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
        </div>
        <Contact />
      </div>
      <CopyRight />
    </div>
  );
};

export default Footer;
