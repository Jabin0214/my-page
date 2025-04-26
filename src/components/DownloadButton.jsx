import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DownloadButton = () => {
  const [hovered, setHovered] = useState(false);

  const fileUrl = 'public/resume.pdf';
  const fileName = 'resume.pdf';

  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-black border-2 border-black bg-transparent overflow-hidden transition-all duration-500 ease-in-out hover:text-white hover:bg-black hover:rounded-xl active:scale-95"
    >
      {/* 背景扩展圆 */}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: hovered ? 12 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="absolute inset-0 bg-black rounded-full z-0"
      />
      {/* 呼吸效果圆 */}
      <motion.span
        className="absolute w-12 h-12 bg-black opacity-20 rounded-full z-0"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      {/* 左箭头 */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-5 h-5 text-current z-10"
        initial={{ x: '-150%' }}
        animate={{ x: hovered ? '0%' : '-150%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <path d="M16.17 11H4v2h12.17l-5.36 5.36 1.41 1.41L20 12l-7.78-7.78-1.41 1.41z" />
      </motion.svg>

      {/* 中间文字 */}
      <span className="relative z-10 transition-transform duration-500 ease-in-out">
        Download
      </span>

      {/* 右箭头 */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-5 h-5 text-current z-10"
        initial={{ x: '150%' }}
        animate={{ x: hovered ? '0%' : '150%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <path d="M16.17 11H4v2h12.17l-5.36 5.36 1.41 1.41L20 12l-7.78-7.78-1.41 1.41z" />
      </motion.svg>
    </button>
  );
};

export default DownloadButton;