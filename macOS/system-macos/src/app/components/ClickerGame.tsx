'use client';
import React, { useState, useRef } from 'react';

interface ClickerGameProps {
  appName: string;
  onClose: () => void;
}

const ClickerGame: React.FC<ClickerGameProps> = ({ appName, onClose }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="absolute w-3/4 max-w-lg bg-white rounded-lg shadow-lg overflow-hidden"
      style={{ top: position.y, left: position.x }}
    >
      <div
        className="flex justify-between items-center p-2 bg-gray-200 border-b  relative"
        onMouseDown={handleMouseDown}
      >
        <div className="flex space-x-2">
          <button
            onClick={onClose}
            className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white"
          >
          
          </button>
          <button className="w-3 h-3 bg-yellow-500 rounded-full"></button>
          <button className="w-3 h-3 bg-green-500 rounded-full"></button>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold">
          {appName}
        </div>
      </div>
      <div className="p-4">
        {/* Content specific to {appName} can be added here */}
        <p>Welcome to {appName}!</p>
      </div>
    </div>
  );
};

export default ClickerGame;