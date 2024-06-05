'use client'
import React from 'react';

interface IconComponentProps {
  name: string;
  icon: string;
}

const IconComponent: React.FC<IconComponentProps> = ({ name, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center w-20 h-27 m-0">
      <img src={icon} alt={name} className="w-18 h-18" />
      <span className="mt-0 text-sm font-medium text-center text-white leading-tight h-9 ">
  {name}
</span>

    </div>
  );
};

export default IconComponent;
