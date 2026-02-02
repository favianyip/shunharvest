'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Upload, ImageIcon, Loader2 } from 'lucide-react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '@/lib/firebase/firestore';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? Products in this category will need to be reassigned.')) {
      try {
        await deleteCategory(categoryId);
        setCategories(categories.filter(c => c.id !== categoryId));
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
  };

  const handleSave = async (categoryData: Partial<Category>) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, categoryData);
        setCategories(categories.map(c => 
          c.id === editingCategory.id ? { ...c, ...categoryData } : c
        ));
      } else {
        const newId = await addCategory(categoryData as Omit<Category, 'id'>);
        setCategories([...categories, { ...categoryData, id: newId, createdAt: new Date() } as Category]);
      }
      setShowModal(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-amber-700" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Categories</h1>
          <p className="text-stone-500 mt-1">Manage product categories and their images</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow overflow-hidden group">
            <div className="h-40 bg-stone-100 relative overflow-hidden">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-stone-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                {category.name}
              </h3>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-stone-500 mb-2">
                <span className="px-2 py-0.5 bg-stone-100 rounded text-xs font-mono">
                  /{category.slug}
                </span>
                <span>•</span>
                <span>Order: {category.order}</span>
              </div>
              {category.description && (
                <p className="text-sm text-stone-600 line-clamp-2">{category.description}</p>
              )}
              <div className="flex items-center justify-end mt-4 pt-4 border-t border-stone-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setShowModal(true);
                    }}
                    className="p-2 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-stone-600 hover:text-red-700 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <CategoryModal
          category={editingCategory}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
}

interface CategoryModalProps {
  category: Category | null;
  onSave: (category: Partial<Category>) => void;
  onClose: () => void;
}

function CategoryModal({ category, onSave, onClose }: CategoryModalProps) {
  const [formData, setFormData] = useState<Partial<Category>>(
    category || {
      name: '',
      slug: '',
      description: '',
      image: '',
      order: 0,
    }
  );
  const [imagePreview, setImagePreview] = useState<string | null>(category?.image || null);
  const [imageUrl, setImageUrl] = useState<string>(category?.image || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setFormData({ ...formData, image: base64 });
        setImageUrl('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setImageUrl(url);
    if (url) {
      setImagePreview(url);
      setFormData({ ...formData, image: url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      image: imagePreview || '',
    });
  };

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData({ 
      ...formData, 
      name, 
      slug: category?.slug || slug  // Don't auto-change slug when editing
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-stone-200 z-10">
          <h2 className="text-xl font-semibold text-stone-900">
            {category ? 'Edit Category' : 'Add New Category'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Category Image */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Category Image
            </label>
            <div className="flex items-start gap-4">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 relative">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Category preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-stone-300" />
                  </div>
                )}
              </div>
              <div className="flex-1">
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
                <p className="text-xs text-stone-500 mt-2">Or paste image URL:</p>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full mt-1 px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageUrl('');
                      setFormData({ ...formData, image: '' });
                    }}
                    className="text-xs text-red-600 hover:text-red-700 mt-2"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Japanese Melons"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              URL Slug *
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2 bg-stone-100 border border-r-0 border-stone-300 rounded-l-lg text-stone-500 text-sm">
                /shop/
              </span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                placeholder="japanese-melons"
                className="flex-1 px-3 py-2 border border-stone-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this category..."
              rows={3}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              className="w-24 px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <p className="text-xs text-stone-500 mt-1">Lower numbers appear first</p>
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
              {category ? 'Save Changes' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
