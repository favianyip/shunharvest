'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories, getBanners } from '@/lib/firebase/firestore';
import { Product, Category, Banner } from '@/types';
import { Loader2 } from 'lucide-react';

// Fallback banners if none in Firebase
const defaultBanners: Banner[] = [
  {
    id: '1',
    title: 'Premium Japanese Fruits',
    subtitle: 'Fresh from Japan',
    description: 'Experience the finest seasonal fruits, delivered to your door.',
    image: '/images/hero-1.jpg',
    link: '/shop',
    linkText: 'Shop Now',
    order: 1,
    isActive: true,
  }
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData, bannersData] = await Promise.all([
          getProducts(),
          getCategories(),
          getBanners()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        if (bannersData.length > 0) {
          setBanners(bannersData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-700" />
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Slider */}
      <HeroSlider banners={banners} />

      {/* Featured By Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-center text-sm uppercase tracking-widest text-stone-500 mb-8">
            Featured By
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-stone-400">
            <span className="text-xl font-serif">Bloomberg</span>
            <span className="text-xl font-serif">Business Insider</span>
            <span className="text-xl font-serif">The Wall Street Journal</span>
            <span className="text-xl font-serif">Microsoft Start</span>
            <span className="text-xl font-serif">The New York Times</span>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-6">
            In harmony with nature.
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            Ever been wowed by fruit? You&apos;re bound to when you&apos;ve had a taste of Shun Harvest.
            We offer a curation of premium seasonal fruits from all over Japan, crafted by farmers
            who are obsessed with one thing — making the world&apos;s best fruits.
          </p>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            旬 (Shun) celebrates the peak season — when nature&apos;s gifts are at their finest.
            Weekly orders flown fresh, direct from farm to your home. Come and experience
            the wonder of Japanese fruits.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900">
              Featured Fruits
            </h2>
            <Link
              href="/shop"
              className="text-sm font-medium text-amber-700 hover:text-amber-800"
            >
              View All →
            </Link>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-stone-500">
              <p>No featured products yet.</p>
              <Link href="/admin/products" className="text-amber-700 hover:underline mt-2 inline-block">
                Add products in admin panel →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 md:py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-8 text-center">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop/${category.slug}`}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-amber-100"
                >
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className="text-white font-medium group-hover:text-amber-300 transition-colors">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quality Promise */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-3xl">🌸</span>
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-2">Sweet. Juicy. Tender.</h3>
              <p className="text-stone-600">All the best qualities of fruit at its peak.</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-3xl">✈️</span>
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-2">Farm to Door</h3>
              <p className="text-stone-600">Carefully transported from Japan to your home.</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-2">Gift-Ready</h3>
              <p className="text-stone-600">Beautifully packaged for any occasion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-amber-700">
        <div className="max-w-xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
            Sign up for our newsletter!
          </h2>
          <p className="text-amber-100 mb-8">
            Don&apos;t miss out on special discounts, promotions and newly curated fruits in season.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="email@example.com"
              className="flex-1 px-4 py-3 rounded text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-stone-900 text-white font-medium rounded hover:bg-stone-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
