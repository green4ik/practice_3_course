import React, { useEffect, useState } from 'react';

interface TileProps {
  value: number;
  animation: string;
}

const Tile: React.FC<TileProps> = ({ value, animation }) => {
  const getTileColor = (value: number): string => {
    switch (value) {
      case 2: return 'bg-gray-200';
      case 4: return 'bg-gray-300';
      case 8: return 'bg-yellow-300';
      case 16: return 'bg-yellow-400';
      case 32: return 'bg-orange-500';
      case 64: return 'bg-orange-600';
      case 128: return 'bg-red-500';
      case 256: return 'bg-red-600';
      case 512: return 'bg-purple-500';
      case 1024: return 'bg-purple-600';
      case 2048: return 'bg-green-500';
      default: return 'bg-gray-100';
    }
  };

  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (animation) {
      setAnimationClass(animation);
      const timeout = setTimeout(() => setAnimationClass(''), 300); // Reset after animation
      return () => clearTimeout(timeout);
    }
  }, [animation]);

  return (
    <div className={`flex items-center justify-center w-20 h-20 ${getTileColor(value)} rounded-lg ${animationClass}`}>
      {value > 0 && <span className="text-2xl font-bold">{value}</span>}
    </div>
  );
};

export default Tile;
