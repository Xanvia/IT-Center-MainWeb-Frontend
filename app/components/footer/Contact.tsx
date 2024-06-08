import React from "react";

const Contact = () => {
  return (
    <div className="flex-auto flex-col mx-8 pt-2 pr-20">
      <div className="flex h-1/2">
        <div className="grid grid-cols-2 gap-1">
          <div>
            <p className="w-1/2 text-sm">Phone :</p>
          </div>
          <div>
            <p className="text-sm">
              +94 (0) 81 2384848
              <br />
              +94 (0) 81 2392070
              <br />
              +94 (0) 81 2392900
            </p>
          </div>
        </div>
      </div>
      <div className="flex pt-7 h-1/2">
        <p className="text-sm">
          Extention Line - 2900
          <br />
          info@ceit.pdn.ac.lk/ info.ceit@gs.pdn.ac.lk
          <br />
          www.ceit.pdn.ac.lk
        </p>
      </div>
    </div>
  );
};

export default Contact;
