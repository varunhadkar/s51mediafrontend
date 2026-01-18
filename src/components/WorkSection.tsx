"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import VideoModal from "@/components/VideoModal";
import { api, publicFetch } from "../../lib/api";
import { ChevronDown } from "lucide-react";

type TabId = "all" | string;

interface ApiProject {
  _id: string;
  title: string;
  client: string;
  category: string | { _id: string; name: string };
  thumbnail: string;
  videoUrl: string;
  year: number; // <-- added
}

interface Category {
  _id: string;
  name: string;
}

interface Tab {
  id: TabId;
  label: string;
  count: number;
}

export default function WorkSection() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "all", label: "ALL WORK", count: 0 },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [projectsRes, categoriesRes] = await Promise.all([
          publicFetch(api.projects, { method: "GET" }),
          publicFetch(api.categories, { method: "GET" }),
        ]);

        if (!projectsRes.ok) {
          throw new Error(
            `Failed to fetch projects: HTTP ${projectsRes.status}`
          );
        }

        if (!categoriesRes.ok) {
          throw new Error(
            `Failed to fetch categories: HTTP ${categoriesRes.status}`
          );
        }

        const projectsResult = await projectsRes.json();
        const categoriesResult = await categoriesRes.json();

        const projectsData: ApiProject[] = Array.isArray(projectsResult?.data)
          ? projectsResult.data
          : Array.isArray(projectsResult)
          ? projectsResult
          : [];

        const categoriesData: Category[] = Array.isArray(categoriesResult?.data)
          ? categoriesResult.data
          : Array.isArray(categoriesResult)
          ? categoriesResult
          : [];

        setProjects(projectsData);
        setCategories(categoriesData);

        const categoryCounts = new Map<string, number>();

        projectsData.forEach((p) => {
          const categoryId =
            typeof p.category === "string"
              ? p.category
              : p.category?._id ?? null;

          if (categoryId) {
            categoryCounts.set(
              categoryId,
              (categoryCounts.get(categoryId) || 0) + 1
            );
          }
        });

        const dynamicTabs: Tab[] = categoriesData
          .map((cat) => ({
            id: cat._id,
            label: cat.name.toUpperCase(),
            count: categoryCounts.get(cat._id) || 0,
          }))
          .filter((tab) => tab.count > 0);

        setTabs([
          { id: "all", label: "ALL WORK", count: projectsData.length },
          ...dynamicTabs,
        ]);
      } catch (err) {
        setError("Unable to load projects right now. Please try again later.");
        setProjects([]);
        setCategories([]);
        setTabs([{ id: "all", label: "ALL WORK", count: 0 }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter by category AND sort by year desc
  const filteredProjects = useMemo(() => {
    const base =
      activeTab === "all"
        ? projects
        : projects.filter((p) => {
            const categoryId =
              typeof p.category === "string"
                ? p.category
                : p.category?._id ?? null;

            return categoryId === activeTab;
          });

    // sort newest year first; if no year, treat as 0
    return [...base].sort((a, b) => {
      const yearA = typeof a.year === "number" ? a.year : 0;
      const yearB = typeof b.year === "number" ? b.year : 0;
      return yearB - yearA;
    });
  }, [projects, activeTab]);

  const handleProjectClick = (videoUrl: string, title: string) => {
    setSelectedVideo({ url: videoUrl, title });
  };

  return (
    <>
      <Navbar />

      <section className="bg-black min-h-screen pt-28 lg:pt-46 md:pt-32 pb-20">
        {/* Header Section - Fully Responsive */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-zinc-800">
            {/* Left: Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">
              Featured Projects
            </h1>

            {/* Right: Categories Dropdown */}
            {!isLoading && !error && tabs.length > 0 && (
              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-2 border border-zinc-800 text-zinc-300 text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:border-white hover:text-white transition-all"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowDropdown(false)}
                    />

                    {/* Dropdown List */}
                    <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-full sm:w-auto bg-black border border-zinc-800 shadow-xl z-20 min-w-[200px] max-h-[400px] overflow-y-auto">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setShowDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                            activeTab === tab.id
                              ? "bg-white text-black"
                              : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span className="ml-2 opacity-60">({tab.count})</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Loading State - Inline Skeleton Cards */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="group relative cursor-pointer overflow-hidden bg-zinc-900 aspect-video animate-pulse"
                >
                  {/* Skeleton Thumbnail */}
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />

                  {/* Skeleton Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />

                  {/* Skeleton Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    {/* Skeleton badge */}
                    <div className="h-6 w-16 bg-zinc-700/70 rounded mb-2 animate-pulse" />

                    {/* Skeleton title */}
                    <div className="h-6 bg-zinc-700/80 rounded w-3/4 mb-2 animate-pulse" />

                    {/* Skeleton client */}
                    <div className="h-4 bg-zinc-700/70 rounded w-1/2 mb-1 animate-pulse" />

                    {/* Skeleton category + year */}
                    <div className="h-3.5 bg-zinc-700/60 rounded w-2/3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="py-16 text-center text-zinc-400 px-4">
              <p className="mb-2 text-sm">{error}</p>
              <p className="text-xs uppercase tracking-wider">
                Please try again later.
              </p>
            </div>
          )}

          {/* Projects Grid */}
          {!isLoading && !error && (
            <>
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project._id}
                      project={{
                        id: project._id,
                        title: project.title,
                        client: project.client,
                        category:
                          typeof project.category === "string"
                            ? project.category
                            : project.category?.name ?? "Uncategorized",
                        thumbnail: project.thumbnail,
                        videoUrl: project.videoUrl,
                        year: project.year,
                      }}
                      onClick={() =>
                        handleProjectClick(project.videoUrl, project.title)
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 px-4">
                  <p className="text-zinc-500 text-base sm:text-lg">
                    No projects found in this category.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </>
  );
}
