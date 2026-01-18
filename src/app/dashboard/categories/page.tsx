'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { api, authenticatedFetch } from '../../../../lib/api';

interface Category {
  _id: string;
  name: string;
  description?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);

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
    } catch (error) {
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will affect all projects in this category!')) return;

    try {
      const response = await authenticatedFetch(api.categoryById(id), {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories((prev) => prev.filter((c) => c._id !== id));
        alert('✅ Category deleted successfully');
      } else {
        const error = await response.json();
        alert('❌ Failed to delete: ' + (error.message || 'Unknown error'));
      }
    } catch (error: unknown) {
      alert('❌ ' + (error as Error).message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingCategory ? api.categoryById(editingCategory._id) : api.categories;
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await authenticatedFetch(url, {
        method,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`✅ Category ${editingCategory ? 'updated' : 'created'} successfully`);
        fetchCategories();
        setIsModalOpen(false);
        setFormData({ name: '', description: '' });
        setEditingCategory(null);
      } else {
        const error = await response.json();
        alert('❌ Failed: ' + (error.message || 'Unknown error'));
      }
    } catch (error: unknown) {
      alert('❌ ' + (error as Error).message);
    }
  };

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
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Categories</h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Manage project categories ({categories.length} total)
          </p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setFormData({ name: '', description: '' });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 border border-white text-white text-xs font-semibold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories grid / empty state */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-black border border-zinc-800 p-6 hover:border-white transition-colors"
            >
              <div className="flex justify-between items-start mb-4 gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 capitalize">
                    {category.name}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {category.description || 'No description'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setFormData({
                        name: category.name,
                        description: category.description || '',
                      });
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors rounded"
                    title="Edit category"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-zinc-900 transition-colors rounded"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 font-mono bg-black border border-zinc-800 px-3 py-2 rounded">
                ID: {category._id}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-black border border-zinc-800">
          <p className="text-zinc-300 text-lg">No categories found</p>
          <p className="text-zinc-500 text-sm mt-2">
            Click “Add Category” to create your first category.
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-zinc-800 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="text-xl font-semibold text-white">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingCategory(null);
                  setFormData({ name: '', description: '' });
                }}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g., Television, Movies, Commercials"
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Optional description for this category"
                  className="w-full px-4 py-3 bg-black border border-zinc-800 text-white text-sm focus:outline-none focus:border-white resize-none transition-colors"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 border border-white text-white text-xs font-semibold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                    setFormData({ name: '', description: '' });
                  }}
                  className="px-8 py-3 border border-zinc-700 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-300 hover:border-white hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
