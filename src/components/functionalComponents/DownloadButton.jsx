'use client';

import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { SITE_CONFIG } from '../../config/site';
import { getAssetPath } from '../../lib/assets';

const DownloadButton = () => {
  const fileUrl = getAssetPath(SITE_CONFIG.contact.resumeFileName);

  return (
    <motion.a
      href={fileUrl}
      download={SITE_CONFIG.contact.resumeFileName}
      aria-label="Download resume"
      className="relative inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-gray-800 bg-white transition-all duration-300 ease-in-out hover:bg-gray-100 active:scale-95 shadow-lg"
      style={{ boxShadow: '4px 4px 0 rgba(255,255,255,0.3)' }}
      whileHover={{ y: -2, boxShadow: '6px 6px 0 rgba(255,255,255,0.3)' }}
      whileTap={{ scale: 0.95 }}
    >
      <FiDownload className="w-5 h-5" />
      <span>Resume.pdf</span>
    </motion.a>
  );
};

export default DownloadButton;
