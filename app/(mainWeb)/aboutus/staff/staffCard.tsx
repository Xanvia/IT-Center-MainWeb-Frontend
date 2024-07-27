import React from "react";

export const StaffCard = () => {
  return (
    <div className="indicator">
      <span className="indicator-item badge border-1 border-slate-500 indicator-bottom indicator-center text-xs">
        Ext 2901
      </span>
      <div className="bg-white shadow-xl rounded-lg h-52 w-96 border-slate-500 border-1">
        <h4 className="text-center p-1">Director</h4>
        <hr className="h-divider w-80 mx-auto bg-gray-200 border-0" />
        <div className=" rounded-lg flex flex-row h-44 px-4 py-2 gap-2">
          <div className="avatar flex-none">
            <div className="w-28 h-28 rounded-full">
              <img src="/users/drUpul.png" />
            </div>
          </div>
          <div className=" w-max">
            <p className="text-sm">Dr. Upul Jayasinghe</p>
            <div className=" ">
              <p className="text-xs text-left">
                Ph.D (UK), M.Eng (Thailand), B.Sc (Moratuwa)
              </p>
              <div className="pl-2">
                <div className="pt-1.5 flex flex-row">
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div className="pl-2 text-xs">
                    <p>director@gmail.com</p>
                  </div>
                </div>
                <div className="pt-0.5 flex flex-row">
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                  </div>
                  <div className="pl-2 text-xs">
                    <p>+94 77 123 4567</p>
                    <p>+94 77 123 4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
