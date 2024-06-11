import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import Draggable from 'react-draggable';

interface Game2048Props {
  onClose: () => void;
  id: number;
}

const placeRandomTile = (grid: number[][], numTiles: number, difficulty: string) => {
  const emptyTiles: [number, number][] = [];
  grid.forEach((row, i) => row.forEach((cell, j) => {
    if (cell === 0) emptyTiles.push([i, j]);
  }));
  for (let k = 0; k < numTiles; k++) {
    if (emptyTiles.length > 0) {
      const [row, col] = emptyTiles.splice(Math.floor(Math.random() * emptyTiles.length), 1)[0];
      let newValue;
      if (difficulty === 'easy') {
        newValue = Math.random() < 0.9 ? 2 : 4;
      } else if (difficulty === 'medium') {
        newValue = Math.random() < 0.5 ? 2 : 4;
      } else {
        newValue = Math.random() < 0.1 ? 2 : 4;
      }
      grid[row][col] = newValue;
    }
  }
};

const canMove = (grid: number[][]) => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) return true;
      if (col < 3 && grid[row][col] === grid[row][col + 1]) return true;
      if (row < 3 && grid[row][col] === grid[row + 1][col]) return true;
    }
  }
  return false;
};

const hasWon = (grid: number[][]) => {
  return grid.flat().includes(2048);
};

const Game2048: React.FC<Game2048Props> = ({ onClose, id }) => {
  const generateInitialGrid = (difficulty: string): number[][] => {
    const newGrid = Array(4).fill(0).map(() => Array(4).fill(0));
    const numTiles = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 4 : 6;
    placeRandomTile(newGrid, numTiles, difficulty);
    return newGrid;
  };

  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [grid, setGrid] = useState<number[][]>(generateInitialGrid('easy'));
  const [animations, setAnimations] = useState<string[][]>(Array(4).fill('').map(() => Array(4).fill('')));
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameOver || win || !difficulty) return;
      switch (event.key) {
        case 'ArrowUp':
          moveTiles('up');
          break;
        case 'ArrowDown':
          moveTiles('down');
          break;
        case 'ArrowLeft':
          moveTiles('left');
          break;
        case 'ArrowRight':
          moveTiles('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [grid, gameOver, win, difficulty]);

  const moveTiles = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver || win) return;

    const newGrid = [...grid.map(row => [...row])];
    const newAnimations = Array(4).fill('').map(() => Array(4).fill(''));
    let moved = false;

    const combineRow = (row: number[], rowIndex: number, isReversed: boolean) => {
      let newRow = row.filter(val => val);
      while (newRow.length < 4) newRow.push(0);
      for (let j = 0; j < 3; j++) {
        if (newRow[j] === newRow[j + 1] && newRow[j] !== 0) {
          newRow[j] *= 2;
          newRow[j + 1] = 0;
          newAnimations[rowIndex][isReversed ? 3 - j : j] = 'tile-merge';
        }
      }
      newRow = newRow.filter(val => val);
      while (newRow.length < 4) newRow.push(0);
      return newRow;
    };

    if (direction === 'left' || direction === 'right') {
      for (let i = 0; i < 4; i++) {
        let row = newGrid[i];
        const isReversed = direction === 'right';
        if (isReversed) row = row.reverse();
        const newRow = combineRow(row, i, isReversed);
        if (isReversed) newGrid[i] = newRow.reverse();
        else newGrid[i] = newRow;
        moved = moved || JSON.stringify(newGrid[i]) !== JSON.stringify(grid[i]);
        if (direction === 'right') {
          newGrid[i].forEach((val, j) => {
            if (val !== grid[i][3 - j]) newAnimations[i][3 - j] = 'tile-move';
          });
        } else {
          newGrid[i].forEach((val, j) => {
            if (val !== grid[i][j]) newAnimations[i][j] = 'tile-move';
          });
        }
      }
    } else if (direction === 'up' || direction === 'down') {
      for (let i = 0; i < 4; i++) {
        let col = newGrid.map(row => row[i]);
        const isReversed = direction === 'down';
        if (isReversed) col = col.reverse();
        const newCol = combineRow(col, i, isReversed);
        if (isReversed) newCol.reverse();
        newCol.forEach((val, j) => newGrid[j][i] = val);
        moved = moved || JSON.stringify(newGrid.map(row => row[i])) !== JSON.stringify(grid.map(row => row[i]));
        if (direction === 'down') {
          newGrid.forEach((row, j) => {
            if (row[i] !== grid[3 - j][i]) newAnimations[3 - j][i] = 'tile-move';
          });
        } else {
          newGrid.forEach((row, j) => {
            if (row[i] !== grid[j][i]) newAnimations[j][i] = 'tile-move';
          });
        }
      }
    }

    if (moved) {
      const numTilesToPlace = difficulty === 'hard' ? 2 : 1;
      placeRandomTile(newGrid, numTilesToPlace, difficulty!);
      setGrid(newGrid);
      setAnimations(newAnimations);
      if (hasWon(newGrid)) {
        setWin(true);
      } else if (!canMove(newGrid)) {
        setGameOver(true);
      }
    }
  };

  const startGame = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
    setGrid(generateInitialGrid(selectedDifficulty));
  };

  const restartGame = () => {
    setDifficulty(null);
    setGrid(generateInitialGrid('easy'));
    setAnimations(Array(4).fill('').map(() => Array(4).fill('')));
    setGameOver(false);
    setWin(false);
  };

  if (!difficulty) {
    return (
      <Draggable>
      <div
        className="absolute w-3/4 max-w-lg bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ top: 100, left: 100 }}
      >
        <div className="flex justify-between items-center p-2 bg-gray-200 border-b relative">
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white"
            ></button>
            <button className="w-3 h-3 bg-yellow-500 rounded-full"></button>
            <button className="w-3 h-3 bg-green-500 rounded-full"></button>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-black">
            2048 Game
          </div>
        </div>
        <div className="p-4 text-center">
          <h2 className="text-2xl mb-4">Select Difficulty</h2>
          <button
            onClick={() => startGame('easy')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg m-2"
          >
            Easy
          </button>
          <button
            onClick={() => startGame('medium')}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg m-2"
          >
            Medium
          </button>
          <button
            onClick={() => startGame('hard')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg m-2"
          >
            Hard
          </button>
        </div>
      </div>
      </Draggable>
    );
  }

  return (
    <Draggable>
    <div
      className="absolute w-3/4 max-w-lg bg-white rounded-lg shadow-lg overflow-hidden"
      style={{ top: 100, left: 100 }}
    >
      <div className="flex justify-between items-center p-2 bg-gray-200 border-b relative">
        <div className="flex space-x-2">
          <button
            onClick={onClose}
            className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white"
          ></button>
          <button className="w-3 h-3 bg-yellow-500 rounded-full"></button>
          <button className="w-3 h-3 bg-green-500 rounded-full"></button>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-black">
          2048 Game
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {grid.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <Tile key={`${rowIndex}-${colIndex}`} value={value} animation={animations[rowIndex][colIndex]} />
            ))
          )}
        </div>
        {(gameOver || win) && (
          <div className="text-center text-2xl mt-4">
            {win ? 'Congratulations! You won!' : 'Game Over!'}
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg m-2"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
    </Draggable>
  );
};

export default Game2048;
