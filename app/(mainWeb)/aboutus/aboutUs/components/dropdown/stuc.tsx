import React, { FC } from "react";

interface HeadlineWithDropdownProps {
  headline: string;
  description: string;
}

const HeadlineWithDropdown: FC<HeadlineWithDropdownProps> = ({
  headline,
  description,
}) => {
  return (
    <div className="flex flex-col items-center p-5 gap-5">
      <h2 style={{ cursor: "pointer" }}>
        <div className=" w-44 h-44 px-3 bg-gray-300 shadow-md rounded-lg text-center flex items-center">
          {headline}
        </div>
      </h2>

      <p className="w-96 px-3 bg-gray-400 shadow-md rounded-lg text-center mt-2">
        {description}
      </p>
    </div>
  );
};

export default HeadlineWithDropdown;
