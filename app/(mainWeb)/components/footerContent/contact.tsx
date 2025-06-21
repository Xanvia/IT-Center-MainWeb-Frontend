import { footerContact } from "@/CONSTANT_DATA/B.LinksData";
import React from "react";

const Contact = () => {
  return (
    <div className="flex md:flex-col md:mx-8 pt-2 md:pl-20 pl-10 text-gray-400">
      <div className="grid md:grid-cols-3  min-w-40 pt-4">
        <div className="col-span-1">
          <p className="w-1/4 text-sm text-yellow-600">Telephone:</p>
        </div>
        <div className="col-span-2 md:text-right translate-y-4">
          <p className="text-sm">
            {footerContact.mobile1}
            <br />
            {footerContact.mobile2}
            <br />
            {footerContact.mobile3 && footerContact.mobile3}
          </p>
        </div>
      </div>
      <div className="flex pt-7 h-1/2">
        <p className="text-sm">
          Extention Line - 2900
          <br />
          info@ceit.pdn.ac.lk
          <br />
          www.ceit.pdn.ac.lk
        </p>
      </div>
    </div>
  );
};

export default Contact;
