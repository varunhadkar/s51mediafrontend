'use client';

import { parseVideoUrl } from "../../lib/VideoUtils";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    client: string;
    category: string;
    thumbnail: string;
    videoUrl: string;
    year: number; // <-- added
  };
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const videoInfo = parseVideoUrl(project.videoUrl);

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden bg-zinc-900 aspect-video"
    >
      {/* Thumbnail */}
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/800x450?text=No+Image";
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        {/* Top row: video type + year */}
        <div className="flex items-center justify-between mb-2">
          {videoInfo.type !== "unknown" ? (
            <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-wider bg-white/20 text-white rounded">
              {videoInfo.type}
            </span>
          ) : (
            <span />
          )}
        </div>

        {/* Title */}
        <h3 className="text-white text-lg md:text-xl font-bold mb-1 line-clamp-1">
          {project.title}
        </h3>

        {/* Client + Category */}
        <p className="text-zinc-300 text-sm">{project.client}</p>
        <p className="text-zinc-400 text-xs mt-1">{project.category} · {project.year}</p>
      </div>

      {/* Play Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
        <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
      </div>
    </div>
  );
}
