import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi'; // 引入下载图标

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
    <motion.button
      onClick={handleDownload}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-white bg-black transition-all duration-300 ease-in-out hover:bg-gray-800 active:scale-95 shadow-md"
      style={{ boxShadow: '4px 4px 0 #000' }}
      whileHover={{ y: -2, boxShadow: '6px 6px 0 #000' }}
      whileTap={{ scale: 0.95 }}
    >
      <FiDownload className="w-5 h-5" />
      <span>Download CV</span>
    </motion.button>
  );
};

export default DownloadButton;