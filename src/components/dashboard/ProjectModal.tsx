'use client';

import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { api, authenticatedFetch } from '../../../lib/api';

interface Category {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  title: string;
  client: string;
  category: string | { _id: string; name: string };
  year: number;
  thumbnail: string;
  videoUrl: string;
  description: string;
  tags: string[];
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: '',
    year: new Date().getFullYear(),
    thumbnail: '',
    videoUrl: '',
    description: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

 useEffect(() => {
  if (project) {
    // Handle category safely with null check
    const categoryId = 
      typeof project.category === 'string'
        ? project.category
        : project.category?._id ?? ''; // Added ?? '' for null safety

    setFormData({
      title: project.title,
      client: project.client,
      category: categoryId,
      year: project.year,
      thumbnail: project.thumbnail,
      videoUrl: project.videoUrl,
      description: project.description || '',
      tags: project.tags?.join(', ') || '',
    });
  }
}, [project]);

  const fetchCategories = async () => {
    try {
      const response = await authenticatedFetch(api.categories, {
        method: 'GET',
      });
      const result = await response.json();


      let categoriesData: Category[] = [];

      if (result.success && Array.isArray(result.data)) {
        categoriesData = result.data;
      } else if (Array.isArray(result)) {
        categoriesData = result;
      }

      setCategories(categoriesData);

      if (!project && categoriesData.length > 0 && !formData.category) {
        setFormData((prev) => ({ ...prev, category: categoriesData[0]._id }));
      }
    } catch (err) {
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (categories.length === 0) {
      setError('Please create at least one category first');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        title: formData.title.trim(),
        client: formData.client.trim(),
        category: formData.category,
        year: Number(formData.year),
        thumbnail: formData.thumbnail.trim(),
        videoUrl: formData.videoUrl.trim(),
        description: formData.description.trim(),
        tags: formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      };


      const url = project ? api.projectById(project._id) : api.projects;
      const method = project ? 'PUT' : 'POST';

      const response = await authenticatedFetch(url, {
        method,
        body: JSON.stringify(payload),
      });


      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const result = await response.json();

      alert(`✅ Project ${project ? 'updated' : 'created'} successfully!`);
      onClose();
    } catch (err: unknown) {
      setError((err as Error).message || 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-black border border-zinc-800 w-full max-w-3xl my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 flex-shrink-0">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-900 rounded"
            disabled={isSubmitting}
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* No Categories warning */}
            {categories.length === 0 && (
              <div className="bg-yellow-500/5 border border-yellow-500/60 p-4 rounded">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-yellow-400 font-semibold mb-1">
                      No categories available
                    </p>
                    <p className="text-yellow-500 text-xs mb-3">
                      Create at least one category before adding projects.
                    </p>
                    <a
                      href="/dashboard/categories"
                      className="inline-block px-4 py-2 border border-white text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
                    >
                      Go to Categories
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 p-3 rounded text-sm text-red-400">
                ❌ {error}
              </div>
            )}

            {/* Form grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-white mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  disabled={isSubmitting}
                  placeholder="e.g., Stranger Things Season 4"
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-white disabled:opacity-50 transition-colors"
                />
              </div>

              {/* Client */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Client *
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  required
                  disabled={isSubmitting}
                  placeholder="e.g., Netflix"
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-white disabled:opacity-50 transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Category *{' '}
                  {categories.length > 0 && (
                    <span className="text-zinc-500 font-normal text-xs">
                      ({categories.length} available)
                    </span>
                  )}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  disabled={isSubmitting || categories.length === 0}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-white disabled:opacity-50 capitalize transition-colors"
                >
                  {categories.length === 0 && (
                    <option value="">No categories available</option>
                  )}
                  {categories.length > 0 && !formData.category && (
                    <option value="">Select category</option>
                  )}
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id} className="capitalize">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: parseInt(e.target.value || '0', 10) })
                  }
                  required
                  disabled={isSubmitting}
                  min={1900}
                  max={new Date().getFullYear() + 5}
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-white disabled:opacity-50 transition-colors"
                />
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Thumbnail URL *
                </label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-white disabled:opacity-50 transition-colors"
                />
              </div>

              {/* Video URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-white mb-2">
                  Video URL *
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-white disabled:opacity-50 transition-colors"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-white mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                  rows={3}
                  placeholder="Brief description of the project and your role"
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-white resize-none disabled:opacity-50 transition-colors"
                />
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-white mb-2">
                  Tags (comma separated) *
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  required
                  disabled={isSubmitting}
                  placeholder="e.g., VFX, CGI, Horror"
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-white disabled:opacity-50 transition-colors"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  Separate tags with commas.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 border-t border-zinc-800 mt-6">
              <button
                type="submit"
                disabled={isSubmitting || categories.length === 0}
                className="flex-1 py-3 border border-white text-white text-xs font-semibold uppercase tracking-[0.25em] hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Saving…' : project ? 'Update Project' : 'Create Project'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-8 py-3 border border-zinc-700 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-300 hover:border-white hover:text-white disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
