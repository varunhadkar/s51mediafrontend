'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
// import { api } from '@/lib/api';
import VideoModal from '@/components/VideoModal'; // 👈 adjust path if needed
import { api } from '../../../lib/api';

interface FeaturedProject {
  _id: string;
  title: string;
  client: string;
  category: string | { name: string };
  thumbnail: string;
  videoUrl: string;
}

export default function FeaturedWork() {
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // modal state
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const [activeTitle, setActiveTitle] = useState('');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(api.projects, { method: 'GET' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const result = await res.json();
        const list: FeaturedProject[] = Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result)
          ? result
          : [];

        setProjects(list.slice(0, 3)); // top 3
      } catch (err) {
        setError('Unable to load featured projects right now.');
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const hasData = projects.length > 0;

  const openVideo = (project: FeaturedProject) => {
    if (!project.videoUrl) return;
    setActiveVideoUrl(project.videoUrl);
    setActiveTitle(project.title);
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    setActiveVideoUrl('');
    setActiveTitle('');
  };

  return (
    <section id="featured-work" className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-3">
              Featured Work
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Our Latest
              <br />
              Productions
            </h2>
          </div>

          <Link
            href="/work"
            className="group flex items-center gap-3 text-sm text-zinc-200 hover:text-white transition-colors font-semibold uppercase tracking-[0.25em]"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* States */}
        {isLoading && (
          <div className="py-16 text-center text-zinc-400 text-sm uppercase tracking-[0.25em]">
            Loading featured projects…
          </div>
        )}

        {!isLoading && error && (
          <div className="py-16 text-center text-zinc-400">
            <p className="mb-2">{error}</p>
            <p className="text-xs uppercase tracking-[0.25em]">
              Please visit the Work page to see all projects.
            </p>
          </div>
        )}

        {!isLoading && !error && !hasData && (
          <div className="py-16 text-center text-zinc-400">
            <p className="mb-2">No featured projects available yet.</p>
            <p className="text-xs uppercase tracking-[0.25em]">
              Projects will appear here once created in the dashboard.
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !error && hasData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {projects[0] && (
              <ProjectCard
                project={projects[0]}
                large
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                onClick={openVideo}
              />
            )}

            <div className="grid grid-rows-2 gap-0">
              {projects.slice(1).map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  onClick={openVideo}
                />
              ))}
            </div>
          </div>
        )}

        {/* Clients */}
        <div className="mt-24 border-t border-zinc-800 pt-16">
          <p className="text-center text-gray-400 uppercase tracking-[0.25em] text-xs mb-12">
            Trusted by Industry Leaders
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-50 hover:opacity-100 transition-opacity">
            {['Netflix', 'HBO', 'Disney', 'Warner Bros', 'Sony', 'Marvel'].map(
              (client) => (
                <div key={client} className="text-center">
                  <div className="text-xl font-semibold text-white">
                    {client}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen && !!activeVideoUrl}
        onClose={closeVideo}
        videoUrl={activeVideoUrl}
        title={activeTitle}
      />
    </section>
  );
}

interface CardProps {
  project: FeaturedProject;
  large?: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  onClick: (project: FeaturedProject) => void;
}

function ProjectCard({
  project,
  large,
  hoveredId,
  setHoveredId,
  onClick,
}: CardProps) {
  const isHovered = hoveredId === project._id;
  const categoryName =
    typeof project.category === 'string'
      ? project.category
      : project.category?.name ?? 'Project';

  return (
    <div
      className={`relative overflow-hidden group cursor-pointer ${
        large ? 'h-[500px] lg:h-[700px]' : 'h-[250px] lg:h-[350px]'
      }`}
      onMouseEnter={() => setHoveredId(project._id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => onClick(project)}
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div
          className={`flex items-center justify-center rounded-full border border-white/70 bg-black/40 backdrop-blur-sm
            transition-all duration-300 ${
              large ? 'w-20 h-20' : 'w-16 h-16'
            } ${
            isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <Play className={`${large ? 'w-8 h-8' : 'w-6 h-6'} text-white ml-1`} />
        </div>
      </div>

      {/* Content */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-10 ${
          large ? 'p-8' : 'p-6'
        }`}
      >
        <span className="inline-block px-3 py-1 bg-white/10 border border-white/30 text-white text-[10px] font-semibold uppercase tracking-[0.25em] mb-3">
          {categoryName}
        </span>
        <h3
          className={`font-bold text-white ${
            large ? 'text-3xl md:text-4xl mb-2' : 'text-xl md:text-2xl mb-1'
          }`}
        >
          {project.title}
        </h3>
        <p className="text-sm text-gray-300">{project.client}</p>
      </div>
    </div>
  );
}
