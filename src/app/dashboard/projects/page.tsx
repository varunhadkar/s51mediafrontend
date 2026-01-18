"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import ProjectModal from "@/components/dashboard/ProjectModal";
import { api, authenticatedFetch } from "../../../../lib/api";

interface Project {
  _id: string;
  title: string;
  client: string;
  category: {
    name: string;
    _id: string;
  };
  year: number;
  thumbnail: string;
  videoUrl: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);

      // use authenticatedFetch for protected route
      const response = await authenticatedFetch(api.projects, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setProjects(result.data);
        setError("");
      } else if (Array.isArray(result)) {
        setProjects(result);
        setError("");
      } else {
        setError("Unexpected API response format");
        setProjects([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await authenticatedFetch(api.projectById(id), {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
        alert("✅ Project deleted successfully");
      } else {
        const error = await response.json();
        alert("❌ Failed to delete: " + (error.message || "Unknown error"));
      }
    } catch (err: unknown) {
      alert("❌ " + (err as Error).message);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    fetchProjects();
  };

  const filteredProjects = projects.filter((project) => {
    const q = searchQuery.toLowerCase();
    return (
      project.title?.toLowerCase().includes(q) ||
      project.client?.toLowerCase().includes(q) ||
      project.category?.name?.toLowerCase().includes(q)
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-[3px] border-white/60 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Projects
            </h1>
            <p className="text-zinc-400 mt-1 text-sm">
              Manage your portfolio projects
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 border border-white text-white text-xs font-semibold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>

        <div className="bg-black border border-red-600/60 p-6 text-center">
          <p className="text-red-400 text-sm mb-4">❌ {error}</p>
          <button
            onClick={fetchProjects}
            className="px-8 py-3 border border-white text-white text-xs font-semibold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Manage your portfolio projects ({projects.length} total)
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 border border-white text-white text-xs font-semibold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects by title, client, or category..."
          className="w-full pl-11 pr-4 py-3 bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black border border-zinc-800 p-5">
          <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-1">
            Total Projects
          </p>
          <p className="text-3xl font-semibold text-white">{projects.length}</p>
        </div>
        <div className="bg-black border border-zinc-800 p-5">
          <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-1">
            This Year
          </p>
          <p className="text-3xl font-semibold text-white">
            {projects.filter((p) => p.year === new Date().getFullYear()).length}
          </p>
        </div>
        <div className="bg-black border border-zinc-800 p-5">
          <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-1">
            Search Results
          </p>
          <p className="text-3xl font-semibold text-white">
            {filteredProjects.length}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-black border border-zinc-800 overflow-hidden group hover:border-white transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-zinc-900">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />

                {/* DESKTOP (sm+): overlay on hover */}
                <div className="absolute inset-0 hidden sm:flex bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-3">
                  <button
                    onClick={() => window.open(project.videoUrl, "_blank")}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white transition-colors rounded"
                    title="View video"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white transition-colors rounded"
                    title="Edit project"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 bg-red-600/80 hover:bg-red-600 text-white transition-colors rounded"
                    title="Delete project"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content + MOBILE actions */}
              <div className="p-4 space-y-2">
                <div className="mb-1">
                  <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.22em] bg-white/10 border border-white/30 text-white font-semibold">
                    {project.category?.name || "Uncategorized"}
                  </span>
                </div>

                <h3
                  className="text-base md:text-lg font-semibold text-white line-clamp-1"
                  title={project.title}
                >
                  {project.title}
                </h3>

                <p className="text-xs md:text-sm text-zinc-400">
                  {project.client} • {project.year}
                </p>

                <p className="text-xs md:text-sm text-zinc-500 line-clamp-2">
                  {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 bg-zinc-900 text-zinc-400 rounded uppercase tracking-[0.15em]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] px-2 py-1 bg-zinc-900 text-zinc-400 rounded uppercase tracking-[0.15em]">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* MOBILE (below content) – always visible */}
                <div className="flex sm:hidden items-center justify-end gap-2 pt-2 border-t border-zinc-800 mt-3">
                  <button
                    onClick={() => window.open(project.videoUrl, "_blank")}
                    className="p-2 bg-white/10 text-white rounded"
                    title="View video"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 bg-white/10 text-white rounded"
                    title="Edit project"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 bg-red-600/80 text-white rounded"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-black border border-zinc-800">
          <p className="text-zinc-300 text-lg">No projects found</p>
          <p className="text-zinc-500 text-sm mt-2">
            {searchQuery
              ? "Try a different search term."
              : "Click “Add Project” to create your first project."}
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <ProjectModal project={editingProject} onClose={handleModalClose} />
      )}
    </div>
  );
}
