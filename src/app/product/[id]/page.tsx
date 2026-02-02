'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Minus, Plus, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import { getProducts, getCategories } from '@/lib/firebase/firestore';
import { Product, Category } from '@/types';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        const foundProduct = productsData.find(p => p.id === productId);
        setProduct(foundProduct || null);
        
        if (foundProduct) {
          const foundCategory = categoriesData.find(c => c.id === foundProduct.categoryId);
          setCategory(foundCategory || null);
          
          const related = productsData
            .filter(p => p.categoryId === foundProduct.categoryId && p.id !== foundProduct.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-700" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 mb-4">Product not found</p>
          <Link href="/shop" className="text-amber-700 hover:text-amber-800">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />);
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-stone-300" />);
      }
    }
    return stars;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1);
  };

  const isOutOfStock = product.inventory === 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-stone-900">Shop</Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/shop/${category.slug}`} className="hover:text-stone-900">
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-stone-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100">
                <span className="text-amber-700/30 text-8xl font-serif">旬</span>
              </div>
            )}
            {product.isNew && !isOutOfStock && (
              <div className="absolute top-4 left-4 bg-amber-700 text-white text-xs font-medium px-4 py-1.5 tracking-wider uppercase">
                New Arrival
              </div>
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-900/40 backdrop-blur-[2px]">
                <div className="bg-white/90 text-stone-900 text-sm font-medium px-8 py-3 tracking-widest uppercase">
                  Sold Out
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-stone-900">
              {product.name}
            </h1>
            
            <div className="mt-3 flex items-center gap-2 text-stone-600">
              <span>{product.farmName}</span>
              {product.location && (
                <>
                  <span className="w-1 h-1 rounded-full bg-stone-400"></span>
                  <span>{product.location}</span>
                </>
              )}
            </div>

            {/* Rating */}
            {product.rating && product.reviewCount && (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-stone-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-6">
              {product.salePrice ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-semibold text-stone-900">
                    ${product.salePrice.toFixed(0)}
                  </span>
                  <span className="text-xl text-stone-400 line-through">
                    ${product.price.toFixed(0)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-semibold text-stone-900">
                  ${product.price.toFixed(0)}
                </span>
              )}
            </div>

            {/* Order Deadline */}
            {product.orderDeadline && !isOutOfStock && (
              <p className="mt-4 text-sm text-amber-700 bg-amber-50 px-4 py-2.5 rounded-lg inline-block">
                Order by {product.orderDeadline} for delivery around {product.deliveryDate}
              </p>
            )}

            {/* Description */}
            <p className="mt-6 text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* SKU */}
            <p className="mt-6 text-sm text-stone-400">
              SKU: {product.sku}
            </p>

            {/* Inventory */}
            <p className="mt-2 text-sm">
              {isOutOfStock ? (
                <span className="text-red-600 font-medium">Currently unavailable</span>
              ) : (
                <span className="text-green-600">In Stock ({product.inventory} available)</span>
              )}
            </p>

            {/* Quantity and Add to Cart */}
            {!isOutOfStock && (
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center border border-stone-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-l-lg transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-5 py-2 text-stone-900 min-w-[3rem] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                    className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-r-lg transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-amber-700 text-white font-medium rounded-lg hover:bg-amber-800 transition-colors shadow-lg hover:shadow-xl"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            )}

            {/* Back Link */}
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-amber-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-stone-100">
          <h2 className="font-serif text-2xl text-stone-900 mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
