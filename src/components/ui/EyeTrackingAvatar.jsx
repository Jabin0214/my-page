'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { getAssetPath } from '../../lib/assets';

const EyeTrackingAvatar = ({ chatUrl, bubbleText }) => {
  const frameRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const frameEl = frameRef.current;
    if (!frameEl) return;

    const handleMouseMove = (e) => {
      const rect = frameEl.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const moveEye = (eye, originX, originY) => {
        if (!eye) return;
        const dx = mouseX - originX;
        const dy = mouseY - originY;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(2, Math.hypot(dx, dy) / 15);
        const offsetX = Math.cos(angle) * dist;
        const offsetY = Math.sin(angle) * dist;
        eye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      };

      // 眼睛原始中心坐标（相对于容器）
      const leftEye = leftEyeRef.current;
      const rightEye = rightEyeRef.current;

      if (leftEye) {
        const leftX = 65 + 10 / 2; 
        const leftY = 95 + 10 / 2;
        moveEye(leftEye, leftX, leftY);
      }

      if (rightEye) {
        const rightX = 110 + 10 / 2;
        const rightY = 95 + 10 / 2;
        moveEye(rightEye, rightX, rightY);
      }
    };

    frameEl.addEventListener('mousemove', handleMouseMove);

    return () => {
      frameEl.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[15rem]">
      {showBubble && (
        <div className="absolute left-1/2 top-0 z-10 w-56 -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] rounded-2xl border border-[var(--line)] bg-white p-3 text-sm leading-6 text-[#526072] shadow-[0_16px_34px_rgba(15,23,42,0.12)]">
          <p className="text-sm leading-6">{bubbleText}</p>
        </div>
      )}

      <Link href={chatUrl} className="block">
        <div
          ref={frameRef}
          className="relative mx-auto h-[15rem] w-[15rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/80 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
          onMouseEnter={() => setShowBubble(true)}
          onMouseLeave={() => setShowBubble(false)}
        >
          <img
            src={getAssetPath('avatar/face.png')}
            alt="Jabin avatar"
            className="h-full w-full select-none object-contain"
          />

          <img
            src={getAssetPath('avatar/eye.png')}
            alt=""
            ref={leftEyeRef}
            className="absolute left-[4.55rem] top-[6.5rem] h-5 w-5"
          />
          <img
            src={getAssetPath('avatar/eye.png')}
            alt=""
            ref={rightEyeRef}
            className="absolute left-[7.7rem] top-[6.5rem] h-5 w-5"
          />
        </div>
      </Link>
    </div>
  );
};

export default EyeTrackingAvatar;
