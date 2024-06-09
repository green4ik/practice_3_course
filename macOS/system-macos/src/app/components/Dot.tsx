import React from 'react';

interface DotProps {
  position: { x: number; y: number };
}

const Dot: React.FC<DotProps> = ({ position }) => {
  return (
    <div
      className="w-2 h-2 bg-red-500 rounded-full absolute"
      style={{ top: position.y + 70 , left: position.x + 29  }} // Позиционируем точку под окном приложения
    />
  );
};

export default Dot;