"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, publicFetch } from "../../../../lib/api";

interface Reel {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  videoLink: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ReelResponse {
  success: boolean;
  data: Reel;
}

type VideoType = 'youtube' | 'vimeo' | 'unknown';

interface VideoInfo {
  type: VideoType;
  id: string | null;
  embedUrl: string | null;
}

// Extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Extract Vimeo video ID
function getVimeoVideoId(url: string): string | null {
  const regex = /(?:vimeo\.com\/)(?:.*\/)?(\d+)(?:\?.*)?/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Parse video URL and detect type
function parseVideoUrl(url: string): VideoInfo {
  // Check for YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = getYouTubeVideoId(url);
    return {
      type: 'youtube',
      id,
      embedUrl: id ? `https://www.youtube.com/embed/${id}` : null,
    };
  }

  // Check for Vimeo
  if (url.includes('vimeo.com')) {
    const id = getVimeoVideoId(url);
    return {
      type: 'vimeo',
      id,
      embedUrl: id ? `https://player.vimeo.com/video/${id}` : null,
    };
  }

  return {
    type: 'unknown',
    id: null,
    embedUrl: null,
  };
}

export default function ReelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [reel, setReel] = useState<Reel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchReel();
    }
  }, [id]);

  const fetchReel = async () => {
    try {
      setLoading(true);
      const response = await publicFetch(api.reelById(id));

      if (!response.ok) {
        throw new Error("Failed to fetch reel");
      }

      const result: ReelResponse = await response.json();

      if (result.success && result.data) {
        setReel(result.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reel");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-black flex items-center justify-center pt-20">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-white rounded-full animate-spin mb-4"></div>
            <p className="text-zinc-400 text-sm">Loading reel...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !reel) {
    return (
      <>
        <div className="min-h-screen bg-black flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">
              {error || "Reel not found"}
            </div>
            <button
              onClick={() => router.push("/reels")}
              className="px-6 py-3 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Back to Reels
            </button>
          </div>
        </div>
      </>
    );
  }

  const videoInfo = parseVideoUrl(reel.videoLink);

  return (
    <>
      <div className="min-h-screen bg-black py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button - Minimalist */}
          <button
            onClick={() => router.push("/reels")}
            className="mb-12 text-zinc-500 hover:text-white flex items-center gap-2 transition-colors group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm">Back</span>
          </button>

          {/* Video Player */}
          <div className="aspect-video w-full mb-16 rounded-lg overflow-hidden bg-zinc-900 shadow-2xl">
            {videoInfo.embedUrl ? (
              <>
                {/* YouTube Video */}
                {videoInfo.type === 'youtube' && (
                  <iframe
                    width="100%"
                    height="100%"
                    src={videoInfo.embedUrl}
                    title={reel.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                )}

                {/* Vimeo Video */}
                {videoInfo.type === 'vimeo' && (
                  <iframe
                    width="100%"
                    height="100%"
                    src={videoInfo.embedUrl}
                    title={reel.title}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-red-500">
                <div className="text-center">
                  <p className="text-xl mb-2">Invalid video URL</p>
                  <p className="text-sm text-zinc-400">
                    Please provide a valid YouTube or Vimeo link
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Video Info - Clean & Minimal */}
          <div className="max-w-4xl">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              {reel.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-zinc-400 mb-12">
              {reel.subtitle}
            </p>

            {/* Description Section */}
            <div className="mb-12">
              <h2 className="text-sm uppercase tracking-wider text-zinc-500 mb-4 font-medium">
                About This Project
              </h2>
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                {reel.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
