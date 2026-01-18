'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
// import ReelModal from '@/components/dashboard/ReelModal';
import { api , authenticatedFetch } from '../../../../lib/api';
import ReelModal from '@/components/dashboard/ReelModal';

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

export default function ReelsPage() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReel, setEditingReel] = useState<Reel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      setIsLoading(true);
      const response = await authenticatedFetch(api.reels, { method: 'GET' });
      const result = await response.json();


      if (result.success && Array.isArray(result.data)) {
        setReels(result.data);
      } else if (Array.isArray(result)) {
        setReels(result);
      } else {
        setReels([]);
      }
    } catch (error) {
      setReels([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reel?')) return;

    try {
      const response = await authenticatedFetch(api.reelById(id), {
        method: 'DELETE',
      });

      if (response.ok) {
        setReels((prev) => prev.filter((r) => r._id !== id));
        alert('✅ Reel deleted successfully');
      } else {
        const error = await response.json();
        alert('❌ Failed to delete: ' + (error.message || 'Unknown error'));
      }
    } catch (error: unknown) {
      alert('❌ ' + (error as Error).message);
    }
  };

  const handleEdit = (reel: Reel) => {
    setEditingReel(reel);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingReel(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingReel(null);
    fetchReels();
  };

  const filteredReels = reels.filter((reel) => {
    const query = searchQuery.toLowerCase();
    return (
      reel.title?.toLowerCase().includes(query) ||
      reel.subtitle?.toLowerCase().includes(query) ||
      reel.description?.toLowerCase().includes(query)
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
            Reels
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm">
            Manage your video reels ({reels.length} total)
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 border border-white text-white text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Reel
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search reels by title, subtitle, or description..."
          className="w-full pl-10 md:pl-11 pr-4 py-2.5 md:py-3 bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-black border border-zinc-800 p-4 md:p-5">
          <p className="text-zinc-500 text-[11px] md:text-xs uppercase tracking-[0.2em] mb-1">
            Total Reels
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-white">
            {reels.length}
          </p>
        </div>
        <div className="bg-black border border-zinc-800 p-4 md:p-5">
          <p className="text-zinc-500 text-[11px] md:text-xs uppercase tracking-[0.2em] mb-1">
            Active
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-white">
            {reels.filter((r) => r.status === 'active').length}
          </p>
        </div>
        <div className="bg-black border border-zinc-800 p-4 md:p-5">
          <p className="text-zinc-500 text-[11px] md:text-xs uppercase tracking-[0.2em] mb-1">
            Search Results
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-white">
            {filteredReels.length}
          </p>
        </div>
      </div>

      {/* Reels Grid */}
      {filteredReels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {filteredReels.map((reel) => (
            <div
              key={reel._id}
              className="bg-black border border-zinc-800 overflow-hidden hover:border-white transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative h-44 md:h-48 overflow-hidden bg-zinc-900">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <div className="mb-1">
                  <span
                    className={`inline-block px-3 py-1 text-[10px] md:text-[11px] uppercase tracking-[0.18em] border font-semibold ${
                      reel.status === 'active'
                        ? 'bg-green-500/10 border-green-500/30 text-green-500'
                        : 'bg-zinc-500/10 border-zinc-500/30 text-zinc-500'
                    }`}
                  >
                    {reel.status}
                  </span>
                </div>

                <h3
                  className="text-sm md:text-base lg:text-lg font-semibold text-white line-clamp-1"
                  title={reel.title}
                >
                  {reel.title}
                </h3>

                <p className="text-[11px] md:text-xs text-zinc-400">
                  {reel.subtitle}
                </p>

                <p className="text-[11px] md:text-sm text-zinc-500 line-clamp-2">
                  {reel.description}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap justify-end gap-2 pt-3 border-t border-zinc-800 mt-3">
                  <button
                    onClick={() => window.open(reel.videoLink, '_blank')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 text-white text-[11px] rounded hover:bg-white/20 transition-colors"
                    title="View video"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleEdit(reel)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 text-white text-[11px] rounded hover:bg-white/20 transition-colors"
                    title="Edit reel"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(reel._id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600/80 text-white text-[11px] rounded hover:bg-red-600 transition-colors"
                    title="Delete reel"
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
          <p className="text-zinc-300 text-base md:text-lg">No reels found</p>
          <p className="text-zinc-500 text-xs md:text-sm mt-2">
            {searchQuery
              ? 'Try a different search term.'
              : 'Click "Add Reel" to create your first reel.'}
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <ReelModal reel={editingReel} onClose={handleModalClose} />
      )}
    </div>
  );
}
