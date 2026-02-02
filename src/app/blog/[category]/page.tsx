'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Blog post data
const allBlogPosts = [
  {
    id: 'crown-melon-guide',
    title: 'The Ultimate Guide to Japanese Crown Melons',
    excerpt: 'Discover why the Crown Melon from Shizuoka is considered the pinnacle of melon cultivation and how to enjoy it at home.',
    image: '/images/products/crown.jpg',
    category: 'melons',
    author: 'Shun Harvest',
    date: 'January 15, 2026',
    readTime: '5 min read',
  },
  {
    id: 'yubari-king',
    title: 'Why Yubari King Melons Cost So Much',
    excerpt: 'The fascinating economics and craftsmanship behind Japan\'s most expensive fruit.',
    image: '/images/products/yubari.jpg',
    category: 'melons',
    author: 'Shun Harvest',
    date: 'January 8, 2026',
    readTime: '6 min read',
  },
  {
    id: 'strawberry-season',
    title: 'Japanese Strawberry Season: What You Need to Know',
    excerpt: 'A comprehensive guide to Japanese strawberry varieties, their peak seasons, and what makes each one special.',
    image: '/images/products/amaou.jpg',
    category: 'strawberries',
    author: 'Shun Harvest',
    date: 'January 10, 2026',
    readTime: '7 min read',
  },
  {
    id: 'amaou-vs-tochiotome',
    title: 'Amaou vs Tochiotome: Strawberry Showdown',
    excerpt: 'Comparing two of Japan\'s most beloved strawberry varieties and their unique characteristics.',
    image: '/images/products/ichigosan.jpg',
    category: 'strawberries',
    author: 'Shun Harvest',
    date: 'December 28, 2025',
    readTime: '5 min read',
  },
  {
    id: 'persimmon-varieties',
    title: 'Fuyu vs Hachiya: Understanding Japanese Persimmons',
    excerpt: 'Everything you need to know about the two main types of Japanese persimmons and how to enjoy them.',
    image: '/images/products/fuyu.jpg',
    category: 'persimmons',
    author: 'Shun Harvest',
    date: 'December 20, 2025',
    readTime: '6 min read',
  },
  {
    id: 'nashi-pear-history',
    title: 'The History of Japanese Nashi Pears',
    excerpt: 'Explore the rich history and cultural significance of Japanese pears, from ancient times to modern cultivation.',
    image: '/images/products/nashi.jpg',
    category: 'pears',
    author: 'Shun Harvest',
    date: 'December 15, 2025',
    readTime: '5 min read',
  },
  {
    id: 'preserves-recipes',
    title: 'Creative Ways to Use Japanese Fruit Preserves',
    excerpt: 'Delicious recipes and ideas for incorporating our premium fruit preserves into your cooking and baking.',
    image: '/images/products/preserve.webp',
    category: 'artisanal',
    author: 'Shun Harvest',
    date: 'December 10, 2025',
    readTime: '8 min read',
  },
];

const categories = [
  { name: 'All', slug: '' },
  { name: 'Melons', slug: 'melons' },
  { name: 'Strawberries', slug: 'strawberries' },
  { name: 'Persimmons', slug: 'persimmons' },
  { name: 'Pears', slug: 'pears' },
  { name: 'Artisanal Items', slug: 'artisanal' },
];

const categoryNames: Record<string, string> = {
  melons: 'Melons',
  strawberries: 'Strawberries',
  persimmons: 'Persimmons',
  pears: 'Pears',
  artisanal: 'Artisanal Items',
};

export default function BlogCategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const categoryName = categoryNames[categorySlug] || categorySlug;
  
  const filteredPosts = allBlogPosts.filter(post => post.category === categorySlug);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            {categoryName}
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Articles and guides about Japanese {categoryName.toLowerCase()}.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug ? `/blog/${cat.slug}` : '/blog'}
                className={`whitespace-nowrap text-sm font-medium transition-colors ${
                  cat.slug === categorySlug 
                    ? 'text-amber-700 border-b-2 border-amber-700 pb-4 -mb-4' 
                    : 'text-stone-600 hover:text-amber-700'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/post/${post.id}`}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="text-amber-700 font-medium uppercase">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="font-serif text-xl text-stone-900 group-hover:text-amber-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-stone-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="text-xs text-stone-500 pt-2">
                      {post.date}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-500">No articles found in this category yet.</p>
            <Link href="/blog" className="text-amber-700 hover:text-amber-800 mt-4 inline-block">
              ← Back to all articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
