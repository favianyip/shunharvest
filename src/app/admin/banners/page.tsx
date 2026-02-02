'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Upload, Eye, EyeOff, GripVertical, ImageIcon, Link as LinkIcon } from 'lucide-react';
import { banners as initialBanners } from '@/data/mockData';
import { Banner } from '@/types';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (bannerId: string) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      setBanners(banners.filter(b => b.id !== bannerId));
    }
  };

  const handleToggleActive = (bannerId: string) => {
    setBanners(banners.map(b => 
      b.id === bannerId ? { ...b, isActive: !b.isActive } : b
    ));
  };

  const handleSave = (updatedBanner: Banner) => {
    if (editingBanner) {
      setBanners(banners.map(b => b.id === updatedBanner.id ? updatedBanner : b));
    } else {
      const maxOrder = Math.max(...banners.map(b => b.order), 0);
      setBanners([...banners, { ...updatedBanner, id: Date.now().toString(), order: maxOrder + 1 }]);
    }
    setShowModal(false);
    setEditingBanner(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newBanners = [...banners];
    [newBanners[index], newBanners[index - 1]] = [newBanners[index - 1], newBanners[index]];
    newBanners[index].order = index + 1;
    newBanners[index - 1].order = index;
    setBanners(newBanners);
  };

  const moveDown = (index: number) => {
    if (index === banners.length - 1) return;
    const newBanners = [...banners];
    [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
    newBanners[index].order = index + 1;
    newBanners[index + 1].order = index + 2;
    setBanners(newBanners);
  };

  const sortedBanners = [...banners].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Hero Banners</h1>
          <p className="text-stone-500 mt-1">Manage homepage slider images and content</p>
        </div>
        <button
          onClick={() => {
            setEditingBanner(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Banner
        </button>
      </div>

      {/* Banners List */}
      <div className="space-y-4">
        {sortedBanners.map((banner, index) => (
          <div 
            key={banner.id} 
            className={`bg-white rounded-lg shadow overflow-hidden ${
              !banner.isActive ? 'opacity-60' : ''
            }`}
          >
            <div className="flex">
              {/* Image Preview */}
              <div className="w-64 h-36 relative flex-shrink-0 bg-stone-100">
                {banner.image ? (
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-stone-300" />
                  </div>
                )}
                {!banner.isActive && (
                  <div className="absolute inset-0 bg-stone-900/50 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Inactive</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    {banner.subtitle && (
                      <p className="text-xs text-amber-700 font-medium mb-1">{banner.subtitle}</p>
                    )}
                    <h3 className="text-lg font-semibold text-stone-900">{banner.title}</h3>
                    {banner.description && (
                      <p className="text-sm text-stone-600 mt-1">{banner.description}</p>
                    )}
                    {banner.link && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-stone-500">
                        <LinkIcon className="h-3 w-3" />
                        <span>{banner.link}</span>
                        {banner.linkText && (
                          <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded">
                            {banner.linkText}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {/* Reorder buttons */}
                    <div className="flex flex-col mr-2">
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className="p-1 text-stone-400 hover:text-stone-600 disabled:opacity-30"
                        title="Move up"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === sortedBanners.length - 1}
                        className="p-1 text-stone-400 hover:text-stone-600 disabled:opacity-30"
                        title="Move down"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => handleToggleActive(banner.id)}
                      className={`p-2 rounded ${
                        banner.isActive 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-stone-400 hover:bg-stone-50'
                      }`}
                      title={banner.isActive ? 'Hide banner' : 'Show banner'}
                    >
                      {banner.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => {
                        setEditingBanner(banner);
                        setShowModal(true);
                      }}
                      className="p-2 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="p-2 text-stone-600 hover:text-red-700 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-stone-400">
                  Slide {index + 1}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <ImageIcon className="h-12 w-12 text-stone-300 mx-auto mb-4" />
          <p className="text-stone-500">No banners yet. Add your first banner to get started.</p>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <BannerModal
          banner={editingBanner}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingBanner(null);
          }}
        />
      )}
    </div>
  );
}

interface BannerModalProps {
  banner: Banner | null;
  onSave: (banner: Banner) => void;
  onClose: () => void;
}

function BannerModal({ banner, onSave, onClose }: BannerModalProps) {
  const [formData, setFormData] = useState<Partial<Banner>>(
    banner || {
      title: '',
      subtitle: '',
      description: '',
      image: '',
      link: '',
      linkText: '',
      order: 0,
      isActive: true,
    }
  );
  const [imagePreview, setImagePreview] = useState<string | null>(banner?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setFormData({ ...formData, image: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: banner?.id || '',
      image: imagePreview || '',
      order: banner?.order || 0,
    } as Banner);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-stone-200 z-10">
          <h2 className="text-xl font-semibold text-stone-900">
            {banner ? 'Edit Banner' : 'Add New Banner'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Banner Image */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Banner Image *
            </label>
            <div className="space-y-3">
              <div className="aspect-[21/9] max-h-48 rounded-lg overflow-hidden bg-stone-100 relative">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Banner preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-stone-300 mb-2" />
                    <p className="text-sm text-stone-400">No image uploaded</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors text-sm"
                >
                  <Upload className="w-4 h-4" />
                  Upload Image
                </button>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, image: '' });
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="text-xs text-stone-500">
                Recommended: 1920x800px JPG or PNG for best quality
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Subtitle (optional)
            </label>
            <input
              type="text"
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g., START SPREADIN' THE NEWS"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Curated by Fruit Connoisseurs."
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Description (optional)
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description or tagline..."
              rows={2}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Link URL (optional)
              </label>
              <input
                type="text"
                value={formData.link || ''}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="/shop"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={formData.linkText || ''}
                onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                placeholder="SHOP NOW"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-stone-700">Active (show in slider)</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
            >
              {banner ? 'Save Changes' : 'Add Banner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
