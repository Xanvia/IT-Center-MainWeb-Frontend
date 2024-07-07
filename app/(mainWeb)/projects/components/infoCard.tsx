import React from 'react';

interface InfoCardProps {
  id: number;
  text: string;
}

const InfoCard: React.FC<InfoCardProps> = (props) => {
  const isEvenId = props.id % 2 === 0;
  return (
    <div>
      <div className="hero bg-base-200 h-1/4 w-11/12 border-2 border-none border-red-500 mx-auto my-4 shadow-lg shadow-red-500/100">
        <div className={`hero-content ${isEvenId ? 'flex-col lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}>
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Defined Networking (SDN)</h1>
            <p className="py-6">
              {props.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
