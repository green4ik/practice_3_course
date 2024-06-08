'use client';
import React, { useEffect, useState } from 'react';
import styles from "./window.module.css";
import Image from 'next/image';
import AppleLogo from '../../app/assets/images/Apple Logo.png';
import MenuLabel from '../../app/assets/images/Menu Label.png';

interface MenuBarProps {
  appName: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ appName }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [menuType, setMenuType] = useState('');

  const openContextMenu = (param: string) => {
    setMenuType(param);
  };

  const closeContextMenu = () => {
    setMenuType('');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const hours = date.getHours();
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');  
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    
    return `${day} ${month} ${dayOfMonth} ${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div className="bg-white bg-opacity-50 h-8 flex items-center justify-between px-4 relative">
      <div className="flex items-center space-x-4">
        <div className="text-black">
          <Image src={AppleLogo} alt="Apple Logo" width={16} height={16} />
        </div>
        <div 
          className="text-black rounded-md font-bold relative hover:bg-opacity-25 py-1 hover:border-2 border-orange-300"
          onMouseEnter={() => openContextMenu(appName.toLowerCase())} 
        >
          {appName}
          {menuType === appName.toLowerCase() && (
            <div className="font-normal absolute left-0 top-8 bg-blue-200 text-white rounded-md shadow-lg opacity-85 w-60 flex items-center flex-col" onMouseLeave={() => closeContextMenu()}>
              <div className="text-black px-4 my-1 mt-2 hover:bg-orange-400 rounded-md cursor-pointer w-52">Hide Others</div>
              <div className="text-black px-4 my-1 hover:bg-orange-400 rounded-md cursor-pointer w-52 opacity-100 ">About {appName}</div>
              <div className="text-black px-4 my-1 hover:bg-orange-400 rounded-md cursor-pointer w-52">Preferences</div>
              <div className="text-black px-4 my-1 hover:bg-orange-400 rounded-md cursor-pointer w-52">Empty Trash</div>
              <div className="text-black px-4 my-1 hover:bg-orange-400 rounded-md cursor-pointer w-52">Hide {appName}</div>
              <div className="text-black px-4 my-1 mb-2 text-gray-500 rounded-md cursor-default w-52">Show All</div>
            </div>
          )}
        </div>
        <div className="text-black">File</div>
        <div className="text-black">Edit</div>
        <div className="text-black">View</div>
        <div className="text-black">Go</div>
        <div className="text-black">Window</div>
        <div className="text-black">Help</div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-black">
          <Image src={MenuLabel} alt="Menu Label" width={16} height={16} />
        </div>
        <div className="text-black">
          {formatDate(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;