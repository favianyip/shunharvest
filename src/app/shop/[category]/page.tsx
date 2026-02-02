'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/firebase/firestore';
import { Product, Category } from '@/types';
import { Loader2 } from 'lucide-react';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name-asc' | 'name-desc' | 'newest';
type AvailabilityFilter = 'all' | 'in-stock' | 'out-of-stock';

// Season info for each category
const seasonInfo: Record<string, string> = {
  'japanese-melons': 'Japanese Melons are typically in season from April to June.',
  'japanese-strawberries': 'Japanese Strawberries are in season from December to May.',
  'japanese-persimmons': 'Japanese Persimmons are in season from October to December.',
  'japanese-pears': 'Japanese Pears are in season from August to October.',
  'japanese-oranges': 'Japanese Citrus fruits are in season from November to March.',
  'artisanal-items': 'Our artisanal items are available year-round.',
};

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [availability, setAvailability] = useState<AvailabilityFilter>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const category = categories.find(c => c.slug === categorySlug);
  const categoryProducts = products.filter(p => {
    const cat = categories.find(c => c.id === p.categoryId);
    return cat?.slug === categorySlug;
  });

  const sortedProducts = useMemo(() => {
    let sorted = [...categoryProducts];

    // Filter by availability
    if (availability === 'in-stock') {
      sorted = sorted.filter(p => p.inventory > 0);
    } else if (availability === 'out-of-stock') {
      sorted = sorted.filter(p => p.inventory === 0);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      sorted = sorted.filter(p => p.price >= min && (max ? p.price <= max : true));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        sorted.sort((a, b) => {
          const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
          const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return sorted;
  }, [categoryProducts, sortBy, availability, priceRange]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-amber-700 mx-auto" />
          <p className="mt-4 text-stone-500 font-light tracking-wide">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone-500">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Category Header */}
      <div className="bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900">
            {category.name}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Like original site */}
          <aside className="lg:w-56 flex-shrink-0">
            {/* Season Info */}
            {seasonInfo[categorySlug] && (
              <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                {seasonInfo[categorySlug]}
              </p>
            )}

            {/* Sort */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-3 py-2 border border-stone-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price, low to high</option>
                <option value="price-high">Price, high to low</option>
                <option value="name-asc">Alphabetically, A-Z</option>
                <option value="name-desc">Alphabetically, Z-A</option>
              </select>
            </div>

            {/* Filter by */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-stone-900 mb-2">Filter by</h3>
              
              {/* Availability */}
              <div className="mb-4">
                <label className="block text-sm text-stone-600 mb-1">Availability</label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as AvailabilityFilter)}
                  className="w-full px-3 py-2 border border-stone-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">All</option>
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm text-stone-600 mb-1">Price</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">All Prices</option>
                  <option value="0-100">Under $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-300">$200 - $300</option>
                  <option value="300-9999">$300+</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-stone-500">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
