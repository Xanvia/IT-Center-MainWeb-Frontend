import React from "react";

interface InfoCardProps {
  id: string;
  text: string;
}

const InfoCard: React.FC<InfoCardProps> = (props) => {
  const isEvenId = true; // props.id % 2 === 0;
  return (
    <div>
      <div className=" mx-auto my-4 h-1/4 w-9/12 hero bg-base-200  border-2 border-none border-gray-300 shadow-lg shadow-gray-300 rounded-lg">
        <div
          className={`hero-content ${
            isEvenId ? "flex-col lg:flex-row" : "flex-col lg:flex-row-reverse"
          }`}
        >
          <img
            src="https://media.licdn.com/dms/image/D5612AQFJ-aNtL0ODJw/article-cover_image-shrink_600_2000/0/1679422597271?e=2147483647&v=beta&t=BQVHkjmUhUBaY-rvHIVrQ8AZqolbed4GKB_r4qCJwmE"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-justify justify-start">
              Defined Networking (SDN)
            </h1>
            <p className="text-sm text-justify py-6">{props.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
