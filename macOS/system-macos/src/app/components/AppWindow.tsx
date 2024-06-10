//Not usable code//

// 'use client';
// import React, { useState, useRef, useEffect, MouseEvent } from 'react';

// interface AppWindowProps {
//   appName: string;
//   onClose: () => void;
// }

// const AppWindow: React.FC<AppWindowProps> = ({ appName, onClose }) => {
//   const [position, setPosition] = useState({ x: 500, y: 500 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [score, setScore] = useState(0);
//   const offset = useRef({ x: 0, y: 0 });

//   const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
//     offset.current = {
//       x: e.clientX - position.x,
//       y: e.clientY - position.y,
//     };
//     setIsDragging(true);
//   };

//   const handleMouseMove = (e: MouseEvent) => {
//     if (isDragging) {
//       setPosition({
//         x: e.clientX - offset.current.x,
//         y: e.clientY - offset.current.y,
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging]);

//   const incrementScore = () => {
//     setScore(score + 1);
//   };

//   return (
//     <div
//       className="absolute w-3/4 max-w-lg bg-white rounded-lg shadow-lg overflow-hidden"
//       style={{ top: position.y, left: position.x }}
//     >
//       <div
//         className="flex justify-between items-center p-2 bg-gray-200 border-b relative"
//         onMouseDown={handleMouseDown}
//       >
//         <div className="flex space-x-2">
//           <button
//             onClick={onClose}
//             className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white"
//           >
//           </button>
//           <button className="w-3 h-3 bg-yellow-500 rounded-full"></button>
//           <button className="w-3 h-3 bg-green-500 rounded-full"></button>
//         </div>
//         <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-black">
//           {appName}
//         </div>
//       </div>
//       <div className="p-4">
//         <p className="text-black">Welcome to {appName}!</p>
//         <div className="flex flex-col items-center">
//           <p className="text-2xl mb-4 text-black">Score: {score}</p>
//           <button
//             onClick={incrementScore}
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
//           >
//             Click me!
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppWindow;
