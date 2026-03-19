'use client';

import { FiDownload } from 'react-icons/fi';
import { SITE_CONFIG } from '../../config/site';
import { getAssetPath } from '../../lib/assets';

const DownloadButton = ({ className = '', label = 'Resume' }) => {
  const fileUrl = getAssetPath(SITE_CONFIG.contact.resumeFileName);

  return (
    <a
      href={fileUrl}
      download={SITE_CONFIG.contact.resumeFileName}
      aria-label="Download resume"
      className={`button-secondary ${className}`}
    >
      <FiDownload className="w-5 h-5" />
      <span>{label}</span>
    </a>
  );
};

export default DownloadButton;
