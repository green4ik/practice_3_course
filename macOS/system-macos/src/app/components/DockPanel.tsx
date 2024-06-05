'use client'
import React, { useState } from 'react';
import Launchpad from './Launchpad';

const apps = [
  { name: 'Finder', icon: 'image/icons/dock/finder.png' },
  { name: 'Launchpad', icon: 'image/icons/dock/launchpad.png' },
  { name: 'Safari', icon: 'image/icons/dock/safari.png' },
  { name: 'AppStore', icon: 'image/icons/dock/appstore.png' },
  { name: 'Calculator', icon: 'image/icons/dock/calculator.png' },
  { name: 'Calendar', icon: 'image/icons/dock/calendar.png' },
  { name: 'Music', icon: 'image/icons/dock/music.png' },

];

interface DockPanelProps {
  onLaunchpadClick: () => void;
  onAppOpen: () => void;
}

const DockPanel: React.FC<DockPanelProps> = ({ onLaunchpadClick, onAppOpen }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const handleClick = (appName: string) => {
    if (appName === 'Launchpad') {
      onLaunchpadClick();
    } else {
      onAppOpen();
    }
  };

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-40 
      backdrop-blur-lg py-1 px-3 rounded-xl flex justify-center items-end transition-all shadow-innner "   
    >
      {apps.map((app, index) => (
        <div
          key={index}
          className="relative group "
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={()=>handleClick(app.name)}///потрібно вставити
        >
          <div
            className={`flex flex-col items-center transform duration-[300ms] origin-bottom-left   ${
              hoveredIndex === index ? 'scale-[2.0]  mr-16' : ''
            } ${ 
              hoveredIndex === index - 1 
                ? 'scale-150 mr-8'
                : ''
            }`}
          >
            <img src={app.icon} alt={app.name} className="w-16 h-16" />
          </div>
          <div
            className={`absolute bottom-full mb-16 hidden 
            group-hover:block text-black text-lg py-1 px-2 rounded-t-lg bg-gray-100 bg-opacity-50 
            transform -translate-x-1/2 font-mono`}
            style={{ left: '50%' }}
          >
            {app.name}
            <div className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-100 border-opacity-50"></div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default DockPanel;
