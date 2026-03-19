'use client';

const BackgroundVisual = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.12),_transparent_30%),radial-gradient(circle_at_82%_14%,_rgba(59,130,246,0.1),_transparent_28%),linear-gradient(180deg,_#f7f9fc,_#eef3f7)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(circle at center, black 32%, transparent 88%)',
        }}
      />
    </div>
  );
};

export default BackgroundVisual;
