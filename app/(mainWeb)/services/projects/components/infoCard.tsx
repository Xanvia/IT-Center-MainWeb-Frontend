import React from "react";
import Info from "../information/info";

interface InfoCardProps {
  id: number;
  title: string;
  des: string;
  date: string;
  img: string;
}

const InfoCard: React.FC<InfoCardProps> = (props) => {
  const isEvenId = props.id % 2 === 0;
  return (
    <div>
      <div className=" mx-auto my-4 h-1/4 w-9/12 hero bg-base-200  border-2 border-none border-gray-300 shadow-lg shadow-gray-300 rounded-lg">
        <div
          className={`hero-content ${
            isEvenId ? "flex-col lg:flex-row" : "flex-col lg:flex-row-reverse"
          }`}
        >
          <img src={props.img} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-justify justify-start">
              Defined Networking (SDN)
            </h1>
            <p className="text-sm text-justify py-6">{props.title}</p>
            <p className="text-sm text-justify py-6">{props.des}</p>
            <p className="text-sm text-justify py-6">{props.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
