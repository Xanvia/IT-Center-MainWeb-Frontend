import React, { useState, FC } from 'react';

interface HeadlineWithDropdownProps {
  headline: string;
  description: string;
}

const HeadlineWithDropdown: FC<HeadlineWithDropdownProps> = ({ headline, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex flex-col items-center m-4 gap-4'>
      <h2 onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
        <div className=' w-24 px-3 bg-gray-300 shadow-md rounded-lg text-center'>
            {headline}
        </div>
      </h2>
      {isOpen && <p className='w-96 px-3 bg-gray-400 shadow-md rounded-lg text-center mt-2'>{description}</p>}
    </div>
  );
};

export default HeadlineWithDropdown;
