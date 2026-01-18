'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { parseVideoUrl } from '../../lib/VideoUtils';
// import { parseVideoUrl } from '@/lib/videoUtils';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title,
}: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const videoInfo = parseVideoUrl(videoUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-zinc-300 transition-colors"
          aria-label="Close video"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Video Container */}
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          {videoInfo.embedUrl ? (
            <>
              {videoInfo.type === 'youtube' && (
                <iframe
                  src={videoInfo.embedUrl}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}

              {videoInfo.type === 'vimeo' && (
                <iframe
                  src={videoInfo.embedUrl}
                  title={title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-xl mb-2">Unable to load video</p>
                <p className="text-sm text-zinc-400">
                  Please check the video URL
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Video Title */}
        <div className="mt-4 text-white">
          <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
        </div>
      </div>
    </div>
  );
}
