'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { ImageOff } from 'lucide-react';

type ServiceArtworkProps = {
  publicId: string | null;
  title: string;
  priority?: boolean;
  large?: boolean;
};

// Existing .env.local ka USERNAME field cloud name ke liye support kiya hai.
const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.NEXT_PUBLIC_CLOUDINARY_USERNAME;

export function ServiceArtwork({
  publicId,
  title,
  priority = false,
  large = false,
}: ServiceArtworkProps) {
  const [failedId, setFailedId] = useState<string | null>(null);

  // Documentation ka editable CSS mockup; real client project claim nahi hai.
  if (!publicId) {
    return (
      <div
        className="documentation-art"
        role="img"
        aria-label="Documentation concept placeholder: navy and cream document layouts"
      >
        <div className="document-sheet document-sheet-back">
          <span>CONTENTS</span>
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="document-sheet document-sheet-front">
          <span>ARSAL / EDITORIAL</span>
          <strong>
            Clarity,
            <br />
            on every
            <br />
            <em>page.</em>
          </strong>
          <div className="document-rule" />
          <small>GUIDES · REPORTS · DOCUMENTS</small>
        </div>
        <span className="documentation-label">CONCEPT PLACEHOLDER</span>
      </div>
    );
  }

  if (!cloudName || failedId === publicId) {
    return (
      <div
        className="service-image-fallback"
        role="img"
        aria-label={`${title} preview unavailable`}
      >
        <ImageOff size={28} />
        <span>{title}</span>
        <small>Preview temporarily unavailable</small>
      </div>
    );
  }

  // Animated hero par Cloudinary resize all-frame pixel limit hit karta hai.
  // Original file use karein taake motion bhi preserve rahe.
  if (publicId === 'LGAH') {
    return (
      <Image
        src={`https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`}
        alt={title}
        width={800}
        height={800}
        unoptimized
        priority={priority}
        className="service-cloud-image"
        onError={() => setFailedId(publicId)}
      />
    );
  }

  return (
    <CldImage
      config={{ cloud: { cloudName } }}
      src={publicId}
      alt={title}
      width={large ? 1600 : 800}
      height={large ? 1600 : 800}
      sizes={large ? '(max-width: 700px) 90vw, 80vw' : '(max-width: 700px) 90vw, 45vw'}
      priority={priority}
      className="service-cloud-image"
      onError={() => setFailedId(publicId)}
    />
  );
}
