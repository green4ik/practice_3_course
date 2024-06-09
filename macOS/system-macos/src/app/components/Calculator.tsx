'use client';
import React, { useState, useRef, useEffect, MouseEvent } from 'react';

interface CalculatorProps {
  onClose: () => void;
  id: number;
}

const Calculator: React.FC<CalculatorProps> = ({ onClose, id }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [pendingValue, setPendingValue] = useState('');
  const [operator, setOperator] = useState('');
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
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

  const handleDigitClick = (digit: string) => {
    if (displayValue === '0') {
      setDisplayValue(digit);
    } else {
      setDisplayValue(displayValue + digit);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (operator) {
      performCalculation();
    } else {
      setPendingValue(displayValue);
      setDisplayValue('0');
    }
    setOperator(op);
  };

  const performCalculation = () => {
    const num1 = parseFloat(pendingValue);
    const num2 = parseFloat(displayValue);
    let result = 0;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      default:
        break;
    }

    setDisplayValue(result.toString());
    setPendingValue('');
    setOperator('');
  };

  const handleClear = () => {
    setDisplayValue('0');
    setPendingValue('');
    setOperator('');
  };

  const handleEqualClick = () => {
    if (operator) {
      performCalculation();
    }
  };

  return (
    <div
      className="absolute w-3/4 max-w-md bg-white rounded-lg shadow-lg overflow-hidden"
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
          Calculator
        </div>
      </div>
      <div className="p-4 select-none">
        <div className="bg-gray-100 text-black text-right p-4 rounded mb-4 text-2xl">
          {displayValue}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/'].map((char) => (
            <button
              key={char}
              onClick={() => (char >= '0' && char <= '9') ? handleDigitClick(char) : handleOperatorClick(char)}
              className="bg-gray-300 p-4 rounded text-black text-xl"
            >
              {char}
            </button>
          ))}
          {['4', '5', '6', '*'].map((char) => (
            <button
              key={char}
              onClick={() => (char >= '0' && char <= '9') ? handleDigitClick(char) : handleOperatorClick(char)}
              className="bg-gray-300 p-4 rounded text-black text-xl"
            >
              {char}
            </button>
          ))}
          {['1', '2', '3', '-'].map((char) => (
            <button
              key={char}
              onClick={() => (char >= '0' && char <= '9') ? handleDigitClick(char) : handleOperatorClick(char)}
              className="bg-gray-300 p-4 rounded text-black text-xl"
            >
              {char}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="bg-gray-300 p-4 rounded text-black text-xl"
          >
            C
          </button>
          <button
            onClick={() => handleDigitClick('0')}
            className="bg-gray-300 p-4 rounded text-black text-xl"
          >
            0
          </button>
          <button
            onClick={handleEqualClick}
            className="bg-gray-300 p-4 rounded text-black text-xl"
          >
            =
          </button>
          <button
            onClick={() => handleOperatorClick('+')}
            className="bg-gray-300 p-4 rounded text-black text-xl"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
