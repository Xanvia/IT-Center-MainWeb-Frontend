import React from "react";
import LogoTagLine from "./LogoTagLine";
import SocialMedia from "./SocialMedia";
import Contact from "./Contact";

const Footer = () => {
  return (
    <footer className="bg-maroon">
      <div className="flex flex-col md:flex-row items-center md:py-24 py-4">
        <div className="flex-auto flex-col md:pl-10 mx-6">
          <div className="h-3/4">
            <LogoTagLine />
          </div>
          <div className="footer text-base-content h-1/4 pt-5">
            <SocialMedia />
          </div>
        </div>
        <div className="flex footer pt-5 md:w-1/3 text-gray-400 px-3">
          <nav className="flex-auto md:mx-6">
            <h6 className="footer-title text-yellow-300">Our Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav className="flex-auto md:mx-6 ">
            <h6 className="footer-title text-yellow-300">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav className="flex-auto md:mx-6 ">
            <h6 className="footer-title text-yellow-300">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
        </div>
        <Contact />
      </div>
      <p className="footer footer-center py-3 text-gray-500 text-sm">
        Copyright © 2024 - All right reserved by Information Technology Center
      </p>
    </footer>
  );
};

export default Footer;
