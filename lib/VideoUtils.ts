// lib/videoUtils.ts

export type VideoType = 'youtube' | 'vimeo' | 'unknown';

export interface VideoInfo {
  type: VideoType;
  id: string | null;
  embedUrl: string | null;
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

/**
 * Extracts Vimeo video ID from various Vimeo URL formats
 */
export function getVimeoVideoId(url: string): string | null {
  const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
  const match = url.match(regExp);
  return match ? match[5] : null;
}

/**
 * Detects video type and returns video information
 */
export function parseVideoUrl(url: string): VideoInfo {
  // Check for YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = getYouTubeVideoId(url);
    return {
      type: 'youtube',
      id,
      embedUrl: id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null,
    };
  }

  // Check for Vimeo
  if (url.includes('vimeo.com')) {
    const id = getVimeoVideoId(url);
    return {
      type: 'vimeo',
      id,
      embedUrl: id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null,
    };
  }

  return {
    type: 'unknown',
    id: null,
    embedUrl: null,
  };
}
