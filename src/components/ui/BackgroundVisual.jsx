'use client';

const BackgroundVisual = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_32%),radial-gradient(circle_at_20%_30%,_rgba(251,191,36,0.12),_transparent_24%),linear-gradient(180deg,_rgba(15,23,42,0.9),_rgba(3,7,18,0.98))]" />

      <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw]
                     bg-gradient-to-r from-cyan-300 to-blue-500 
                     rounded-full blur-3xl opacity-20 
                     animate-bg-move" />

      <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] 
                     bg-gradient-to-br from-amber-300 to-orange-300 
                     rounded-full blur-2xl opacity-25 
                     animate-bg-move-fast" />

      <div className="absolute top-[60%] left-[70%] w-[40vw] h-[40vw] 
                     bg-gradient-to-tl from-sky-300 to-emerald-300 
                     rounded-full blur-2xl opacity-15 
                     animate-bg-move-reverse" />
    </div>
  );
};

export default BackgroundVisual;
