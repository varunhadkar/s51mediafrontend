'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { api, authenticatedFetch } from '../../../lib/api';

interface Reel {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  videoLink: string;
  status: string;
}

interface ReelModalProps {
  reel: Reel | null;
  onClose: () => void;
}

export default function ReelModal({ reel, onClose }: ReelModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    thumbnail: '',
    videoLink: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (reel) {
      setFormData({
        title: reel.title,
        subtitle: reel.subtitle,
        description: reel.description,
        thumbnail: reel.thumbnail,
        videoLink: reel.videoLink,
      });
    }
  }, [reel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = reel ? api.reelById(reel._id) : api.reels;
      const method = reel ? 'PUT' : 'POST';


      const response = await authenticatedFetch(url, {
        method,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`✅ Reel ${reel ? 'updated' : 'created'} successfully`);
        onClose();
      } else {
        const error = await response.json();
        alert('❌ Failed: ' + (error.message || 'Unknown error'));
      }
    } catch (error) {
      alert('❌ ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-black border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white uppercase tracking-[0.2em]">
            {reel ? 'Edit Reel' : 'Add Reel'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-zinc-400 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-4 py-2.5 bg-black border border-zinc-800 text-white text-sm focus:outline-none focus:border-white transition-colors"
              placeholder="Behind the VFX"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-zinc-400 mb-2">
              Subtitle *
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
              required
              className="w-full px-4 py-2.5 bg-black border border-zinc-800 text-white text-sm focus:outline-none focus:border-white transition-colors"
              placeholder="Reel 2024"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-zinc-400 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={4}
              className="w-full px-4 py-2.5 bg-black border border-zinc-800 text-white text-sm focus:outline-none focus:border-white transition-colors resize-none"
              placeholder="Quick showcase of recent VFX work"
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-zinc-400 mb-2">
              Thumbnail URL *
            </label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData({ ...formData, thumbnail: e.target.value })
              }
              required
              className="w-full px-4 py-2.5 bg-black border border-zinc-800 text-white text-sm focus:outline-none focus:border-white transition-colors"
              placeholder="https://example.com/thumb.jpg"
            />
            {formData.thumbnail && (
              <div className="mt-3 aspect-video w-full max-w-sm overflow-hidden rounded border border-zinc-800">
                <img
                  src={formData.thumbnail}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/400x300?text=Invalid+URL';
                  }}
                />
              </div>
            )}
          </div>

          {/* Video Link */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-zinc-400 mb-2">
              YouTube Video Link *
            </label>
            <input
              type="url"
              value={formData.videoLink}
              onChange={(e) =>
                setFormData({ ...formData, videoLink: e.target.value })
              }
              required
              className="w-full px-4 py-2.5 bg-black border border-zinc-800 text-white text-sm focus:outline-none focus:border-white transition-colors"
              placeholder="https://youtube.com/watch?v=abcd1234"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-zinc-800 text-white text-xs uppercase tracking-[0.2em] hover:bg-zinc-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-white bg-white text-black text-xs uppercase tracking-[0.2em] hover:bg-transparent hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? 'Saving...'
                : reel
                ? 'Update Reel'
                : 'Create Reel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
