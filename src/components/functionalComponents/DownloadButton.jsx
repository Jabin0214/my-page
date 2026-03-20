'use client';

import { Download } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { getAssetPath } from '../../lib/assets';

const DownloadButton = ({ className = '', label }) => {
  const fileUrl = getAssetPath(SITE_CONFIG.contact.resumeFileName);
  const accessibleLabel = label || SITE_CONFIG.contact.resumeFileName

  return (
    <a
      href={fileUrl}
      download={SITE_CONFIG.contact.resumeFileName}
      aria-label={accessibleLabel}
      className={`button-secondary ${className}`}
    >
      <Download className="w-5 h-5" />
      <span>{accessibleLabel}</span>
    </a>
  );
};

export default DownloadButton;
