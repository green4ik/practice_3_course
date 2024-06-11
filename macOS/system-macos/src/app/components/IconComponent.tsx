'use client'
import React from 'react';

interface IconComponentProps {
  name: string;
  icon: string;
  onAppOpen: (appName: string) => void;
}

const IconComponent: React.FC<IconComponentProps> = ({ name, icon,onAppOpen  }) => {
  const handleClick = () => {
    onAppOpen(name); // Викликаємо функцію onAppOpen, передаючи їй назву програми
  };
  return (
    <div className="flex flex-col items-center justify-center w-20 h-27 m-0 " onClick={handleClick}>
      <img src={icon} alt={name} className="w-18 h-18 hover:scale-105 duration-200" />
      <span className="mt-0 text-sm font-medium text-center text-white leading-tight h-9 ">
  {name}
</span>

    </div>
  );
};

export default IconComponent;
