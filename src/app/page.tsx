'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories, getBanners } from '@/lib/firebase/firestore';
import { Product, Category, Banner } from '@/types';
import { Loader2, Sparkles, Plane, Gift, ChevronRight } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-amber-700 mx-auto" />
          <p className="mt-4 text-stone-500 font-light tracking-wide">Loading exquisite selections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Slider */}
      <HeroSlider banners={banners} />

      {/* Featured Video Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-stone-50 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-amber-700 text-sm uppercase tracking-[0.2em] mb-3 font-medium">From Our Farm</p>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Experience the Harvest
            </h2>
            <p className="text-stone-600 font-light max-w-2xl mx-auto">
              Watch how our premium Japanese fruits are carefully cultivated and harvested at the peak of perfection.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-stone-300/50 border border-stone-200">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-video object-cover"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Featured By Section - More elegant */}
      <section className="py-16 bg-white overflow-hidden border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-stone-400 mb-10 font-light">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16">
            {['Bloomberg', 'Business Insider', 'The Wall Street Journal', 'Microsoft Start', 'The New York Times'].map((name) => (
              <span 
                key={name} 
                className="text-stone-300 hover:text-stone-500 transition-colors duration-300 text-lg sm:text-xl font-serif italic"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section - More premium typography */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-stone-50 to-white overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-700 text-sm uppercase tracking-[0.2em] mb-6 font-medium">Our Philosophy</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-8 leading-tight">
            In harmony with nature.
          </h2>
          <div className="w-16 h-px bg-amber-700 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-light">
            Ever been wowed by fruit? You&apos;re bound to when you&apos;ve had a taste of Shun Harvest.
            We offer a curation of premium seasonal fruits from all over Japan, crafted by farmers
            who are obsessed with one thing — making the world&apos;s best fruits.
          </p>
          <p className="mt-6 text-lg md:text-xl text-stone-600 leading-relaxed font-light">
            <span className="font-serif text-stone-800">旬</span> (Shun) celebrates the peak season — when nature&apos;s gifts are at their finest.
            Weekly orders flown fresh, direct from farm to your home.
          </p>
          <Link 
            href="/our-story" 
            className="inline-flex items-center gap-2 mt-10 text-amber-700 hover:text-amber-800 font-medium group"
          >
            Discover Our Story 
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Featured Products - Enhanced */}
      <section className="py-20 md:py-28 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-700 text-sm uppercase tracking-[0.2em] mb-3 font-medium">Seasonal Selection</p>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
                Featured Fruits
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors group"
            >
              View All 
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-500">
              <p className="font-light">Curating our finest selections...</p>
            </div>
          )}
          <Link
            href="/shop"
            className="sm:hidden flex items-center justify-center gap-2 mt-8 text-sm font-medium text-amber-700 hover:text-amber-800"
          >
            View All Products <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Categories Section - Premium cards */}
      {categories.length > 0 && (
        <section className="py-20 md:py-28 bg-stone-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-amber-500 text-sm uppercase tracking-[0.2em] mb-3 font-medium">Explore</p>
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                Shop by Category
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/shop/${category.slug}`}
                  className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-800 shadow-lg hover:shadow-2xl transition-all duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4 pb-6">
                    <span className="text-white font-medium text-sm md:text-base tracking-wide group-hover:text-amber-300 transition-colors duration-300">
                      {category.name}
                    </span>
                    <div className="w-8 h-px bg-amber-500 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quality Promise - Premium icons instead of emoji */}
      <section className="py-20 md:py-28 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-700 text-sm uppercase tracking-[0.2em] mb-3 font-medium">Our Promise</p>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
              Excellence in Every Detail
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center border border-amber-200 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <Sparkles className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-stone-900 mb-3">Sweet. Juicy. Tender.</h3>
              <p className="text-stone-500 font-light leading-relaxed">All the best qualities of fruit at its peak ripeness, hand-selected for perfection.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center border border-amber-200 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <Plane className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-stone-900 mb-3">Farm to Door</h3>
              <p className="text-stone-500 font-light leading-relaxed">Carefully transported via air freight from Japan directly to your doorstep.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center border border-amber-200 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <Gift className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-stone-900 mb-3">Gift-Ready</h3>
              <p className="text-stone-500 font-light leading-relaxed">Beautifully packaged in premium gift boxes, perfect for any special occasion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA - More sophisticated */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-700 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-amber-500 text-sm uppercase tracking-[0.2em] mb-4 font-medium">Stay Connected</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-stone-400 mb-10 font-light text-lg">
            Be the first to know about seasonal arrivals, exclusive offers, and the art of Japanese fruit culture.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-amber-700 text-white font-medium rounded-lg hover:bg-amber-600 transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-amber-700/25"
            >
              Subscribe
            </button>
          </form>
          <p className="text-stone-500 text-sm mt-6">No spam, unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
