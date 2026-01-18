"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { publicFetch, api } from "../../../lib/api";
import Navbar from "@/components/Navbar";

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

interface ReelsResponse {
  success: boolean;
  data: Reel[];
}

export default function ReelsPage() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      setLoading(true);
      const response = await publicFetch(api.reels);

      if (!response.ok) {
        throw new Error("Failed to fetch reels");
      }

      const result: ReelsResponse = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setReels(result.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reels");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black px-6 pt-40 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header - Matches Project Page */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-zinc-800">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">
              Effect Reels
            </h1>
          </div>

          {/* Loading State - Skeleton Cards */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="group relative cursor-pointer overflow-hidden bg-zinc-900 aspect-video animate-pulse"
                >
                  <div className="w-full h-full bg-zinc-800 rounded-lg" />
                  <div className="absolute bottom-0 left-4 right-4 p-6">
                    <div className="h-4 bg-zinc-700 rounded w-24 mb-2" />
                    <div className="h-6 bg-zinc-700 rounded w-3/4 mb-1" />
                    <div className="h-4 bg-zinc-800 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-red-500 text-xl mb-4">{error}</p>
                <button
                  onClick={fetchReels}
                  className="px-6 py-3 border border-white text-white text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && reels.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-zinc-400 text-xl">No reels available yet</p>
              </div>
            </div>
          )}

          {/* Reels Grid - Exact Project Card Style */}
          {!loading && !error && reels.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {reels.map((reel) => (
                <Link
                  key={reel._id}
                  href={`/reels/${reel._id}`}
                  className="group relative cursor-pointer overflow-hidden bg-zinc-900 aspect-video"
                >
                  {/* Thumbnail */}
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/800x450?text=No+Image";
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-white text-lg md:text-xl font-bold mb-1 line-clamp-1">
                      {reel.subtitle}
                    </h3>
                    <p className="text-zinc-300 text-sm">{reel.title}</p>
                  </div>

                  {/* Play Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
