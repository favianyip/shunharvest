'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Blog post data with full content
const blogPosts: Record<string, {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string[];
}> = {
  'crown-melon-guide': {
    title: 'The Ultimate Guide to Japanese Crown Melons',
    excerpt: 'Discover why the Crown Melon from Shizuoka is considered the pinnacle of melon cultivation.',
    image: '/images/products/crown.jpg',
    category: 'melons',
    author: 'Shun Harvest',
    date: 'January 15, 2026',
    readTime: '5 min read',
    content: [
      'The Crown Melon, cultivated exclusively in Shizuoka Prefecture, represents the absolute pinnacle of Japanese melon cultivation. Each melon is grown with such dedication that farmers often describe their work as an art form rather than agriculture.',
      'What makes the Crown Melon so special? The answer lies in the cultivation method. Each vine is allowed to produce only one melon, ensuring that all of the plant\'s nutrients flow into a single, perfect fruit. The temperature, humidity, and sunlight are carefully controlled throughout the growing process.',
      'The result is a melon with extraordinarily sweet, aromatic flesh that literally melts in your mouth. The sugar content typically reaches 14-16 Brix, which is significantly higher than most other melon varieties.',
      'When selecting a Crown Melon, look for a well-defined T-shaped stem (known as the "crown") and a smooth, even net pattern on the skin. The melon should feel heavy for its size and have a subtle, sweet fragrance at the base.',
      'To enjoy at peak ripeness, let the melon rest at room temperature for 2-3 days after purchase. The base should give slightly when pressed. Chill for 2 hours before serving, and cut into wedges to appreciate its full flavor profile.',
    ],
  },
  'strawberry-season': {
    title: 'Japanese Strawberry Season: What You Need to Know',
    excerpt: 'A comprehensive guide to Japanese strawberry varieties and their peak seasons.',
    image: '/images/products/amaou.jpg',
    category: 'strawberries',
    author: 'Shun Harvest',
    date: 'January 10, 2026',
    readTime: '7 min read',
    content: [
      'Japanese strawberry season runs from December through May, with peak quality typically found between January and March. During this time, you can find an incredible variety of premium strawberries, each with its own unique characteristics.',
      'Amaou (甘王) from Fukuoka Prefecture is perhaps the most famous. The name is an acronym for "amai" (sweet), "marui" (round), "ōkii" (large), and "umai" (delicious). These large, conical berries have an exceptional balance of sweetness and acidity.',
      'Tochiotome from Tochigi Prefecture has been a favorite for over two decades. Known for its bright red color and juicy texture, it offers a classic strawberry flavor that many consider the benchmark for Japanese strawberries.',
      'Benihoppe from Shizuoka combines the best traits of multiple varieties, resulting in an elongated berry with deep red flesh and honey-like sweetness. It\'s particularly prized for its aromatic qualities.',
      'For the best experience, store strawberries in the refrigerator and consume within 2-3 days of purchase. Bring them to room temperature about 30 minutes before eating to fully appreciate their aroma and flavor.',
    ],
  },
  'persimmon-varieties': {
    title: 'Fuyu vs Hachiya: Understanding Japanese Persimmons',
    excerpt: 'Everything you need to know about Japanese persimmon varieties.',
    image: '/images/products/fuyu.jpg',
    category: 'persimmons',
    author: 'Shun Harvest',
    date: 'December 20, 2025',
    readTime: '6 min read',
    content: [
      'Japanese persimmons come in two main types: astringent (shibugaki) and non-astringent (amagaki). Understanding the difference is crucial for enjoying these delicious fruits at their best.',
      'Fuyu persimmons are the most popular non-astringent variety. They can be eaten while still firm, like an apple, and have a sweet, mild flavor. The flat, squat shape makes them easy to identify. They\'re perfect for eating fresh, slicing into salads, or even grilling.',
      'Hachiya persimmons are astringent and must be completely soft before eating - attempting to eat an unripe Hachiya will result in an intensely unpleasant, mouth-puckering experience. When fully ripe, however, they have a rich, complex sweetness that many consider superior to Fuyu.',
      'To ripen Hachiya persimmons, leave them at room temperature until the skin becomes translucent and the fruit feels like a water balloon. This can take 1-3 weeks. You can speed up the process by placing them in a paper bag with a banana.',
      'Japanese persimmons are rich in vitamins A and C, dietary fiber, and antioxidants. In Japan, they\'re often enjoyed dried (hoshigaki), which concentrates their sweetness and creates a chewy, candy-like texture.',
    ],
  },
  'nashi-pear-history': {
    title: 'The History of Japanese Nashi Pears',
    excerpt: 'Explore the rich history of Japanese pears.',
    image: '/images/products/nashi.jpg',
    category: 'pears',
    author: 'Shun Harvest',
    date: 'December 15, 2025',
    readTime: '5 min read',
    content: [
      'Japanese pears, known as nashi (梨), have been cultivated in Japan for over 1,000 years. Unlike European pears, nashi are round and have a crisp, apple-like texture that remains firm even when fully ripe.',
      'The Nijisseiki (20th Century) pear, developed in the late 1800s, revolutionized Japanese pear cultivation. Its thin skin, juicy flesh, and refreshing sweetness made it an instant favorite that remains popular today.',
      'Modern varieties like Kosui and Hosui have been developed to improve upon the classics. Kosui offers exceptional sweetness with a honey-like flavor, while Hosui provides a good balance of sweetness and slight acidity.',
      'Japanese pears are typically harvested from August through October. Unlike European pears, they don\'t need to ripen after picking - they\'re ready to eat immediately at harvest.',
      'To select a good nashi, look for fruits that are firm, heavy for their size, and free of bruises. The skin should have a slight sheen. Store in the refrigerator and consume within 1-2 weeks for best quality.',
    ],
  },
  'preserves-recipes': {
    title: 'Creative Ways to Use Japanese Fruit Preserves',
    excerpt: 'Delicious recipes using premium fruit preserves.',
    image: '/images/products/preserve.webp',
    category: 'artisanal',
    author: 'Shun Harvest',
    date: 'December 10, 2025',
    readTime: '8 min read',
    content: [
      'Japanese fruit preserves are crafted with a focus on highlighting the natural flavor of the fruit, using less sugar than Western-style jams. This makes them incredibly versatile in both sweet and savory applications.',
      'For breakfast, try spreading strawberry preserve on warm, buttered toast or swirling it into Greek yogurt with a drizzle of honey. The natural fruit flavor shines through without being cloyingly sweet.',
      'In baking, fruit preserves make excellent fillings for thumbprint cookies, layer cakes, and pastries. Simply warm the preserve slightly to make it more spreadable, then use as you would any jam.',
      'For savory applications, mix melon preserve with soy sauce and rice vinegar for a unique salad dressing, or use it as a glaze for grilled pork or chicken. The fruit adds a subtle sweetness that complements umami flavors beautifully.',
      'Don\'t forget about beverages! Stir a spoonful of preserve into sparkling water for a sophisticated fruit soda, or shake it into cocktails for a natural sweetener that adds complexity and color.',
    ],
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-stone-900 mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-amber-700 hover:text-amber-800">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-3xl mx-auto">
            <Link 
              href={`/blog/${post.category}`}
              className="text-amber-300 text-sm font-medium uppercase tracking-wider hover:text-amber-200"
            >
              {post.category}
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mt-2">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-stone-500 mb-8 pb-8 border-b border-stone-200">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        {/* Content */}
        <div className="prose prose-stone prose-lg max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-stone-700 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium"
          >
            ← Back to all articles
          </Link>
        </div>
      </article>

      {/* Related Products CTA */}
      <div className="bg-stone-50 py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl text-stone-900 mb-4">
            Ready to Try?
          </h2>
          <p className="text-stone-600 mb-6">
            Experience the fruits mentioned in this article for yourself.
          </p>
          <Link
            href={`/shop/japanese-${post.category}`}
            className="inline-block px-8 py-3 bg-amber-700 text-white font-medium rounded hover:bg-amber-800 transition-colors"
          >
            Shop {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </Link>
        </div>
      </div>
    </div>
  );
}
