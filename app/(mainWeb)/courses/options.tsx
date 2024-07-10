import React from "react";

export const Options = () => {
  return (
    <div className="flex">
      <div className="flex-none w-20 h-14 ...">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn mx-5 border-base-300">
            All
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="grow h-14 px-3 ml-2">
        <div className="flex form-control">
          <input
            type="text"
            placeholder="Search"
            className="input border-base-300"
          />
        </div>
      </div>
      <div className="flex-none w-14 h-14 mr-12">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn mx-5 border-base-300">
            View
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
