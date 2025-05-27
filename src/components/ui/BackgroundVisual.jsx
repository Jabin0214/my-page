import React from 'react';

const BackgroundVisual = () => {
  return (
    <div className="absolute inset-0 z-0 ">
      {/* 色块1 */}
      <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw]
                     bg-gradient-to-r from-purple-300 to-indigo-500 
                     rounded-full blur-3xl opacity-20 
                     animate-bg-move" />

      {/* 色块2 */}
      <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] 
                     bg-gradient-to-br from-pink-300 to-yellow-300 
                     rounded-full blur-2xl opacity-25 
                     animate-bg-move-fast" />

      {/* 色块3 */}
      <div className="absolute top-[60%] left-[70%] w-[40vw] h-[40vw] 
                     bg-gradient-to-tl from-sky-300 to-cyan-400 
                     rounded-full blur-2xl opacity-15 
                     animate-bg-move-reverse" />
    </div>
  );
};

export default BackgroundVisual;