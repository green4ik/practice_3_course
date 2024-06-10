'use client';
import React, { useState, useRef, useEffect, MouseEvent } from 'react';

interface ClickerGameProps {
  onClose: () => void;
  id: number;
}

const ClickerGame: React.FC<ClickerGameProps> = ({ onClose, id }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [score, setScore] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [passiveIncome, setPassiveIncome] = useState(0);
  const [upgradeCost, setUpgradeCost] = useState(10); 
  const [incomeUpgradeCost, setIncomeUpgradeCost] = useState(50); 
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
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

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prevScore => prevScore + passiveIncome);
    }, 1000);
    return () => clearInterval(interval);
  }, [passiveIncome]);

  const incrementScore = () => {
    setScore(score + clickValue);
  };

  const upgradeClick = () => {
    if (score >= upgradeCost) {
      setScore(score - upgradeCost);
      setClickValue(clickValue + 1);
      setUpgradeCost(upgradeCost * 2); 
    }
  };

  const upgradeIncome = () => {
    if (score >= incomeUpgradeCost) {
      setScore(score - incomeUpgradeCost);
      setPassiveIncome(passiveIncome + 1);
      setIncomeUpgradeCost(incomeUpgradeCost * 2); 
    }
  };

  return (
    <div
      className="absolute w-3/4 max-w-lg bg-white rounded-lg shadow-lg overflow-hidden"
      style={{ top: position.y, left: position.x }}
    >
      <div
        className="flex justify-between items-center p-2 bg-gray-200 border-b relative"
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
        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-black">
          Clicker Game
        </div>
      </div>
      <div className="p-4">
        <p className="text-black">Welcome to Clicker Game!</p>
        <div className="flex flex-col items-center">
          <p className="text-2xl mb-4 text-black">Score: {score}</p>
          <button
            onClick={incrementScore}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Click me!
          </button>
          <div className="mt-4">
            <button
              onClick={upgradeClick}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 mb-2"
              disabled={score < upgradeCost}
            >
              Upgrade Click (+1) - Cost: {upgradeCost}
            </button>
            <button
              onClick={upgradeIncome}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
              disabled={score < incomeUpgradeCost}
            >
              Upgrade Income (+1/sec) - Cost: {incomeUpgradeCost}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickerGame;
