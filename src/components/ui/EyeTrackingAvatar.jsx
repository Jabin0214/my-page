'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getAssetPath } from '../../lib/assets';

const EyeTrackingAvatar = ({ chatUrl, bubbleText }) => {
  const [showBubble, setShowBubble] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[15rem]">
      {showBubble && (
        <div className="absolute left-1/2 top-0 z-10 w-56 -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] rounded-2xl border border-[var(--line)] bg-white p-3 text-sm leading-6 text-[#526072] shadow-[0_16px_34px_rgba(15,23,42,0.12)]">
          <p className="text-sm leading-6">{bubbleText}</p>
        </div>
      )}

      <Link href={chatUrl} className="block">
        <div
          className="relative mx-auto h-[15rem] w-[15rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/80 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
          onMouseEnter={() => setShowBubble(true)}
          onMouseLeave={() => setShowBubble(false)}
        >
          <img
            src={getAssetPath('avatar/face.png')}
            alt="Jabin avatar"
            className="h-full w-full select-none object-contain"
          />
        </div>
      </Link>
    </div>
  );
};

export default EyeTrackingAvatar;
