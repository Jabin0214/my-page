import React, { useRef, useEffect, useState } from 'react';

const EyeTrackingAvatar = ({ containerRef }) => {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (!containerRef?.current) return;

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
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

    const containerEl = containerRef.current;
    containerEl.addEventListener('mousemove', handleMouseMove);

    return () => {
      containerEl.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef]);

  return (
    <div className="relative w-64 h-64 mx-auto">
      
      {/* 从右侧冒出的对话泡泡 */}
      {showBubble && (
        <div className="absolute z-10 p-3 rounded-lg shadow-md max-w-xs top-3 -right-48 bg-black">
          {/* 左侧指向头像的三角形 */}
          <p className="text-sm">Feeling bored? Click me — let’s have a chat!</p>
        </div>
      )}

      <a href='https://cyber-jabin.vercel.app/' target="_blank" rel="noopener noreferrer">

      {/* 头像和眼睛 */}
      <div 
        className="relative w-[200px] h-[200px] mx-auto pointer-events-none select-none"
        onMouseEnter={() => setShowBubble(true)}
        onMouseLeave={() => setShowBubble(false)}
        onClick={() => setShowBubble(!showBubble)}
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      >
        <img
          src={import.meta.env.BASE_URL + "avatar/face.png"}
          alt="avatar"
          className="w-full h-full"
        />

        <img
            src={import.meta.env.BASE_URL + "avatar/eye.png"}
          alt="eye"
          ref={leftEyeRef}
          className="w-5 h-5 absolute top-[95px] left-[62px]"
        />
        <img
          src={import.meta.env.BASE_URL + "avatar/eye.png"}
          alt="eye"
          ref={rightEyeRef}
          className="w-5 h-5 absolute top-[95px] left-[112px]"
        />
        </div>
        
      </a>
    </div>
  );
};

export default EyeTrackingAvatar;