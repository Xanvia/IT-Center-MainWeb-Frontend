import React from "react";

export const NCard = () => {
  return (
    <div className="bg-white shadow-xl rounded-lg">
      <figure>
        <img
          className="rounded-t-lg"
          src="https://circulareconomy.europa.eu/sites/default/files/home_news.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="p-4">
        <h3 className="text-justify justify-start">
          IT Center Annual Get-Together 2023
        </h3>
        <br />
        <p className="text-sm text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          exercitationem totam eligendi odit vitae quis sapiente impedit, quasi
          id debitis labore soluta iure nisi nulla repellat rerum magni eaque
          aliquid.
        </p>
        <br />
        <p className="text-end text-xs">Published on 23rd Jun 2024</p>
      </div>
    </div>
  );
};
