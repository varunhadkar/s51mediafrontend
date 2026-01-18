'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import ProjectModal from '@/components/dashboard/ProjectModal';
import { api, authenticatedFetch } from '../../../lib/api';

interface Category {
  name: string;
  _id: string;
}

interface Project {
  _id: string;
  title: string;
  client: string;
  category: Category | string;
  year: number;
  thumbnail: string;
  videoUrl: string;
  description: string;
  tags: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await authenticatedFetch(api.projects, { method: 'GET' });
      const result = await response.json();


      if (result.success && Array.isArray(result.data)) {
        setProjects(result.data);
      } else if (Array.isArray(result)) {
        setProjects(result);
      } else {
        setProjects([]);
      }
    } catch (error) {
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await authenticatedFetch(api.projectById(id), {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
        alert('✅ Project deleted successfully');
      } else {
        const error = await response.json();
        alert('❌ Failed to delete: ' + (error.message || 'Unknown error'));
      }
    } catch (error: unknown) {
      alert('❌ ' + (error as Error).message);
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

  const getCategoryName = (category: Category | string): string => {
    if (typeof category === 'string') return category || 'Uncategorized';
    return category?.name || 'Uncategorized';
  };

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.title?.toLowerCase().includes(query) ||
      project.client?.toLowerCase().includes(query) ||
      getCategoryName(project.category).toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-[3px] border-white/60 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm">
            Manage your portfolio projects ({projects.length} total)
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 border border-white text-white text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects by title, client, or category..."
          className="w-full pl-10 md:pl-11 pr-4 py-2.5 md:py-3 bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-black border border-zinc-800 p-4 md:p-5">
          <p className="text-zinc-500 text-[11px] md:text-xs uppercase tracking-[0.2em] mb-1">
            Total Projects
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-white">
            {projects.length}
          </p>
        </div>
        <div className="bg-black border border-zinc-800 p-4 md:p-5">
          <p className="text-zinc-500 text-[11px] md:text-xs uppercase tracking-[0.2em] mb-1">
            This Year
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-white">
            {projects.filter((p) => p.year === new Date().getFullYear()).length}
          </p>
        </div>
        <div className="bg-black border border-zinc-800 p-4 md:p-5">
          <p className="text-zinc-500 text-[11px] md:text-xs uppercase tracking-[0.2em] mb-1">
            Search Results
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-white">
            {filteredProjects.length}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-black border border-zinc-800 overflow-hidden hover:border-white transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative h-44 md:h-48 overflow-hidden bg-zinc-900">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              </div>

              {/* Content + always-visible actions */}
              <div className="p-4 space-y-2">
                <div className="mb-1">
                  <span className="inline-block px-3 py-1 text-[10px] md:text-[11px] uppercase tracking-[0.18em] bg-white/10 border border-white/30 text-white font-semibold">
                    {getCategoryName(project.category)}
                  </span>
                </div>

                <h3
                  className="text-sm md:text-base lg:text-lg font-semibold text-white line-clamp-1"
                  title={project.title}
                >
                  {project.title}
                </h3>

                <p className="text-[11px] md:text-xs text-zinc-400">
                  {project.client} • {project.year}
                </p>

                <p className="text-[11px] md:text-sm text-zinc-500 line-clamp-2">
                  {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 md:gap-2 pt-1">
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

                {/* Actions – always visible */}
                <div className="flex flex-wrap justify-end gap-2 pt-3 border-t border-zinc-800 mt-3">
                  <button
                    onClick={() => window.open(project.videoUrl, '_blank')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 text-white text-[11px] rounded hover:bg-white/20 transition-colors"
                    title="View video"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleEdit(project)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 text-white text-[11px] rounded hover:bg-white/20 transition-colors"
                    title="Edit project"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600/80 text-white text-[11px] rounded hover:bg-red-600 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-14 md:py-16 bg-black border border-zinc-800">
          <p className="text-zinc-300 text-base md:text-lg">No projects found</p>
          <p className="text-zinc-500 text-xs md:text-sm mt-2">
            {searchQuery
              ? 'Try a different search term.'
              : 'Click “Add Project” to create your first project.'}
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
